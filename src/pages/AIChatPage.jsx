import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  // Backend URL (Render)
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://taskflow-can3.onrender.com";
  const sendMessage = async () => {
    if (!message.trim()) return;
    const text = message;
    setMessage("");
    setChat((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      console.log("Sending request to:", `${API_URL}/api/chat`);
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      console.log("Response status:", res.status);
      // 🔥 Better error handling
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error response:", errorText);
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      console.log("AI response:", data);
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "No response from AI",
        },
      ]);
    } catch (error) {
      console.error("FETCH ERROR:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Cannot reach AI server (check backend / CORS / API key)",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">AI Chatbot</h1>
      {/* CHAT BOX */}
      <Card className="h-[400px] overflow-y-auto">
        <CardContent className="p-4 space-y-3">
          {chat.length === 0 && (
            <p className="text-gray-400 text-sm">
              Start a conversation...
            </p>
          )}
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-black text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <p className="text-sm text-gray-500">
              AI is typing...
            </p>
          )}
        </CardContent>
      </Card>
      {/* INPUT */}
      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}