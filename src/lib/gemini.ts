import { GoogleGenAI } from "@google/genai";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateCounselorResponse(
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[] = []
) {
  console.log("Checking Gemini Key");
  const apiKey = process.env.GEMINI_API_KEY || "";
  console.log("Key Found:", !!apiKey);

  if (!apiKey) {
    throw new Error("Gemini API key missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash"
  ];

  const maxRetries = 5;
  const baseDelayMs = 1000;
  
  let lastError: any = null;

  console.log("Sending Gemini Request");

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            ...history,
            { role: "user", parts: [{ text: prompt }] }
          ],
          config: {
            systemInstruction: "You are FutureousAI Career Counselor, a professional career guidance expert specifically designed for Indian students. CRITICAL: Your responses MUST ALWAYS be short, highly structured, and use bullet points. Always organize your response using these exact headings: **Overview**, **Requirements**, **Roadmap**, **Exams**, and **Tips**. Avoid generic fluff. Do not write long paragraphs. Be concise, deeply personalized, and provide structured action items. Do not hallucinate exams or colleges.",
            temperature: 0.7,
          }
        });
        
        console.log("Gemini Response Received");
        
        if (!response || !response.text) {
          throw new Error("Invalid Gemini response");
        }
        
        return response.text;
      } catch (error: any) {
        lastError = error;
        const status = error?.status || error?.response?.status;
        console.error("Gemini Error:", error);
        
        if (error.message === "Invalid Gemini response") {
          throw error;
        }

        if (status === 401 || status === 403 || error.message?.includes("API key not valid")) {
          throw new Error("Authentication failed");
        }
        
        // Only retry on rate limit or service unavailable
        if (status === 429 || status === 503 || error.message?.includes("fetch failed")) {
          if (attempt < maxRetries) {
            const delay = baseDelayMs * Math.pow(2, attempt);
            console.warn(`[Gemini API] ${status || 'Network Error'} on model ${model}. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
            await sleep(delay);
            continue;
          } else {
             if (status === 429) throw new Error("Rate limit exceeded (429)");
             if (status === 503) throw new Error("Service Unavailable (503)");
             if (error.message?.includes("fetch failed")) throw new Error("Connection error");
          }
        }
        
        break; // Break retries for this model, move to next model
      }
    }
  }

  // If we exhausted models and still failed
  if (lastError) {
     if (lastError.message === "Authentication failed") throw lastError;
     if (lastError.message === "Gemini API key missing") throw lastError;
     if (lastError.message === "Invalid Gemini response") throw lastError;
     if (lastError.message === "Rate limit exceeded (429)") throw lastError;
     if (lastError.message === "Service Unavailable (503)") throw lastError;
     if (lastError.message === "Connection error") throw lastError;
  }
  
  throw new Error("AI Counselor is temporarily unavailable. Please try again later.");
}
