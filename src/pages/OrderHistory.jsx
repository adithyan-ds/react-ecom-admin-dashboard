import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import UserNavbar from "../components/UserNavbar";

export default function OrderHistory() {
  const { orders } = useCart();
  const [localOrders, setLocalOrders] = useState(orders);

  
  useEffect(() => {
    const updateOrders = () => {
      setLocalOrders([...orders]);
    };

    updateOrders();
    window.addEventListener("ordersUpdated", updateOrders);
    return () => window.removeEventListener("ordersUpdated", updateOrders);
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Order History 🧾
        </h1>

        {localOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {localOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{order.date}</p>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between text-gray-700"
                    >
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-right text-blue-600 mt-3">
                  Total: ₹{order.total}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
