"use client";

import { useEffect, useState } from "react";

export default function ItemManagement() {
  const [items, setItems] = useState([]);
  const [iconUrl, setIconUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ iconUrl, title, description }),
    });
    if (res.ok) {
      fetchItems();
      setIconUrl("");
      setTitle("");
      setDescription("");
    }
  };

  const handleEditItem = (item) => {
    setEditingItemId(item._id);
    setIconUrl(item.iconUrl);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/items/${editingItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ iconUrl, title, description }),
    });
    if (res.ok) {
      fetchItems();
      setEditingItemId(null);
      setIconUrl("");
      setTitle("");
      setDescription("");
    }
  };

  const handleDeleteItem = async (itemId) => {
    const res = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchItems();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>

      <form
        onSubmit={editingItemId ? handleUpdateItem : handleAddItem}
        className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Icon URL
          </label>
          <input
            type="text"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingItemId ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 shadow-md rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b border-gray-700 bg-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 border-b border-gray-700">
                  <img src={item.iconUrl} alt={item.title} className="w-10 h-10" />
                </td>
                <td className="px-6 py-4 border-b border-gray-700">{item.title}</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {item.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-700 text-right">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
