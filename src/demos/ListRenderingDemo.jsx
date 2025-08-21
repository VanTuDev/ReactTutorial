"use client"

import { useState } from "react"

const ListRenderingDemo = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 32 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 25 },
    { id: 4, name: "Alice Brown", email: "alice@example.com", age: 29 },
  ])

  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" })
  const [filter, setFilter] = useState("")

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.age) {
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: newUser.name,
          email: newUser.email,
          age: Number.parseInt(newUser.age),
        },
      ])
      setNewUser({ name: "", email: "", age: "" })
    }
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) || user.email.toLowerCase().includes(filter.toLowerCase()),
  )

  const fruits = ["Apple", "Banana", "Orange", "Grape", "Strawberry"]
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">List Rendering Demo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simple Lists */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Simple Lists</h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Fruits:</h3>
            <ul className="list-disc list-inside space-y-1">
              {fruits.map((fruit, index) => (
                <li key={index} className="text-gray-700">
                  {fruit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Numbers (Even only):</h3>
            <div className="flex flex-wrap gap-2">
              {numbers
                .filter((num) => num % 2 === 0)
                .map((num) => (
                  <span key={num} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {num}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Complex Lists with Objects */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>

          {/* Add User Form */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Add New User</h3>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Age"
                value={newUser.age}
                onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <button onClick={addUser} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add User
              </button>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter users..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">User List ({filteredUsers.length} users)</h2>

        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 italic">No users found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700 text-sm">
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-sm">Age: {user.age}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">Key Concepts:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>map():</strong> Transform array elements into JSX elements
          </li>
          <li>
            <strong>key prop:</strong> Unique identifier for each list item (helps React optimize)
          </li>
          <li>
            <strong>filter():</strong> Create new array with elements that pass a test
          </li>
          <li>
            <strong>Conditional rendering:</strong> Show different content based on array length
          </li>
          <li>
            <strong>Dynamic lists:</strong> Add/remove items and update UI automatically
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ListRenderingDemo
