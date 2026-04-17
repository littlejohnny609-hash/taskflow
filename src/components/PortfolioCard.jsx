import { useEffect, useState } from "react"

export default function PortfolioCard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/portfolio")
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="p-6 max-w-md mx-auto mt-20 shadow-lg rounded-lg border">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="text-gray-600">{data.title}</p>
      <p className="mt-2">{data.summary}</p>

      <h3 className="mt-4 font-semibold">Skills</h3>
      <ul className="list-disc ml-5">
        {data.skills?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded"
        onClick={() => window.open("http://localhost:8080/generate-pdf")}
      >
        Download PDF
      </button>
    </div>
  )
}