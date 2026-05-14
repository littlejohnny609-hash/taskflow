import { useState } from "react";
export default function ScraperPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState("all");
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://taskflow-can3.onrender.com";
  const runScrape = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "playstation 5",
          store: store,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Scrape error:", err);
      setResult({
        success: false,
        error: "Backend not reachable or scraping failed",
        details: err.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Scraper Dashboard</h1>
      {/* STORE SELECTOR */}
      <div className="space-x-2">
        <button
          onClick={() => setStore("all")}
          className={`px-3 py-1 rounded ${
            store === "all" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          All Stores
        </button>
        <button
          onClick={() => setStore("amazon")}
          className={`px-3 py-1 rounded ${
            store === "amazon" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Amazon
        </button>
        <button
          onClick={() => setStore("ebay")}
          className={`px-3 py-1 rounded ${
            store === "ebay" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          eBay
        </button>
      </div>
      {/* SCRAPE BUTTON */}
      <button
        onClick={runScrape}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Scraping PS5 Prices..." : "Start Scrape"}
      </button>
      {/* RESULTS */}
      {result && (
        <div className="space-y-3">
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
          {/* SIMPLE REPORT UI (future-ready) */}
          {result.data && (
            <div className="p-4 bg-white border rounded">
              <h2 className="font-bold mb-2">Quick Report</h2>
              <p>
                Total Listings:{" "}
                <b>{result.data.length || 0}</b>
              </p>
              {result.data.length > 0 && (
                <p>
                  First Result: <b>{result.data[0].title}</b>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}