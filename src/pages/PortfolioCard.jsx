function PortfolioCard({ profile }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold">{profile.name}</h1>
      <p>{profile.title}</p>
      <h3 className="mt-4 font-semibold">Skills</h3>
      <ul>
        {profile.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
      <h3 className="mt-4 font-semibold">Projects</h3>
      <ul>
        {profile.projects.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong> - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PortfolioCard;