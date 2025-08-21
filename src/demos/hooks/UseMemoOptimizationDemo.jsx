"use client"

import React, { useState, useMemo, useCallback } from "react"

const ExpensiveComponent = React.memo(({ items, onItemClick }) => {
  console.log("ExpensiveComponent rendered")

  return (
    <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
      <h4 className="font-semibold text-blue-800 mb-2">Expensive Component (Memoized)</h4>
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded">
            <span>
              {item.name} - ${item.price}
            </span>
            <button
              onClick={() => onItemClick(item.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  )
})

const UseMemoOptimizationDemo = () => {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([
    { id: 1, name: "Apple", price: 1.2, category: "fruit" },
    { id: 2, name: "Banana", price: 0.8, category: "fruit" },
    { id: 3, name: "Carrot", price: 0.5, category: "vegetable" },
    { id: 4, name: "Broccoli", price: 1.5, category: "vegetable" },
  ])
  const [filter, setFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)

  // Expensive calculation - only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    console.log("Filtering items...")
    return filter === "all" ? items : items.filter((item) => item.category === filter)
  }, [items, filter])

  // Expensive calculation - only recalculates when filteredItems changes
  const totalPrice = useMemo(() => {
    console.log("Calculating total price...")
    return filteredItems.reduce((sum, item) => sum + item.price, 0)
  }, [filteredItems])

  // Memoized callback - prevents unnecessary re-renders of child components
  const handleItemClick = useCallback(
    (itemId) => {
      const item = items.find((item) => item.id === itemId)
      setSelectedItem(item)
    },
    [items],
  )

  const addRandomItem = () => {
    const categories = ["fruit", "vegetable"]
    const names = ["Orange", "Grape", "Lettuce", "Tomato", "Spinach"]
    const newItem = {
      id: Date.now(),
      name: names[Math.floor(Math.random() * names.length)],
      price: Math.round((Math.random() * 3 + 0.5) * 100) / 100,
      category: categories[Math.floor(Math.random() * categories.length)],
    }
    setItems([...items, newItem])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useMemo Optimization Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Performance Counter</h3>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-blue-600">{count}</div>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Increment (Triggers Re-render)
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This counter causes re-renders but doesn't affect memoized calculations
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Item Controls</h3>
          <div className="flex gap-2 mb-4">
            <button onClick={addRandomItem} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Random Item
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded"
            >
              <option value="all">All Items</option>
              <option value="fruit">Fruits Only</option>
              <option value="vegetable">Vegetables Only</option>
            </select>
          </div>

          <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
            <p className="text-green-800">
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              <span className="text-sm ml-2">({filteredItems.length} items)</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ExpensiveComponent items={filteredItems} onItemClick={handleItemClick} />
        </div>

        {selectedItem && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Selected Item</h3>
            <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
              <p className="text-yellow-800">
                <strong>{selectedItem.name}</strong> - ${selectedItem.price} ({selectedItem.category})
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Optimization Techniques:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            <li>
              <strong>useMemo:</strong> Memoizes expensive calculations (filtering, totals)
            </li>
            <li>
              <strong>useCallback:</strong> Memoizes event handlers to prevent child re-renders
            </li>
            <li>
              <strong>React.memo:</strong> Prevents component re-renders when props haven't changed
            </li>
          </ul>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">
              <strong>Check the console:</strong> Notice how filtering and price calculations only run when relevant
              dependencies change, not on every render.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`const filteredItems = useMemo(() => {
  return filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter)
}, [items, filter])

const totalPrice = useMemo(() => {
  return filteredItems.reduce((sum, item) => sum + item.price, 0)
}, [filteredItems])

const handleItemClick = useCallback((itemId) => {
  const item = items.find(item => item.id === itemId)
  setSelectedItem(item)
}, [items])`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default UseMemoOptimizationDemo
