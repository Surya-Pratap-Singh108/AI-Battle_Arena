import { ChatGoogle } from "@langchain/google/node";
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    model: "gemini-3.5-flash-lite",
    apiKey: config.GOOGLE_API_KEY,
    maxRetries: 2
});

export const mistralModel = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: config.GROQ_API_KEY,
    maxRetries: 1,
    maxTokens: 600, // increase from default
});

export const cohoreModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY,
});