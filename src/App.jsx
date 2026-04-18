import { Routes, Route } from "react-router-dom"
import PortfolioCard from "./components/PortfolioCard"
import Header from "./components/Header"
import TasksPage from "./pages/TasksPage"
import AboutPage from "./pages/AboutPage"
import NotFoundPage from "./pages/NotFoundPage"
import Home from "./pages/Home"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header stays on all pages */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Portfolio page (your full-stack project) */}
        <Route path="/portfolio" element={<Home />} />

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  )
}

export default App