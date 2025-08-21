"use client"

import { useState } from "react"

const UseStateCounterDemo = () => {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const increment = () => setCount(count + step)
  const decrement = () => setCount(count - step)
  const reset = () => setCount(0)

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useState Hook Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Counter */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Counter</h2>

          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-4">{count}</div>

            <div className="flex justify-center gap-2 mb-4">
              <button onClick={decrement} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                -
              </button>
              <button onClick={reset} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Reset
              </button>
              <button onClick={increment} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                +
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Step Size: {step}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={step}
                onChange={(e) => setStep(Number.parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Input State */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Input State</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          {name && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800">
                Hello, <strong>{name}</strong>!
              </p>
              <p className="text-blue-600 text-sm">Character count: {name.length}</p>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p>State value: "{name}"</p>
            <p>Is empty: {name === "" ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Todo List (Array State)</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new todo..."
            className="border border-gray-300 rounded-md px-3 py-2 flex-1"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-500 italic">No todos yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4"
                />
                <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700 px-2 py-1">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p>Total todos: {todos.length}</p>
          <p>Completed: {todos.filter((t) => t.completed).length}</p>
          <p>Remaining: {todos.filter((t) => !t.completed).length}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">useState Key Points:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>State initialization:</strong> useState(initialValue) returns [state, setState]
          </li>
          <li>
            <strong>State updates:</strong> setState triggers re-render with new value
          </li>
          <li>
            <strong>Functional updates:</strong> setState(prev =&gt; prev + 1) for state based on previous
          </li>
          <li>
            <strong>Object/Array state:</strong> Always create new objects/arrays, don't mutate
          </li>
          <li>
            <strong>Multiple state variables:</strong> Use separate useState calls for different data
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UseStateCounterDemo
