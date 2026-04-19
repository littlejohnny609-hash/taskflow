import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AIChatPage() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    const text = message
    setMessage("")

    setChat(prev => [...prev, { role: "user", text }])
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      })

      if (!res.ok) throw new Error("Server error")

      const data = await res.json()

      setChat(prev => [
        ...prev,
        { role: "ai", text: data.reply || "No response from AI" }
      ])

    } catch (error) {
      setChat(prev => [
        ...prev,
        { role: "ai", text: "❌ Error connecting to server" }
      ])
    } finally {
      setLoading(false)
    }
  }

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
            <p className="text-sm text-gray-500">AI is typing...</p>
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
  )
}