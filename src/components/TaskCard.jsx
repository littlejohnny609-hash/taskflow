import { colors, buttonStyle } from "../styles";
function TaskCard({ task, toggleTask, deleteTask }) {
  const priorityColors = {
    high: colors.danger,
    medium: colors.warning,
    low: colors.success,
  };
  const cardStyle = {
    borderLeft: `6px solid ${priorityColors[task.priority]}`,
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: task.completed ? "#f9f9f9" : colors.white,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    color: task.completed ? colors.gray : "#000",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };
  const titleStyle = {
    margin: 0,
    textDecoration: task.completed ? "line-through" : "none",
  };
  const checkboxStyle = {
    transform: "scale(1.2)",
    marginRight: "8px",
    cursor: "pointer",
  };
  const deleteStyle = {
    ...buttonStyle,
    backgroundColor: colors.danger,
    color: "white",
  };
  const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "8px",
  };
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{task.title}</h3>
      <p style={{ margin: 0 }}>{task.description}</p>
      <p style={{ margin: 0, fontSize: "14px" }}>
        Priority: <strong>{task.priority}</strong>
      </p>
      <div style={footerStyle}>
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            style={checkboxStyle}
          />
          Completed
        </label>
        <button
          style={deleteStyle}
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default TaskCard;