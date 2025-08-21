"use client"

import { useState } from "react"

const ConditionalRenderingDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState("guest")
  const [showDetails, setShowDetails] = useState(false)
  const [items, setItems] = useState([])

  const LoginButton = () => (
    <button onClick={() => setIsLoggedIn(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Login
    </button>
  )

  const LogoutButton = () => (
    <button onClick={() => setIsLoggedIn(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      Logout
    </button>
  )

  const WelcomeMessage = ({ role }) => {
    switch (role) {
      case "admin":
        return <div className="bg-red-100 text-red-800 p-3 rounded">Welcome Admin! You have full access.</div>
      case "user":
        return <div className="bg-blue-100 text-blue-800 p-3 rounded">Welcome User! You have limited access.</div>
      default:
        return (
          <div className="bg-gray-100 text-gray-800 p-3 rounded">Welcome Guest! Please login for more features.</div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditional Rendering Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* If-Else with Ternary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ternary Operator</h2>
          <div className="mb-4">{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>
          <p className="text-gray-600">Status: {isLoggedIn ? "Logged In" : "Logged Out"}</p>
        </div>

        {/* Logical AND */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Logical AND (&&)</h2>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
          >
            {showDetails ? "Hide" : "Show"} Details
          </button>
          {showDetails && (
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <h3 className="font-semibold">Additional Details</h3>
              <p>This content is conditionally rendered using the && operator.</p>
            </div>
          )}
        </div>

        {/* Switch Statement */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Switch Statement</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role:</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="guest">Guest</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <WelcomeMessage role={userRole} />
        </div>

        {/* Conditional Lists */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Conditional Lists</h2>
          <div className="mb-4">
            <button
              onClick={() => setItems(["Item 1", "Item 2", "Item 3"])}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mr-2"
            >
              Add Items
            </button>
            <button onClick={() => setItems([])} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Clear Items
            </button>
          </div>

          {items.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No items to display</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">Conditional Rendering Patterns:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Ternary Operator:</h4>
            <code className="bg-gray-200 p-2 rounded block">{`{condition ? <ComponentA /> : <ComponentB />}`}</code>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Logical AND:</h4>
            <code className="bg-gray-200 p-2 rounded block">{`{condition && <Component />}`}</code>
          </div>
          <div>
            <h4 className="font-semibold mb-2">If-Else Function:</h4>
            <code className="bg-gray-200 p-2 rounded block">
              {`{(() => { if(condition) return <A />; return <B />; })()}`}
            </code>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Switch Component:</h4>
            <code className="bg-gray-200 p-2 rounded block">
              {`const Component = ({type}) => { switch(type) {...} }`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConditionalRenderingDemo
