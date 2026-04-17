import { useState } from "react";
import { colors, buttonStyle } from "../styles";
function TaskCard({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");
  const [editedNotes, setEditedNotes] = useState(task.notes || "");
  const priorityColors = {
    high: colors.danger,
    medium: colors.warning,
    low: colors.success,
  };
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();
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
    border: isOverdue ? "2px solid red" : undefined,
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
  const editStyle = {
    ...buttonStyle,
    backgroundColor: colors.warning,
    color: "black",
    marginRight: "8px",
  };
  const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "8px",
  };
  const handleSave = () => {
    editTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      dueDate: editedDueDate,
      notes: editedNotes,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };
  return (
    <div style={cardStyle}>
      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />

          <textarea
            placeholder="Notes"
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
          />

          <div>
            <button style={editStyle} onClick={handleSave}>
              Save
            </button>

            <button onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 style={titleStyle}>{task.title}</h3>

          <p style={{ margin: 0 }}>{task.description}</p>

          {task.dueDate && (
            <p style={{ margin: 0, fontSize: "14px" }}>
              Due: {task.dueDate}
            </p>
          )}

          {task.notes && (
            <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
              Notes: {task.notes}
            </p>
          )}
          <p style={{ margin: 0, fontSize: "14px" }}>
            Priority: <strong>{task.priority}</strong>
          </p>

          {isOverdue && (
            <p style={{ color: "red", fontSize: "13px" }}>
              ⚠ Overdue
            </p>
          )}
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
            <div>
              <button
                style={editStyle}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button style={deleteStyle} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
export default TaskCard;