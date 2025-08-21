"use client"

import { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const [primaryColor, setPrimaryColor] = useState("blue")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const value = {
    theme,
    primaryColor,
    toggleTheme,
    setPrimaryColor,
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

const ThemedButton = ({ children, onClick }) => {
  const { theme, primaryColor } = useTheme()

  const getButtonClasses = () => {
    const baseClasses = "px-4 py-2 rounded font-medium transition-colors"
    const colorClasses = {
      blue: theme === "dark" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",
      green:
        theme === "dark" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white",
      purple:
        theme === "dark"
          ? "bg-purple-600 hover:bg-purple-700 text-white"
          : "bg-purple-500 hover:bg-purple-600 text-white",
    }
    return `${baseClasses} ${colorClasses[primaryColor]}`
  }

  return (
    <button onClick={onClick} className={getButtonClasses()}>
      {children}
    </button>
  )
}

const ThemedCard = ({ title, children }) => {
  const { theme } = useTheme()

  return (
    <div
      className={`p-4 rounded-lg border ${
        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  )
}

const UseContextThemeDemo = () => {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  )
}

const ThemeContent = () => {
  const { theme, primaryColor, toggleTheme, setPrimaryColor } = useTheme()

  return (
    <div
      className={`max-w-4xl mx-auto transition-colors ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } min-h-screen p-6`}
    >
      <h1 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        useContext Theme Demo
      </h1>

      <div className="space-y-6">
        <ThemedCard title="Theme Controls">
          <div className="space-y-4">
            <div>
              <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Current theme: <strong>{theme}</strong>
              </p>
              <ThemedButton onClick={toggleTheme}>Switch to {theme === "light" ? "Dark" : "Light"} Theme</ThemedButton>
            </div>

            <div>
              <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Primary color: <strong>{primaryColor}</strong>
              </p>
              <div className="flex gap-2">
                {["blue", "green", "purple"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    className={`px-3 py-1 rounded text-sm capitalize ${
                      primaryColor === color
                        ? `bg-${color}-500 text-white`
                        : theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ThemedCard>

        <ThemedCard title="Themed Components">
          <div className="space-y-3">
            <ThemedButton onClick={() => alert("Button 1 clicked!")}>Primary Button</ThemedButton>
            <ThemedButton onClick={() => alert("Button 2 clicked!")}>Another Button</ThemedButton>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              These buttons automatically adapt to the current theme and primary color.
            </p>
          </div>
        </ThemedCard>

        <ThemedCard title="Code Example">
          <pre
            className={`text-sm overflow-x-auto p-3 rounded ${
              theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
            }`}
          >
            {`const ThemeContext = createContext()

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const ThemedButton = () => {
  const { theme, primaryColor } = useTheme()
  return <button className={getThemeClasses()}>Button</button>
}`}
          </pre>
        </ThemedCard>
      </div>
    </div>
  )
}

export default UseContextThemeDemo
