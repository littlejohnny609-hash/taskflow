import { useState } from "react";
export default function AutoApplyPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://taskflow-can3.onrender.com";
  const handleApply = async () => {
    if (!url) {
      setResult("Please enter a URL first.");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(`${API_URL}/autoapply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Server error");
      }
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult("❌ Cannot connect to backend.");
      console.error(err);
    }
    setLoading(false);
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Auto Apply / Auto Email</h2>
      <input
        type="text"
        placeholder="Enter job or contact URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", padding: "8px" }}
      />
      <br /><br />
      <button onClick={handleApply} disabled={loading}>
        {loading ? "Running..." : "Auto Apply"}
      </button>
      <pre style={{ marginTop: 20, background: "#f4f4f4", padding: "10px" }}>
        {result}
      </pre>
    </div>
  );
}