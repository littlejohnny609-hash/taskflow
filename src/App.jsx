import Header from "./components/Header";
import TaskCard from "./components/TaskCard";

function App() {
  const tasks = [
    {
      id: 1,
      title: "Learn React",
      description: "Complete the basics",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Setup project",
      description: "Already done!",
      priority: "low",
      completed: true,
    },
    {
      id: 3,
      title: "Add features",
      description: "Coming soon",
      priority: "medium",
      completed: false,
    },
  ];

  return (
    <div>
      <Header />

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
        />
      ))}
    </div>
  );
}

export default App;