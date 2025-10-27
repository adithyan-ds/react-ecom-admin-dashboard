import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminOverview from "../components/AdminOverview";
import AdminUsers from "../components/AdminUsers";
import AdminProducts from "../components/AdminProducts";
import AdminOrders from "../components/AdminOrders";
import { useAuth } from "../Contexts/AuthContext";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "products":
        return <AdminProducts />;
      case "users":
        return <AdminUsers />;
      case "orders":
        return <AdminOrders />; 
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div
      className="flex min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={logout}
        />
      </div>

     
      <main className="relative z-10 flex-1 ml-64 p-6 text-white">
        <div className="bg-white/90 text-gray-900 rounded-2xl shadow-xl p-6 backdrop-blur-md">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
