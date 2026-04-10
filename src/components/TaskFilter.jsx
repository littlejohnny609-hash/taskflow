import { buttonStyle, colors } from "../styles";
function TaskFilter({ filter, setFilter }) {
  const containerStyle = {
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
  return (
    <div style={containerStyle}>
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
    </div>
  );
}
export default TaskFilter;