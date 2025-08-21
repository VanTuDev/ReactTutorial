import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import { routes } from "./routes"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
