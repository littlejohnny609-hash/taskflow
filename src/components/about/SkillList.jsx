function SkillList({ title, skills }) {
  return (
    <section style={{ padding: "20px" }}>
      <h2>{title}</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
export default SkillList;