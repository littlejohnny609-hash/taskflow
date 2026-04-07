function TaskCard({ task, toggleTask, deleteTask }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}
export default TaskCard;