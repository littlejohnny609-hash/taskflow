import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import { colors, buttonStyle } from "./styles";
function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Learn React", description: "Complete the basics", priority: "high", completed: false },
          { id: 2, title: "Setup project", description: "Already done!", priority: "low", completed: true },
          { id: 3, title: "Add features", description: "Coming soon", priority: "medium", completed: false },
        ];
  });
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);
  function addTask(title, description, priority) {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      lastUpdated: new Date().toISOString(), // optional timestamp
    };
    setTasks(prev => [...prev, newTask]);
  }
  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              lastUpdated: new Date().toISOString(),
            }
          : task
      )
    );
  }
  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }
  function clearAllTasks() {
    setTasks([]);
    localStorage.removeItem("taskflow-tasks");
  }
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  const completedCount = tasks.filter(task => task.completed).length;
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: colors.background,
    minHeight: "100vh",
  };
  const filterContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  };
  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: colors.primary,
    color: "white",
  };
  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ddd",
  };
  const taskCountStyle = {
    marginBottom: "15px",
    fontWeight: "bold",
  };
  return (
    <div style={containerStyle}>
      <Header />
      <AddTaskForm addTask={addTask} />
      <p style={taskCountStyle}>
        {tasks.length} tasks ({completedCount} completed)
      </p>
      {/* Filter Buttons */}
      <div style={filterContainerStyle}>
        <button
          style={filter === "all" ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          style={filter === "active" ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          style={filter === "completed" ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        {/* Optional Clear Button */}
        <button
          style={inactiveButtonStyle}
          onClick={clearAllTasks}
        >
          Clear All
        </button>
      </div>
      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
export default App;