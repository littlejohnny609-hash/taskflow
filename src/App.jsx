import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import AIChatPage from "./pages/AIChatPage";
import AutoApplyPage from "./pages/AutoApplyPage";
import QRPage from "./pages/QRPage";
import ScraperPage from "./pages/ScraperPage";
import TasksPage from "./pages/TasksPage";
import Test from "./pages/Test";
function App() {
  return (
    <>
      {/* Navigation */}
      <nav style={{ padding: "10px", background: "#111" }}>
        <Link to="/" style={{ marginRight: "15px", color: "white" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "15px", color: "white" }}>About</Link>
        <Link to="/ai" style={{ marginRight: "15px", color: "white" }}>AI Chat</Link>
        <Link to="/qr" style={{ marginRight: "15px", color: "white" }}>QR</Link>
        <Link to="/scraper" style={{ marginRight: "15px", color: "white" }}>Scraper</Link>
        <Link to="/autoapply" style={{ marginRight: "15px", color: "white" }}>Auto Apply</Link>
        <Link to="/tasks" style={{ marginRight: "15px", color: "white" }}>Tasks</Link>
        <Link to="/test" style={{ marginRight: "15px", color: "white" }}>Test</Link>
      </nav>
      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ai" element={<AIChatPage />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/scraper" element={<ScraperPage />} />
        <Route path="/autoapply" element={<AutoApplyPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}
export default App;