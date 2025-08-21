"use client"

import { useState } from "react"

const EventHandlingDemo = () => {
  const [clickCount, setClickCount] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Form submitted with value: ${inputValue}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Event Handling Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Click Events</h3>
          <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4">
            Click Me! ({clickCount})
          </button>
          <button
            onClick={() => setClickCount(0)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Input Events</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type something..."
              className="border border-gray-300 px-3 py-2 rounded w-full max-w-xs"
            />
            <div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Submit
              </button>
            </div>
          </form>
          <p className="text-gray-600 mt-2">Current value: {inputValue}</p>
        </div>

        <div className="mb-6 bg-gray-100 p-4 rounded h-32" onMouseMove={handleMouseMove}>
          <h3 className="text-lg font-semibold mb-2">Mouse Events</h3>
          <p className="text-gray-600">Move your mouse over this area</p>
          <p className="text-sm text-gray-500">
            Mouse position: X: {mousePosition.x}, Y: {mousePosition.y}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventHandlingDemo
