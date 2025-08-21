"use client"

import { useState, useEffect } from "react"

const UseEffectApiDemo = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data.slice(0, 5)) // Limit to 5 users
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      if (!response.ok) throw new Error("Failed to fetch user details")
      const userData = await response.json()
      setSelectedUser(userData)
    } catch (err) {
      console.error("Error fetching user details:", err)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">useEffect API Demo</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading users...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">useEffect API Demo</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="text-red-800">Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useEffect API Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Users List</h3>
          <div className="grid gap-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div>
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-600 ml-2">({user.username})</span>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <button
                  onClick={() => fetchUserDetails(user.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedUser && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">User Details</h3>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800">{selectedUser.name}</h4>
              <div className="text-blue-600 space-y-1 mt-2">
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>Website:</strong> {selectedUser.website}
                </p>
                <p>
                  <strong>Company:</strong> {selectedUser.company?.name}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser.address?.city}, {selectedUser.address?.zipcode}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchUsers()
}, []) // Empty dependency array = run once on mount`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default UseEffectApiDemo
