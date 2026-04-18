import { useState, useEffect, useMemo } from "react";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import { colors, buttonStyle } from "../styles";
import TaskStats from "../components/TaskStats";

function TasksPage() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Learn React",
            description: "Complete the basics",
            priority: "high",
            completed: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "Setup project",
            description: "Already done!",
            priority: "low",
            completed: true,
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            title: "Add features",
            description: "Coming soon",
            priority: "medium",
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ];
  });

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showForm, setShowForm] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Keyboard shortcut (N = open form)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "n") {
        setShowForm(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Add task (UPDATED for full object support)
  function addTask(task) {
    setTasks((prev) => [...prev, task]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id, updatedData) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  }

  function clearAllTasks() {
    setTasks([]);
    localStorage.removeItem("taskflow-tasks");
  }

  // FILTER + SEARCH + SORT (OPTIMIZED)
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesFilter =
          filter === "all"
            ? true
            : filter === "active"
            ? !task.completed
            : task.completed;

        const matchesSearch = task.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
        }
        if (sortBy === "priority") {
          return a.priority.localeCompare(b.priority);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [tasks, filter, searchQuery, sortBy]);

  const completedCount = tasks.filter((task) => task.completed).length;

  const isMobile = window.innerWidth < 600;

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
    flexWrap: isMobile ? "wrap" : "nowrap",
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

      {/* Stats */}
      <TaskStats tasks={tasks} />

      {/* Search */}
      <input
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="createdAt">Created Date</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>

      {/* Add Task */}
      {showForm && (
        <AddTaskForm addTask={addTask} />
      )}

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
        <button
          style={inactiveButtonStyle}
          onClick={clearAllTasks}
        >
          Clear All
        </button>
      </div>
      {/* Tasks */}
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}

    </div>
  );
}
export default TasksPage;