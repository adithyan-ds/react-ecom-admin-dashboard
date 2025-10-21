import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Package, ShoppingBag } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    categoryData: [],
  });

  useEffect(() => {
    const updateStats = () => {
      
      const users = JSON.parse(localStorage.getItem("react-ecom-users")) || [];
      const totalUsers = users.filter((u) => u.role === "user").length;

     
      const products =
        JSON.parse(localStorage.getItem("react-ecom-products")) || [];
      const totalProducts = products.length;

      
      const allOrdersObj =
        JSON.parse(localStorage.getItem("allOrders")) || {};
      const allOrders = Object.values(allOrdersObj);
      const totalOrders = allOrders.length;

      
      const categoryMap = {};
      allOrders.forEach((order) => {
        order.items?.forEach((item) => {
          const cat = item.category || "Other";
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });
      });
      const categoryData = Object.entries(categoryMap).map(
        ([name, value]) => ({ name, value })
      );

      setStats({
        totalUsers,
        totalProducts,
        totalOrders,
        categoryData,
      });
    };

    updateStats();

    
    window.addEventListener("ordersUpdated", updateStats);
    window.addEventListener("storage", updateStats);
    window.addEventListener("productsUpdated", updateStats);

    return () => {
      window.removeEventListener("ordersUpdated", updateStats);
      window.removeEventListener("storage", updateStats);
      window.removeEventListener("productsUpdated", updateStats);
    };
  }, []);

  const COLORS = ["#3B82F6", "#22C55E", "#FACC15", "#EF4444", "#8B5CF6"];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        📊 Dashboard Overview
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <Users className="text-blue-500" size={40} />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.totalUsers}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <Package className="text-green-500" size={40} />
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.totalProducts}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <ShoppingBag className="text-yellow-500" size={40} />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.totalOrders}
            </h2>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Order Count by Category
          </h2>
          {stats.categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#3B82F6"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-10">
              No order data yet.
            </p>
          )}
        </div>

        
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Category Distribution
          </h2>
          {stats.categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  animationDuration={800}
                >
                  {stats.categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-10">
              No category data yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
