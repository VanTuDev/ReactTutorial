"use client"

import { useState } from "react"

const UseStateCounterDemo = () => {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([0])

  const increment = () => {
    const newCount = count + step
    setCount(newCount)
    setHistory([...history, newCount])
  }

  const decrement = () => {
    const newCount = count - step
    setCount(newCount)
    setHistory([...history, newCount])
  }

  const reset = () => {
    setCount(0)
    setHistory([0])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useState Counter Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-4">{count}</div>
          <div className="flex justify-center gap-4 mb-4">
            <button onClick={decrement} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 text-lg">
              - {step}
            </button>
            <button
              onClick={increment}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg"
            >
              + {step}
            </button>
          </div>
          <button onClick={reset} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Reset
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Step Size:</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number.parseInt(e.target.value) || 1)}
            className="border border-gray-300 px-3 py-2 rounded w-20"
            min="1"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">History:</h3>
          <div className="bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {history.map((value, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-sm ${
                    index === history.length - 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`const [count, setCount] = useState(0)

const increment = () => {
  setCount(count + step)
}

const decrement = () => {
  setCount(count - step)
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default UseStateCounterDemo
