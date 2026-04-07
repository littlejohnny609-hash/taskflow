import { useState } from "react";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", description: "Complete the basics", priority: "high", completed: false },
    { id: 2, title: "Setup project", description: "Already done!", priority: "low", completed: true },
    { id: 3, title: "Add features", description: "Coming soon", priority: "medium", completed: false },
  ]);

  const [filter, setFilter] = useState("all");

  function addTask(title, description, priority) {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      <Header />

      <AddTaskForm addTask={addTask} />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
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