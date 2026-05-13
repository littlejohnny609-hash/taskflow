import { useState } from "react";
export default function ScraperPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://taskflow-can3.onrender.com";
  const runScrape = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/scrape`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Backend not reachable" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Scraper Dashboard</h1>
      <button
        onClick={runScrape}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Scraping..." : "Start Scrape"}
      </button>
      {result && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}