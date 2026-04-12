import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#2c3e50",
        padding: "16px",
        color: "#fff",
      }}
    >
      <h1 style={{ margin: 0 }}>TaskFlow</h1>
      <p style={{ marginTop: "4px", marginBottom: "12px" }}>
        Manage your tasks efficiently
      </p>

      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: "#fff",
            marginRight: "16px",
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Tasks
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            color: "#fff",
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;