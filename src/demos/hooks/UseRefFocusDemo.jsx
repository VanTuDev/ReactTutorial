"use client"

import { useRef, useState } from "react"

const UseRefFocusDemo = () => {
  const inputRef = useRef(null)
  const videoRef = useRef(null)
  const scrollRef = useRef(null)
  const [inputValue, setInputValue] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const clearInput = () => {
    setInputValue("")
    inputRef.current?.focus()
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
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useRef Focus Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Input Focus Control</h3>
          <div className="space-y-3">
            <div>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something here..."
                className="border border-gray-300 px-3 py-2 rounded w-full max-w-md"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={focusInput} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Focus Input
              </button>
              <button onClick={clearInput} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Clear & Focus
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Video Control</h3>
          <div className="space-y-3">
            <video
              ref={videoRef}
              width="300"
              height="200"
              className="bg-gray-200 rounded"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div>
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

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Scroll Control</h3>
          <div className="space-y-3">
            <div ref={scrollRef} className="h-32 overflow-y-auto bg-gray-50 p-4 rounded border">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="p-2 bg-white rounded shadow-sm">
                    Item {i + 1} - This is some scrollable content
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={scrollToTop} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Scroll to Top
              </button>
              <button onClick={scrollToBottom} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Scroll to Bottom
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`const inputRef = useRef(null)

const focusInput = () => {
  inputRef.current?.focus()
}

return (
  <div>
    <input ref={inputRef} type="text" />
    <button onClick={focusInput}>Focus Input</button>
  </div>
)`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default UseRefFocusDemo
