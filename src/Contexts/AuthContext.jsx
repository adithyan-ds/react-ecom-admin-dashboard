import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();
const USERS_KEY = "react-ecom-users";
const CURRENT_USER_KEY = "react-ecom-current-user";


const ADMIN_ACCOUNT = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "admin1234",
  role: "admin",
  avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
};

export const AuthProvider = ({ children }) => {

  const [users, setUsers] = useState(() => {
    try {
      let stored = JSON.parse(localStorage.getItem(USERS_KEY));
      if (!Array.isArray(stored)) stored = [];

      const hasAdmin = stored.some((u) => u.role === "admin");
      if (!hasAdmin) {
        const updated = [...stored, ADMIN_ACCOUNT];
        localStorage.setItem(USERS_KEY, JSON.stringify(updated));
        return updated;
      }

      return stored;
    } catch {
      localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN_ACCOUNT]));
      return [ADMIN_ACCOUNT];
    }
  });


  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
    } catch {
      return null;
    }
  });


  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);


  useEffect(() => {
    if (currentUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [currentUser]);


  const register = (name, email, password) => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      toast.error("Email already exists!");
      return false;
    }
    const newUser = {
      name,
      email,
      password,
      role: "user",
      avatar: `https://ui-avatars.com/api/?name=${name}&background=FACC15&color=000`,
    };
    setUsers([...users, newUser]);
    toast.success("Registered successfully!");
    return true;
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      toast.error("Invalid email or password!");
      return false;
    }
    setCurrentUser(found);
    toast.success(found.role === "admin" ? "Welcome, Admin!" : "Login successful!");
    return true;
  };


  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.success("Logged out successfully!");
  };


  const updateUserRole = (email, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
    );
    toast.success(`Role updated to ${newRole}`);
  };


  const deleteUser = (email) => {
    if (email === ADMIN_ACCOUNT.email) {
      toast.error("Cannot delete the main admin account!");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.email !== email));
    toast.success("User deleted successfully!");
  };


  const updateProfile = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === updatedUser.email ? { ...u, ...updatedUser } : u
      )
    );
    setCurrentUser(updatedUser);
    toast.success("Profile updated successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        register,
        login,
        logout,
        updateUserRole,
        deleteUser,
        updateProfile, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
