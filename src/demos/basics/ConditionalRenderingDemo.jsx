"use client"

import { useState } from "react"

const ConditionalRenderingDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState("guest")
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditional Rendering Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Login Status</h3>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`px-4 py-2 rounded text-white ${
              isLoggedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <div className="mt-4">
            {isLoggedIn ? (
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <p className="text-green-800">✅ Welcome back! You are logged in.</p>
              </div>
            ) : (
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <p className="text-red-800">❌ Please log in to continue.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">User Role</h3>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="mt-4">
            {userRole === "admin" && (
              <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
                <p className="text-purple-800">👑 Admin Panel Access</p>
              </div>
            )}
            {userRole === "user" && (
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <p className="text-blue-800">👤 User Dashboard Access</p>
              </div>
            )}
            {userRole === "guest" && (
              <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-500">
                <p className="text-gray-800">👥 Limited Access</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Toggle Details</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showDetails ? "Hide" : "Show"} Details
          </button>

          {showDetails && (
            <div className="mt-4 bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800">Additional Information</h4>
              <p className="text-blue-600">This content is conditionally rendered based on the showDetails state.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConditionalRenderingDemo
