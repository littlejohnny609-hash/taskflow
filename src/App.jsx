import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TasksPage from "./pages/TasksPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Home → Tasks */}
        <Route path="/" element={<TasksPage />} />
        {/* About page */}
        <Route path="/about" element={<AboutPage />} />
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
export default App;