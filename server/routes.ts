import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // OpenAI configuration
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.gmgm.dev/v1",
  });

  // Get all messages
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Add a new message and get AI response
  app.post("/api/messages", async (req, res) => {
    try {
      const { content } = req.body;

      if (!content || typeof content !== "string" || content.trim() === "") {
        return res.status(400).json({ message: "Message content is required" });
      }

      // Save user message
      const userMessage = await storage.createMessage({
        content,
        role: "user",
      });

      try {
        // Call OpenAI API
        const response = await openai.chat.completions.create({
          model: "llama-3-8b", // Using a widely available model
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content },
          ],
        });

        const assistantContent =
          response.choices[0].message.content ||
          "I'm sorry, I couldn't generate a response.";

        // Save assistant message
        const assistantMessage = await storage.createMessage({
          content: assistantContent,
          role: "assistant",
        });

        // Return both messages
        res.json({ userMessage, assistantMessage });
      } catch (aiError) {
        console.error("OpenAI API error:", aiError);

        // Even if AI response fails, still return the user message
        // and indicate that the AI response failed
        res.status(200).json({
          userMessage,
          error: "Failed to get AI response. Please try again.",
        });
      }
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
