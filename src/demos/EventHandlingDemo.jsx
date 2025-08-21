"use client"

import { useState } from "react"

const EventHandlingDemo = () => {
  const [clickCount, setClickCount] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [keyPressed, setKeyPressed] = useState("")

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleKeyPress = (e) => {
    setKeyPressed(e.key)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Form submitted with value: ${inputValue}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Event Handling Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Click Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Click Events</h2>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Click Me! ({clickCount})
          </button>
        </div>

        {/* Input Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Input Events</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <p className="mt-2 text-gray-600">You typed: {inputValue}</p>
        </div>

        {/* Mouse Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Mouse Events</h2>
          <div
            onMouseMove={handleMouseMove}
            className="bg-gray-100 h-32 rounded-lg flex items-center justify-center cursor-crosshair"
          >
            <p className="text-gray-600">
              Mouse: ({mousePosition.x}, {mousePosition.y})
            </p>
          </div>
        </div>

        {/* Keyboard Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Keyboard Events</h2>
          <input
            type="text"
            onKeyDown={handleKeyPress}
            placeholder="Press any key..."
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <p className="mt-2 text-gray-600">Last key pressed: {keyPressed}</p>
        </div>

        {/* Form Events */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Form Events</h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter text and submit..."
              className="border border-gray-300 rounded-md px-3 py-2 flex-1"
            />
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">Common Event Types:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>onClick:</strong> Triggered when element is clicked
          </li>
          <li>
            <strong>onChange:</strong> Triggered when input value changes
          </li>
          <li>
            <strong>onSubmit:</strong> Triggered when form is submitted
          </li>
          <li>
            <strong>onMouseMove:</strong> Triggered when mouse moves over element
          </li>
          <li>
            <strong>onKeyDown:</strong> Triggered when key is pressed down
          </li>
        </ul>
      </div>
    </div>
  )
}

export default EventHandlingDemo
