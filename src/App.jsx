import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import TasksPage from "./pages/TasksPage"
import AboutPage from "./pages/AboutPage"
import NotFoundPage from "./pages/NotFoundPage"
import Home from "./pages/Home"
import AIChatPage from "./pages/AIChatPage"

// (Optional future pages – create later)
// import QRPage from "./pages/QRPage"
// import ScrapePage from "./pages/ScrapePage"
// import AutomationPage from "./pages/AutomationPage"

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>

          {/* Main App */}
          <Route path="/" element={<TasksPage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Portfolio */}
          <Route path="/portfolio" element={<Home />} />

          {/* AI Chatbot Page */}
          <Route path="/ai-chat" element={<AIChatPage />} />

          {/* Future Pages */}
          {/*
          <Route path="/qr" element={<QRPage />} />
          <Route path="/scrape" element={<ScrapePage />} />
          <Route path="/automation" element={<AutomationPage />} />
          */}

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </main>

    </div>
  )
}

export default App