"use client"

import { useState } from "react"

const ChildComponent = ({ name, age, onUpdateAge }) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800">Child Component</h3>
      <p className="text-blue-600">Name: {name}</p>
      <p className="text-blue-600">Age: {age}</p>
      <button
        onClick={() => onUpdateAge(age + 1)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Increase Age
      </button>
    </div>
  )
}

const PropsStateDemo = () => {
  const [name, setName] = useState("John Doe")
  const [age, setAge] = useState(25)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Props & State Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Parent Component (State)</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-xs"
          />
        </div>

        <div className="mb-6">
          <button
            onClick={() => setAge(age - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
          >
            Decrease Age
          </button>
          <button
            onClick={() => setAge(age + 1)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increase Age
          </button>
        </div>

        <ChildComponent name={name} age={age} onUpdateAge={setAge} />
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Key Concepts:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>State:</strong> Data that belongs to the component and can change
          </li>
          <li>
            <strong>Props:</strong> Data passed from parent to child components
          </li>
          <li>
            <strong>useState:</strong> Hook to manage state in functional components
          </li>
          <li>
            <strong>Callback Props:</strong> Functions passed as props to handle child events
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PropsStateDemo
