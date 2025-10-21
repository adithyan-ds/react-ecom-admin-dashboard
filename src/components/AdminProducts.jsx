import React, { useState } from "react";
import { useProducts } from "../contexts/ProductContext";
import { FaEdit, FaTrash, FaSave, FaTimes, FaImage } from "react-icons/fa";

export default function AdminProducts() {
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();

  const [form, setForm] = useState({ name: "", price: "", category: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", category: "", image: "" });

  
  const handleImageUpload = (e, setFunc) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFunc((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload an image before adding the product.");
      return;
    }
    addProduct(form);
    setForm({ name: "", price: "", category: "", image: "" });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = (id) => {
    updateProduct(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manage Products
      </h2>

  
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg mb-8 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="groceries">Groceries</option>
            <option value="home">Home & Living</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <FaImage /> Upload Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setForm)}
            className="w-full text-sm"
          />
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>

      
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">
          Product Inventory
        </h3>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No products added yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price (₹)</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {editingId === p.id ? (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, setEditForm)}
                        />
                        {editForm.image && (
                          <img
                            src={editForm.image}
                            alt="edit preview"
                            className="mt-2 w-16 h-16 object-cover rounded-lg border"
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      `₹${p.price}`
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <select
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            category: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="groceries">Groceries</option>
                        <option value="home">Home & Living</option>
                      </select>
                    ) : (
                      <span className="capitalize">{p.category}</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {editingId === p.id ? (
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleSave(p.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
