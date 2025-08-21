"use client"

import { useState, useEffect } from "react"

// Custom hook for localStorage
const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// Custom hook for form data persistence
const usePersistedForm = (key, initialValues) => {
  const [values, setValues] = useLocalStorage(key, initialValues)

  const updateValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setValues(initialValues)
  }

  return [values, updateValue, resetForm]
}

const CustomHookLocalStorageDemo = () => {
  // Using custom localStorage hook
  const [name, setName] = useLocalStorage("demo-name", "")
  const [theme, setTheme] = useLocalStorage("demo-theme", "light")
  const [settings, setSettings] = useLocalStorage("demo-settings", {
    notifications: true,
    autoSave: false,
    language: "en",
  })

  // Using custom form persistence hook
  const [formData, updateFormData, resetForm] = usePersistedForm("demo-form", {
    email: "",
    message: "",
    priority: "medium",
  })

  const [localStorageSize, setLocalStorageSize] = useState(0)

  // Calculate localStorage usage
  useEffect(() => {
    const calculateSize = () => {
      let total = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length
        }
      }
      setLocalStorageSize(total)
    }

    calculateSize()
    const interval = setInterval(calculateSize, 1000)
    return () => clearInterval(interval)
  }, [name, theme, settings, formData])

  const clearAllData = () => {
    localStorage.removeItem("demo-name")
    localStorage.removeItem("demo-theme")
    localStorage.removeItem("demo-settings")
    localStorage.removeItem("demo-form")
    setName("")
    setTheme("light")
    setSettings({ notifications: true, autoSave: false, language: "en" })
    resetForm()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Custom Hook LocalStorage Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Basic LocalStorage Hook</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name (persisted):</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Theme (persisted):</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Settings Object (persisted)</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="mr-2"
              />
              Enable Notifications
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
                className="mr-2"
              />
              Auto Save
            </label>

            <div>
              <label className="block text-sm font-medium mb-2">Language:</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="border border-gray-300 px-3 py-2 rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Persisted Form Hook</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                placeholder="Enter your message"
                rows="3"
                className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority:</label>
              <select
                value={formData.priority}
                onChange={(e) => updateFormData("priority", e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Reset Form
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Current Values</h3>
          <div className="bg-gray-50 p-4 rounded">
            <pre className="text-sm">
              {JSON.stringify(
                {
                  name,
                  theme,
                  settings,
                  formData,
                  localStorageSize: `${localStorageSize} characters`,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>

        <div className="mb-6">
          <button onClick={clearAllData} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Clear All Persisted Data
          </button>
          <p className="text-sm text-gray-600 mt-2">Try refreshing the page - your data will persist!</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Custom Hook Code:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }

  return [storedValue, setValue]
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default CustomHookLocalStorageDemo
