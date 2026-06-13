import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";

const envLocal = readFileSync(".env.local", "utf8");
const match = envLocal.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : "";

const ai = new GoogleGenAI({ apiKey });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Hello",
    });
    console.log("Success 2.5:", response.text);
  } catch (err: any) {
    console.error("Error 2.5:", err.message || err);
  }
}
run();
