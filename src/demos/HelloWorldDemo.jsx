const HelloWorldDemo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hello World Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Basic React Component</h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <h3 className="text-2xl text-blue-800">Hello, React World! 🌍</h3>
          <p className="text-blue-600 mt-2">This is your first React component!</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Code Example:</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto">
          {`const HelloWorldDemo = () => {
  return (
    <div>
      <h3>Hello, React World! 🌍</h3>
      <p>This is your first React component!</p>
    </div>
  )
}

export default HelloWorldDemo`}
        </pre>
      </div>
    </div>
  )
}

export default HelloWorldDemo
