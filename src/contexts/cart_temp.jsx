import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);


  const loadAllData = (key) => JSON.parse(localStorage.getItem(key)) || {};
  const saveAllData = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

  const loadUserData = (key) => {
    const allData = loadAllData(key);
    return currentUser?.email ? allData[currentUser.email] || [] : [];
  };

  const saveUserData = (key, data) => {
    if (!currentUser?.email) return;
    const allData = loadAllData(key);
    allData[currentUser.email] = data;
    saveAllData(key, allData);
  };

  useEffect(() => {
    if (currentUser) {
      setCart(loadUserData("userCarts"));
      setOrders(loadUserData("userOrders"));
    } else {
      setCart([]);
      setOrders([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      saveUserData("userCarts", cart);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cart, currentUser]);

 
  useEffect(() => {
    if (currentUser) {
      saveUserData("userOrders", orders);
      window.dispatchEvent(new Event("ordersUpdated"));
    }
  }, [orders, currentUser]);


  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.error("Item already in cart!");
        return prev;
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, product];
    });
  };


  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      toast.success("Item removed from cart!");
      return updated;
    });
  };


  const clearCart = () => {
    if (cart.length === 0) {
      toast.error("Cart is already empty!");
      return;
    }
    setCart([]);
    toast.success("Cart cleared!");
  };


  const placeOrder = () => {
    if (!currentUser) {
      toast.error("Please log in to place an order!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userEmail: currentUser.email,
      items: cart,
      total: cart.reduce((sum, item) => sum + Number(item.price), 0),
      date: new Date().toLocaleString(),
    };

    setOrders((prev) => {
      const updatedOrders = [...prev, newOrder];
      saveUserData("userOrders", updatedOrders);
      return updatedOrders;
    });

 
    const allOrders = loadAllData("allOrders");
    allOrders[newOrder.id] = newOrder;
    saveAllData("allOrders", allOrders);


    setCart([]);
    saveUserData("userCarts", []);


    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("ordersUpdated"));

    toast.success("Order placed successfully!");
  };


  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        placeOrder,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
