import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function AIAdvice() {
  const { userData } = useUser();
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

    const prompt = `
    I am at ${location}. 
    Here is my appliances usage:
    ${JSON.stringify(appliances)}

    Based on this information, provide short, actionable energy-saving suggestions for me.
    Respond in bullet points if possible.
    `;

  const getAdvice = async () => {
    if (!userData) return;

    setLoading(true);
    setAiResponse("");

    try {
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    prompt: { text: prompt }, // send the combined string
    temperature: 0.7,
    maxOutputTokens: 300,
  }),
});

      const data = await res.json();
      setAiResponse(data.advice);
    } catch (error) {
      console.error("Fetch error:", error);
      setAiResponse("Failed to get AI advice. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mt-6">
      <button
        onClick={getAdvice}
        className="bg-teal-500 text-white px-4 py-2 rounded font-bold hover:bg-teal-600 transition"
      >
        Get AI Energy Advice
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}

      {aiResponse && (
        <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}
