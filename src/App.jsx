import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import TasksPage from "./pages/TasksPage"
import AboutPage from "./pages/AboutPage"
import NotFoundPage from "./pages/NotFoundPage"
import Home from "./pages/Home"
import AIChatPage from "./pages/AIChatPage"
function App() {
  const handleClick = () => {
    alert("Button is working 🚀")
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Global Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">

        {/* 🔴 TAILWIND TEST BLOCK */}
        <div className="p-6 bg-red-500 text-white font-bold mb-4">
          TAILWIND WORKS
        </div>

        {/* 🧪 BASIC BUTTON TEST (NOW CLICKABLE) */}
        <button
          className="px-4 py-2 bg-black text-white rounded mb-6"
          onClick={handleClick}
        >
          BASIC BUTTON
        </button>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<Home />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </main>
    </div>
  )
}
export default App