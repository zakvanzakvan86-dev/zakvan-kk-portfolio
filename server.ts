import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import chatHandler from "./api/chat.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ===================================================================
// API ROUTES (Always placed before static/Vite middleware)
// ===================================================================

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== ""),
    service: "zakvan-portfolio-api",
    runtime: "vercel-serverless-compatible",
  });
});

app.all("/api/chat", async (req, res) => {
  try {
    await chatHandler(req, res);
  } catch (error: any) {
    console.error("Chat route error in server.ts:", error);
    res.status(500).json({
      success: false,
      fallback: true,
      message: "AI assistant is temporarily unavailable.",
      error: error?.message || "Internal server error",
    });
  }
});

// ===================================================================
// VITE & STATIC SERVING SETUP
// ===================================================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zakvan KK Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
