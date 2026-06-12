import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// Fallback questions if AI generation fails
const FALLBACK_QUESTIONS = [
  { id: "q1", trait: "Problem Solving", text: "You face an unexpected critical issue that stalls your project. What is your immediate reaction and first step?" },
  { id: "q2", trait: "Leadership", text: "Your team is losing morale during a difficult phase. How do you motivate them to keep pushing forward?" },
  { id: "q3", trait: "Decision Making", text: "You must choose between two paths: one is safe but yields average results, the other is risky but offers massive rewards. Which do you choose and why?" },
  { id: "q4", trait: "Stress Handling", text: "A major deadline was suddenly moved up by a week. How do you organize your time and handle the pressure?" },
  { id: "q5", trait: "Communication", text: "You have to explain a complex problem to someone with no background in your field. How do you approach this?" },
  { id: "q6", trait: "Discipline", text: "You are required to follow a strict routine for months with no immediate results. How do you stay focused?" },
  { id: "q7", trait: "Interest", text: "What specific aspect of this career excites you the most, and why?" },
  { id: "q8", trait: "Motivation", text: "If money was not an issue, would you still pursue this path? What is your underlying drive?" },
  { id: "q9", trait: "Behaviour", text: "You receive harsh but constructive criticism from a superior. What is your immediate thought process?" },
  { id: "q10", trait: "Long-Term Commitment", text: "Where do you see the challenges in this career 10 years down the line, and how will you prepare for them?" }
];

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();

    if (!profile || !profile.dreamCareer) {
      return NextResponse.json({ error: "Missing profile or dream career" }, { status: 400 });
    }

    const career = profile.dreamCareer;

    const prompt = `
      You are an expert Career Assessor for Indian students.
      The student wants to pursue a career as a: ${career}.
      
      Generate EXACTLY 10 situational interview questions specifically tailored to the career of ${career}.
      The questions must NOT be generic. They must use realistic scenarios from the daily life of a ${career}.
      
      Evaluate the following traits, assigning one trait primarily to each question (you can combine, but cover all):
      - Interest
      - Motivation
      - Behaviour
      - Leadership
      - Discipline
      - Decision Making
      - Communication
      - Problem Solving
      - Stress Handling
      - Long-Term Commitment
      
      Return ONLY a raw JSON array (do not wrap in markdown or backticks).
      Format:
      [
        { "id": "q1", "trait": "Problem Solving", "text": "Specific situational question..." },
        ... 9 more
      ]
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
        }
      });

      let responseText = response.text || "";
      
      // Clean up potential markdown formatting from Gemini
      responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
      
      const generatedQuestions = JSON.parse(responseText);

      if (!Array.isArray(generatedQuestions) || generatedQuestions.length !== 10) {
        throw new Error("Invalid format received from AI");
      }

      return NextResponse.json({ questions: generatedQuestions, isFallback: false });

    } catch (aiError) {
      console.error("AI Generation failed, using fallback:", aiError);
      
      // Fallback Logic
      const adaptedFallback = FALLBACK_QUESTIONS.map(q => ({
        ...q,
        text: q.text.replace(/this career/gi, `a career as a ${career}`).replace(/your project/gi, `your work as a ${career}`)
      }));

      return NextResponse.json({ questions: adaptedFallback, isFallback: true });
    }

  } catch (error) {
    console.error("Interview API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
