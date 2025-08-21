"use client"

import { useState, useEffect } from "react"

const UseEffectApiDemo = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [timer, setTimer] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Effect 1: Fetch data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, []) // Empty dependency array = run once on mount

  // Effect 2: Timer that runs every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    // Cleanup function
    return () => clearInterval(interval)
  }, []) // Empty dependency array = run once on mount

  // Effect 3: Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup function
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Effect 4: Fetch user details when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      console.log(`Selected user: ${selectedUser.name}`)
      // Could fetch additional user details here
    }
  }, [selectedUser]) // Runs when selectedUser changes

  // Effect 5: Document title update
  useEffect(() => {
    document.title = `React Demo - ${users.length} users loaded`

    // Cleanup: reset title when component unmounts
    return () => {
      document.title = "React Demo App"
    }
  }, [users.length])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">useEffect Hook Demo</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">useEffect Hook Demo</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useEffect Hook Demo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Timer Effect */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Timer Effect</h2>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-blue-600 mb-2">{formatTime(timer)}</div>
            <p className="text-gray-600 text-sm">Time since component mounted</p>
          </div>
        </div>

        {/* Window Size Effect */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Window Resize Effect</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{windowWidth}px</div>
            <p className="text-gray-600 text-sm">Current window width</p>
            <p className="text-xs text-gray-500 mt-2">Try resizing your browser!</p>
          </div>
        </div>

        {/* User Count */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">API Data Effect</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{users.length}</div>
            <p className="text-gray-600 text-sm">Users loaded from API</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <div className="max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedUser?.id === user.id ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-xs">{user.company.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected User Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          {selectedUser ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-600">{selectedUser.name}</h3>
                <p className="text-gray-600">@{selectedUser.username}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Contact</h4>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
                <p className="text-sm text-gray-600">{selectedUser.phone}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Address</h4>
                <p className="text-sm text-gray-600">
                  {selectedUser.address.street}, {selectedUser.address.suite}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedUser.address.city}, {selectedUser.address.zipcode}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Company</h4>
                <p className="text-sm text-gray-600">{selectedUser.company.name}</p>
                <p className="text-sm text-gray-500 italic">"{selectedUser.company.catchPhrase}"</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Website</h4>
                <a
                  href={`http://${selectedUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {selectedUser.website}
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">Click on a user to see details</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">useEffect Patterns Demonstrated:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">1. Component Mount (API Call):</h4>
            <code className="bg-gray-200 p-2 rounded block text-xs">
              {"useEffect(() => {`{/* fetch data */}`}, [])"}
            </code>
          </div>
          <div>
            <h4 className="font-semibold mb-2">2. Cleanup (Timer/Listeners):</h4>
            <code className="bg-gray-200 p-2 rounded block text-xs">
              {"useEffect(() => {`{/* setup */; return () => {/* cleanup */}}`}, [])"}
            </code>
          </div>
          <div>
            <h4 className="font-semibold mb-2">3. Dependency Array:</h4>
            <code className="bg-gray-200 p-2 rounded block text-xs">
              {"useEffect(() => {`{/* effect */}`}, [dependency])"}
            </code>
          </div>
          <div>
            <h4 className="font-semibold mb-2">4. Multiple Effects:</h4>
            <code className="bg-gray-200 p-2 rounded block text-xs">
              {"// Separate concerns with multiple useEffect calls"}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UseEffectApiDemo
