"use client"

import { useRef, useState, useEffect } from "react"

const UseRefFocusDemo = () => {
  const inputRef = useRef(null)
  const videoRef = useRef(null)
  const scrollRef = useRef(null)
  const countRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  // Track render count without causing re-renders
  countRef.current = countRef.current + 1

  const focusInput = () => {
    inputRef.current.focus()
  }

  const clearInput = () => {
    setInputValue("")
    inputRef.current.focus()
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const scrollToTop = () => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  const forceRerender = () => {
    setRenderCount((prev) => prev + 1)
  }

  // Generate some content for scrolling demo
  const scrollContent = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="p-4 border-b border-gray-200">
      <h3 className="font-semibold">Item {i + 1}</h3>
      <p className="text-gray-600">
        This is some content for scrolling demonstration. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  ))

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useRef Hook Demo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DOM Manipulation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">DOM Element References</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Focus Management:</label>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Click buttons to interact..."
                  className="border border-gray-300 rounded px-3 py-2 flex-1"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={focusInput}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Focus Input
                </button>
                <button
                  onClick={clearInput}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  Clear & Focus
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Control:</label>
              <video
                ref={videoRef}
                width="100%"
                height="200"
                controls={false}
                className="bg-gray-200 rounded mb-2"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={toggleVideo}
                className={`px-4 py-2 rounded text-white ${
                  isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isPlaying ? "Pause" : "Play"} Video
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Control */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Scroll Control</h2>

          <div className="flex gap-2 mb-4">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              Scroll to Top
            </button>
            <button
              onClick={scrollToBottom}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
            >
              Scroll to Bottom
            </button>
          </div>

          <div ref={scrollRef} className="h-64 overflow-y-auto border border-gray-300 rounded">
            {scrollContent}
          </div>
        </div>

        {/* Persistent Values */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Persistent Values (No Re-render)</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Render Counter</h3>
              <p className="text-sm text-gray-600 mb-3">
                useRef can store values that persist across renders without triggering re-renders.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-lg font-bold text-blue-600">{countRef.current}</span>
                  <p className="text-xs text-gray-500">Total renders</p>
                </div>
                <div>
                  <span className="text-lg font-bold text-green-600">{renderCount}</span>
                  <p className="text-xs text-gray-500">State updates</p>
                </div>
              </div>
              <button
                onClick={forceRerender}
                className="mt-3 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Force Re-render
              </button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold text-yellow-800">Key Difference:</h4>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>
                  • <strong>useState:</strong> Triggers re-render when updated
                </li>
                <li>
                  • <strong>useRef:</strong> Persists value without re-rendering
                </li>
                <li>
                  • <strong>useRef.current:</strong> Mutable value that survives renders
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Value Tracking */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Previous Value Tracking</h2>

          <PreviousValueDemo />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-3">useRef Use Cases:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">DOM Manipulation:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Focus management</li>
              <li>Scroll control</li>
              <li>Media playback control</li>
              <li>Canvas drawing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Persistent Values:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Previous state values</li>
              <li>Timer IDs</li>
              <li>Render counters</li>
              <li>Instance variables</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component to demonstrate previous value tracking
const PreviousValueDemo = () => {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()

  useEffect(() => {
    prevCountRef.current = count
  })

  const prevCount = prevCountRef.current

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">{count}</div>
        <div className="text-lg text-gray-600">Previous: {prevCount !== undefined ? prevCount : "N/A"}</div>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          -1
        </button>
        <button onClick={() => setCount(0)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          +1
        </button>
      </div>

      <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded">
        <strong>How it works:</strong> useRef stores the previous value after each render, allowing you to compare
        current vs previous state.
      </div>
    </div>
  )
}

export default UseRefFocusDemo
