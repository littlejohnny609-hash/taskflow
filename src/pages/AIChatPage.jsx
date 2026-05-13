import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://taskflow-can3.onrender.com";
  const sendMessage = async () => {
    if (!message.trim()) return;
    const text = message;
    setMessage("");
    setChat(prev => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setChat(prev => [
        ...prev,
        { role: "ai", text: data.reply || "No response" }
      ]);
    } catch (err) {
      setChat(prev => [
        ...prev,
        { role: "ai", text: "❌ Backend not reachable" }
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">AI Chatbot</h1>
      <Card className="h-[400px] overflow-y-auto">
        <CardContent className="p-4 space-y-3">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                msg.role === "user"
                  ? "bg-black text-white ml-auto"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p>AI is typing...</p>}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}