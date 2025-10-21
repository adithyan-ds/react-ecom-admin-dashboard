import React, { useEffect, useState } from "react";
import { BarChart3, Users, Package, LogOut, ClipboardList } from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const [orderCount, setOrderCount] = useState(0);

  
  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const orderKeys = allKeys.filter((k) => k.startsWith("orders_"));
    let total = 0;
    orderKeys.forEach((key) => {
      const userOrders = JSON.parse(localStorage.getItem(key)) || [];
      total += userOrders.length;
    });
    setOrderCount(total);
  }, []);

  const menuItems = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={20} /> },
    { id: "products", label: "Products", icon: <Package size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    {
      id: "orders",
      label: "Orders",
      icon: <ClipboardList size={20} />,
      badge: orderCount,
    },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col text-white shadow-lg z-20 transition-all"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      
      <div className="relative flex flex-col flex-1 p-6">
        
        <h1 className="text-2xl font-bold mb-8 text-center text-blue-400 tracking-wide">
          Admin Panel
        </h1>

       
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-400 text-gray-900 shadow-md"
                  : "hover:bg-blue-400/30 text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </span>

              
              {item.badge > 0 && (
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) onLogout();
          }}
          className="mt-auto flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
