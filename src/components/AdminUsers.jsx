import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Search } from "lucide-react"; 

export default function AdminUsers() {
  const { users, updateUserRole, deleteUser } = useAuth();
  const [search, setSearch] = useState("");

  const handleRoleChange = (email, newRole) => {
    if (email === "admin@gmail.com") {
      toast.error("Cannot modify the main admin account!");
      return;
    }
    updateUserRole(email, newRole);
  };

  const handleDelete = (email) => {
    if (email === "admin@gmail.com") {
      toast.error("Cannot delete the main admin!");
      return;
    }
    if (window.confirm(`Delete user with email: ${email}?`)) {
      deleteUser(email);
    }
  };


  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      
      <div className="flex items-center mb-4 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-gray-700 bg-transparent"
        />
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.email}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium text-gray-800">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>

                
                <td className="p-3">
                  {u.email === "admin@gmail.com" ? (
                    <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full">
                      Admin (fixed)
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(u.email, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>

                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          u.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                  )}
                </td>

         
                <td className="p-3 text-center">
                  {u.email !== "admin@gmail.com" && (
                    <button
                      onClick={() => handleDelete(u.email)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No users found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
