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
        <Route path="/" element={<TasksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;