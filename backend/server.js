import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const app = express();
/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: "*", // IMPORTANT: avoids CORS issues on Render
}));
app.use(express.json());
/* =========================
   HEALTH CHECK (Render)
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
/* DEBUG: confirm key exists */
console.log(
  "OPENAI KEY STATUS:",
  process.env.OPENAI_API_KEY ? "LOADED" : "MISSING"
);
/* =========================
   AI ROUTE
========================= */
app.post("/api/chat", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);
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
    console.log("AI RESPONSE OK");
    res.json({
      reply,
    });
  } catch (error) {
    console.error("❌ AI ERROR FULL:", error);
    res.status(500).json({
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