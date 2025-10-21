import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const ProductContext = createContext();
const STORAGE_KEY = "react-ecom-products";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const product = { ...newProduct, id: Date.now() };
    setProducts((prev) => [...prev, product]);
    toast.success("Product added successfully!");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted!");
  };
  

  const updateProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    toast.success("Product updated!");
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
