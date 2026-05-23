import axios from "axios";

export async function callGemini(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty response from Gemini");

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return cleaned;

  } catch (error: any) {
    // ✅ Log full error details
    console.error("Gemini API Error:");
    console.error("Status:", error?.response?.status);
    console.error("Data:", JSON.stringify(error?.response?.data, null, 2));
    console.error("URL called:", error?.config?.url);
    throw error;
  }
}