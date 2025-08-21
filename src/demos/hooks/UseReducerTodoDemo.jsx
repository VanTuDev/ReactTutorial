"use client"

import { useReducer, useState } from "react"

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      }
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
      }
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      }
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      }
    default:
      return state
  }
}

const initialState = {
  todos: [
    { id: 1, text: "Learn React", completed: true, createdAt: new Date().toISOString() },
    { id: 2, text: "Build a todo app", completed: false, createdAt: new Date().toISOString() },
    { id: 3, text: "Master useReducer", completed: false, createdAt: new Date().toISOString() },
  ],
  filter: "all",
}

const UseReducerTodoDemo = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [inputValue, setInputValue] = useState("")

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", payload: inputValue.trim() })
      setInputValue("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const getFilteredTodos = () => {
    switch (state.filter) {
      case "active":
        return state.todos.filter((todo) => !todo.completed)
      case "completed":
        return state.todos.filter((todo) => todo.completed)
      default:
        return state.todos
    }
  }

  const filteredTodos = getFilteredTodos()
  const completedCount = state.todos.filter((todo) => todo.completed).length
  const activeCount = state.todos.length - completedCount

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useReducer Todo Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Todo</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
            />
            <button onClick={addTodo} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Todos</h3>
            <div className="text-sm text-gray-600">
              {activeCount} active, {completedCount} completed
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {["all", "active", "completed"].map((filter) => (
              <button
                key={filter}
                onClick={() => dispatch({ type: "SET_FILTER", payload: filter })}
                className={`px-3 py-1 rounded text-sm capitalize ${
                  state.filter === filter ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
            {completedCount > 0 && (
              <button
                onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
                className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600"
              >
                Clear Completed
              </button>
            )}
          </div>

          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">
                {state.filter === "all" ? "No todos yet" : `No ${state.filter} todos`}
              </p>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 rounded border ${
                    todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                    className="w-4 h-4"
                  />
                  <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
                    className="text-red-500 hover:text-red-700 px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload }]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(todoReducer, initialState)`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default UseReducerTodoDemo
