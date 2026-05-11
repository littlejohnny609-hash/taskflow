import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const app = express();
/* =========================
   CORS FIX (PRODUCTION SAFE)
========================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://taskflow-a955-git-develop-littlejohnny609-hashs-projects.vercel.app"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Taskflow AI backend is running 🚀",
  });
});
/* =========================
   OPENAI SETUP
========================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
/* DEBUG */
console.log(
  "OPENAI KEY STATUS:",
  process.env.OPENAI_API_KEY ? "LOADED" : "MISSING"
);
/* =========================
   AI ROUTE
========================= */
app.post("/api/chat", async (req, res) => {
  try {
    console.log("REQUEST RECEIVED:", req.body);
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
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
    const reply = response?.choices?.[0]?.message?.content;
    console.log("AI RESPONSE SUCCESS");
    return res.json({ reply });
  } catch (error) {
    console.error("❌ AI ERROR:", error);
    return res.status(500).json({
      error: "AI request failed",
      details: error.message,
    });
  }
});
/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});