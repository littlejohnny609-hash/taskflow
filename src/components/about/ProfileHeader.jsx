function ProfileHeader({ name, title }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#2c3e50",
        color: "#ffffff",
      }}
    >
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
export default ProfileHeader;