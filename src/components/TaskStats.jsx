export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const high = tasks.filter((t) => t.priority === "high").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const low = tasks.filter((t) => t.priority === "low").length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  return (
    <div>
      <h3>Task Stats</h3>
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Priority: {high} high, {medium} medium, {low} low</p>

      <div style={{ width: "100%", background: "#eee" }}>
        <div
          style={{
            width: `${percent}%`,
            background: "green",
            height: "10px"
          }}
        />
      </div>
    </div>
  );
}