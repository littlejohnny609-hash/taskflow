import { useEffect, useState } from "react"
import PortfolioCard from "../components/PortfolioCard"

function Home() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/portfolio")
      .then(res => res.json())
      .then(data => setProfile(data))
  }, [])

  if (!profile) return <div className="p-10">Loading...</div>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <PortfolioCard profile={profile} />
    </div>
  )
}

export default Home