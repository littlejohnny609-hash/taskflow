function TaskCard({ title, description, priority }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Priority: {priority}</span>
    </div>
  );
}
export default TaskCard;