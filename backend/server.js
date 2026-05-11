import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Health check route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Taskflow AI backend is running 🚀" });
});
// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// AI route (MAIN FIXED ENDPOINT)
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    const reply = response.choices?.[0]?.message?.content;
    res.json({
      reply,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI request failed" });
  }
});
// Port (Render compatible)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});