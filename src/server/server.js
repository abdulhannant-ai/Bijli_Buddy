import express from "express";
import cors from "cors";
// Use 'node-fetch' for older Node versions, or remove if using Node 18+
import fetch from "node-fetch"; 
import dotenv from "dotenv";

dotenv.config(); // load .env file

// 1️⃣ Initialize Express app
const app = express();

// 2️⃣ Middleware
app.use(cors({
  // IMPORTANT: Ensure your React frontend URL is correct here (e.g., http://localhost:5173)
  origin: "http://localhost:5173" 
}));
app.use(express.json());

// 3️⃣ Gemini API config
// Use the current, stable model and the correct API path
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5:generateContent";
const API_KEY = process.env.GEMINI_API_KEY; // store your key in .env

// 4️⃣ Routes
app.post("/get-ai-advice", async (req, res) => {
  try {
    // Check for API Key
    if (!API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set in environment variables." });
    }

    const { location, appliances } = req.body;

    // 💡 Construct the prompt clearly
    const prompt = `I am in ${location}. Here are my appliances usage: 
${JSON.stringify(appliances, null, 2)}.
Provide energy saving suggestions in short, actionable tips. Please format the response as a numbered list of advice points.`;

    // --- FIX: Updated the API request body structure ---
    const apiPayload = {
  contents: [{ parts: [{ text: prompt }] }],
  // The correct structure for the Google Search tool
  tools: [{ googleSearch: {} }], 
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 500,
  },
};
    // ---------------------------------------------------

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload), // Use the corrected payload
    });

    // Handle non-200 responses from the API
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error Response:", errorData);
        return res.status(response.status).json({ 
            error: "Gemini API failed with a status code",
            details: errorData 
        });
    }

    const data = await response.json();
    // Extract advice text
    // New Logic (More Robust for Grounded Responses)
let aiText = "No response from AI";

// 1. Check if candidates and content exist
const parts = data?.candidates?.[0]?.content?.parts;

if (parts && Array.isArray(parts)) {
    // 2. Loop through all parts until one with text is found
    for (const part of parts) {
        if (part.text) {
            aiText = part.text;
            break; // Stop after finding the first text part
        }
    }
}

    // You can optionally extract grounding sources here if needed for display

    res.json({ advice: aiText });
  } catch (error) {
    console.error("Server processing error:", error);
    res.status(500).json({ error: "Failed to process request on the backend" });
  }
});

// 5️⃣ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`AI backend running on port ${PORT}`));
