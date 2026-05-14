import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const app = express();
/* =========================
   CORS
========================= */
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());
/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Taskflow backend running 🚀",
  });
});
/* =========================
   PORTFOLIO ROUTE
========================= */
app.get("/portfolio", (req, res) => {
  res.json({
    name: "John Wanjiku",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "Express", "Supabase"],
    projects: [
      { name: "Taskflow AI", description: "AI automation platform" }
    ]
  });
});
/* =========================
   SCRAPE ROUTE
========================= */
app.post("/scrape", async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "Scrape completed",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      error: "Scrape failed",
      details: error.message
    });
  }
});
/* =========================
   AUTO APPLY ROUTE
========================= */
app.post("/autoapply", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }
    return res.json({
      success: true,
      message: `Application simulated for ${url}`
    });
  } catch (error) {
    return res.status(500).json({
      error: "Auto apply failed",
      details: error.message
    });
  }
});
/* =========================
   OPENAI SETUP
========================= */
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY missing");
} else {
  console.log("✅ OPENAI KEY LOADED");
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
/* =========================
   OPENAI CHAT ROUTE
========================= */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
    });
    return res.json({
      reply: response.choices[0].message.content
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);
    return res.status(500).json({
      error: "AI request failed",
      details: error.message
    });
  }
});
/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});