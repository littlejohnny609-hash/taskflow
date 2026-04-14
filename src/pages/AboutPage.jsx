import ProfileHeader from "../components/about/ProfileHeader";
import SkillList from "../components/about/SkillList";
import StrongPoints from "../components/about/StrongPoints";
import ContactInfo from "../components/about/ContactInfo";
import { profile } from "../data/profile";

function AboutPage() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <ProfileHeader name={profile.name} title={profile.title} />

      <section style={{ padding: "20px" }}>
        <h2>Summary</h2>
        <p>{profile.summary}</p>
      </section>

      <section style={{ padding: "20px" }}>
        <h2>Education</h2>
        <p>{profile.education}</p>
      </section>

      <SkillList title="Skills" skills={profile.skills} />

      <StrongPoints points={profile.strongPoints} />

      <ContactInfo contact={profile.contact} />
    </div>
  );
}

export default AboutPage;