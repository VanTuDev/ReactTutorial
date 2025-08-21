"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { menuItems } from "../routes"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 h-screen ${isOpen ? "w-64" : "w-16"}`}>
      <div className="p-4 sticky top-0 bg-gray-800 z-10">
        <div className="flex items-center justify-between">
          <h1 className={`font-bold text-xl ${isOpen ? "block" : "hidden"}`}>React Demos</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded hover:bg-gray-700">
            {isOpen ? "←" : "→"}
          </button>
        </div>
      </div>

      <nav className="mt-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 80px)" }}>
        {menuItems.map((category) => (
          <div key={category.title} className="mb-6">
            <h3
              className={`px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider ${isOpen ? "block" : "hidden"} sticky top-0 bg-gray-800`}
            >
              {category.title}
            </h3>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${location.pathname === item.path ? "bg-gray-700 border-r-2 border-blue-500" : ""
                      }`}
                    title={!isOpen ? item.name : ""}
                  >
                    <span className={`${isOpen ? "block" : "hidden"}`}>{item.name}</span>
                    {!isOpen && <span className="text-xs">{item.name.charAt(0)}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
