const HelloWorldDemo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hello World Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Basic React Component</h2>
        <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
          <h3 className="text-lg font-medium text-blue-800">Hello, React World! 🚀</h3>
          <p className="text-blue-600 mt-2">This is your first React component demo.</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`const HelloWorldDemo = () => {
  return (
    <div>
      <h3>Hello, React World! 🚀</h3>
      <p>This is your first React component demo.</p>
    </div>
  )
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default HelloWorldDemo
