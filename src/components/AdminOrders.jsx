import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  
  const [searchEmail, setSearchEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
  const loadAllOrders = () => {
    const allOrdersObj = JSON.parse(localStorage.getItem("allOrders")) || {};
    const ordersArray = Object.values(allOrdersObj).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAllOrders(ordersArray);
    setFilteredOrders(ordersArray);
  };

  
  useEffect(() => {
    loadAllOrders();
    window.addEventListener("ordersUpdated", loadAllOrders);
    window.addEventListener("storage", loadAllOrders);
    return () => {
      window.removeEventListener("ordersUpdated", loadAllOrders);
      window.removeEventListener("storage", loadAllOrders);
    };
  }, []);

  
  useEffect(() => {
    let result = [...allOrders];

    if (searchEmail.trim()) {
      result = result.filter((order) =>
        order.userEmail.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    if (startDate) {
      result = result.filter(
        (order) => new Date(order.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      result = result.filter(
        (order) => new Date(order.date) <= new Date(endDate)
      );
    }

    setFilteredOrders(result);
  }, [searchEmail, startDate, endDate, allOrders]);

  
  const handleDelete = (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    const allOrdersObj = JSON.parse(localStorage.getItem("allOrders")) || {};
    delete allOrdersObj[orderId];
    localStorage.setItem("allOrders", JSON.stringify(allOrdersObj));

    toast.success(`Order #${orderId} deleted successfully!`);
    loadAllOrders();
    window.dispatchEvent(new Event("ordersUpdated"));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        🧾 Manage Orders
      </h2>

      
      <div className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Search by Email</label>
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="user@example.com"
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          onClick={() => {
            setSearchEmail("");
            setStartDate("");
            setEndDate("");
          }}
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-4 py-2 rounded-lg transition"
        >
          Reset
        </button>
      </div>

      
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">User Email</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-semibold text-gray-700">
                    #{order.id}
                  </td>
                  <td className="p-3 text-gray-600">{order.userEmail}</td>
                  <td className="p-3 text-gray-600">{order.date}</td>
                  <td className="p-3 font-bold text-blue-600">
                    ₹{order.total?.toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-700">
                    {order.items?.map((i) => i.name).join(", ") || "—"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
