import { useEffect, useState } from "react";
import PortfolioCard from "../components/PortfolioCard";
function Home() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://taskflow-can3.onrender.com";
  useEffect(() => {
    fetch(`${API_URL}/portfolio`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => {
        console.error("Portfolio fetch error:", err);
        setError("Failed to load portfolio");
      });
  }, [API_URL]);
  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }
  if (!profile) {
    return <div className="p-10">Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <PortfolioCard profile={profile} />
    </div>
  );
}
export default Home;