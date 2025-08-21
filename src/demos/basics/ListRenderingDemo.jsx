"use client"

import { useState } from "react"

const ListRenderingDemo = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", category: "Fruit", price: 1.2 },
    { id: 2, name: "Banana", category: "Fruit", price: 0.8 },
    { id: 3, name: "Carrot", category: "Vegetable", price: 0.5 },
    { id: 4, name: "Broccoli", category: "Vegetable", price: 1.5 },
  ])

  const [newItem, setNewItem] = useState({ name: "", category: "Fruit", price: "" })
  const [filter, setFilter] = useState("All")

  const addItem = () => {
    if (newItem.name && newItem.price) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem.name,
          category: newItem.category,
          price: Number.parseFloat(newItem.price),
        },
      ])
      setNewItem({ name: "", category: "Fruit", price: "" })
    }
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const filteredItems = filter === "All" ? items : items.filter((item) => item.category === filter)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">List Rendering Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded"
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded"
            >
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded"
              step="0.1"
            />
            <button onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Item
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter Items</h3>
          <div className="flex gap-2">
            {["All", "Fruit", "Vegetable"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded ${
                  filter === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Items List ({filteredItems.length})</h3>
          {filteredItems.length === 0 ? (
            <p className="text-gray-500 italic">No items found.</p>
          ) : (
            <div className="grid gap-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded ${
                        item.category === "Fruit" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="ml-2 text-gray-600">${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListRenderingDemo
