function ContactInfo({ contact }) {
  return (
    <section style={{ padding: "20px" }}>
      <h2>Contact</h2>
      <p>Email: {contact.email}</p>
      <p>
        GitHub:{" "}
        <a href={contact.github} target="_blank" rel="noreferrer">
          {contact.github}
        </a>
      </p>
    </section>
  );
}
export default ContactInfo;