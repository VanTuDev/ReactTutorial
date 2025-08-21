"use client"

import { useState } from "react"

const ChildComponent = ({ name, age, onUpdateAge }) => {
  return (
    <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
      <h3 className="text-lg font-medium text-green-800">Child Component</h3>
      <p className="text-green-600">Name: {name}</p>
      <p className="text-green-600">Age: {age}</p>
      <button
        onClick={() => onUpdateAge(age + 1)}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Parent Component State</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full max-w-xs"
          />
        </div>

        <ChildComponent name={name} age={age} onUpdateAge={setAge} />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Parent component manages state (name, age)</li>
            <li>Props are passed down to child component</li>
            <li>Child can trigger parent state updates via callback props</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PropsStateDemo
