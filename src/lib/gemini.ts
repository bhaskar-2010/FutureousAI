import { GoogleGenAI } from "@google/genai";

// We use the new `@google/genai` SDK
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateCounselorResponse(
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[] = []
) {
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash"
  ];

  const maxRetries = 5;
  const baseDelayMs = 1000;
  
  let lastError: any = null;

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
            systemInstruction: "You are FutureousAI Career Counselor, a professional career guidance expert specifically designed for Indian students. Be concise, deeply personalized, encouraging, and provide structured action items. Do not hallucinate exams or colleges. Provide real-world insights and avoid generic fluff.",
            temperature: 0.7,
          }
        });
        return response.text;
      } catch (error: any) {
        lastError = error;
        const status = error?.status || error?.response?.status;
        
        // Only retry on rate limit or service unavailable
        if (status === 429 || status === 503) {
          if (attempt < maxRetries) {
            const delay = baseDelayMs * Math.pow(2, attempt);
            if (process.env.NODE_ENV !== "production") {
              console.warn(`[Gemini API] ${status} Error on model ${model}. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
            }
            await sleep(delay);
            continue;
          }
        }
        
        if (process.env.NODE_ENV !== "production") {
          console.error(`[Gemini API] Failed on model ${model}:`, error);
        }
        break; // Break retries for this model, move to next model
      }
    }
  }

  throw new Error("AI Counselor is temporarily unavailable. Please try again later.");
}
