function StrongPoints({ points }) {
  return (
    <section style={{ padding: "20px" }}>
      <h2>Strong Points</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Point</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {points.map((item) => (
            <tr key={item.point}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.point}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default StrongPoints;