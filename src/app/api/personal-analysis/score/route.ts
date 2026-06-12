import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { profile, interview, aptitude } = await req.json();

    if (!profile || !profile.dreamCareer) {
      return NextResponse.json({ error: "Missing profile" }, { status: 400 });
    }

    const career = profile.dreamCareer;

    // We pass the raw answers to Gemini to analyze
    const interviewString = JSON.stringify(interview.answers);
    const aptitudeScoreEstimation = aptitude && aptitude.answers ? Object.keys(aptitude.answers).length * 4 : 50; 

    const prompt = `
      You are an expert Career Assessor and Analyst.
      Student Profile: Name: ${profile.name}, Class: ${profile.studentClass}, Stream: ${profile.stream}.
      Dream Career: ${career}.
      
      Interview Responses to Situational Questions:
      ${interviewString}
      
      Aptitude Engagement Metric: ~${aptitudeScoreEstimation} / 100
      
      Your task is to deeply analyze these inputs and generate a highly detailed, premium psychometric assessment report.
      
      Calculate Final Career Fit Score using exactly this formula:
      (Interest * 0.40) + (Personality * 0.25) + (Aptitude * 0.25) + (Commitment * 0.10).
      
      Determine Suitability Classification based on Final Score:
      90-100: Exceptional Match, 75-89: Strong Match, 60-74: Moderate Match, 40-59: Needs Development, Below 40: Needs Further Exploration.
      
      Return ONLY raw JSON, exactly matching this structure (no markdown, no backticks):
      {
        "executiveSummary": {
          "shortSummary": "string",
          "overallRecommendation": "string"
        },
        "scores": {
          "interest": 85,
          "personality": 80,
          "aptitude": 75,
          "commitment": 90,
          "leadership": 82,
          "communication": 88,
          "problemSolving": 79,
          "discipline": 85,
          "creativity": 80,
          "finalFit": 82
        },
        "classification": "Strong Match",
        "detailedSkills": [
          { "skill": "Leadership", "score": 82, "evaluation": "string" },
          { "skill": "Communication", "score": 88, "evaluation": "string" },
          { "skill": "Creativity", "score": 80, "evaluation": "string" },
          { "skill": "Discipline", "score": 85, "evaluation": "string" },
          { "skill": "Problem Solving", "score": 79, "evaluation": "string" },
          { "skill": "Career Interest", "score": 85, "evaluation": "string" },
          { "skill": "Aptitude", "score": 75, "evaluation": "string" },
          { "skill": "Commitment", "score": 90, "evaluation": "string" }
        ],
        "strengthsAnalysis": [
          { "title": "string", "score": 90, "description": "string", "careerImpact": "string" }
        ],
        "improvementAnalysis": [
          { "area": "string", "currentStatus": "string", "suggestedImprovement": "string", "careerBenefit": "string" }
        ],
        "roadmap": {
          "shortTerm": ["string", "string"],
          "mediumTerm": ["string", "string"],
          "longTerm": ["string", "string"]
        },
        "recommendedCareers": {
          "topMatching": ["string", "string"],
          "alternative": ["string"],
          "related": ["string"]
        },
        "parentConfidence": {
          "confidenceScore": 85,
          "childStrengthAnalysis": "string paragraph",
          "observedPotential": "string paragraph",
          "improvementOpportunities": "string paragraph",
          "guidanceForParents": "string paragraph",
          "howToSupport": "string paragraph",
          "professionalSummary": "string paragraph"
        },
        "finalVerdict": "string paragraph summarizing the overall assessment"
      }
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
      responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
      
      const report = JSON.parse(responseText);

      return NextResponse.json({ report, isFallback: false });

    } catch (aiError) {
      console.error("AI Generation failed, using fallback:", aiError);
      
      // Fallback Logic with the new complex structure
      const fallbackReport = {
        executiveSummary: {
          shortSummary: `${profile.name} exhibits a balanced profile with promising indicators for a career as a ${career}.`,
          overallRecommendation: "Proceed with structured preparation and skill enhancement."
        },
        scores: {
          interest: 85, personality: 80, aptitude: 75, commitment: 80,
          leadership: 75, communication: 80, problemSolving: 85, discipline: 80, creativity: 75,
          finalFit: 81
        },
        classification: "Strong Match",
        detailedSkills: [
          { skill: "Leadership", score: 75, evaluation: "Shows potential to guide others effectively." },
          { skill: "Communication", score: 80, evaluation: "Articulates ideas clearly under normal conditions." },
          { skill: "Creativity", score: 75, evaluation: "Capable of standard innovative thinking." },
          { skill: "Discipline", score: 80, evaluation: "Maintains focus during extended tasks." },
          { skill: "Problem Solving", score: 85, evaluation: "Strong analytical approach to unexpected issues." },
          { skill: "Career Interest", score: 85, evaluation: "High intrinsic motivation for the field." },
          { skill: "Aptitude", score: 75, evaluation: "Solid foundational cognitive abilities." },
          { skill: "Commitment", score: 80, evaluation: "Demonstrates long-term perseverance." }
        ],
        strengthsAnalysis: [
          { title: "Analytical Problem Solving", score: 85, description: "Quickly dissects complex issues.", careerImpact: `Highly beneficial for technical aspects of ${career}.` },
          { title: "Intrinsic Motivation", score: 85, description: "Driven by genuine interest rather than external factors.", careerImpact: "Ensures longevity and resilience in the field." }
        ],
        improvementAnalysis: [
          { area: "Leadership Presence", currentStatus: "Developing", suggestedImprovement: "Take charge of small group projects.", careerBenefit: "Essential for senior roles." },
          { area: "Stress Management", currentStatus: "Adequate", suggestedImprovement: "Practice time-bound decision making.", careerBenefit: "Prevents burnout during critical phases." }
        ],
        roadmap: {
          shortTerm: ["Research foundational concepts", "Start a small related project"],
          mediumTerm: ["Complete a certification or course", "Build a portfolio"],
          longTerm: ["Prepare for relevant entrance exams", "Seek internships"]
        },
        recommendedCareers: {
          topMatching: [career, "Related Field Analyst"],
          alternative: ["Management Trainee"],
          related: ["Consultant"]
        },
        parentConfidence: {
          confidenceScore: 82,
          childStrengthAnalysis: `${profile.name} shows a strong natural inclination towards ${career}, particularly in problem-solving scenarios.`,
          observedPotential: `The personality profile aligns well with the demands of ${career}, suggesting a comfortable fit.`,
          improvementOpportunities: `Focus on developing leadership and stress management skills.`,
          guidanceForParents: `Encourage participation in extracurricular activities related to ${career}.`,
          howToSupport: "Provide a structured environment for consistent study and project work.",
          professionalSummary: `With consistent effort, ${profile.name} has the potential to excel in this field.`
        },
        finalVerdict: `${profile.name} shows strong promise for a career as a ${career}. Continued dedication and targeted skill development will be key to long-term success.`
      };

      return NextResponse.json({ report: fallbackReport, isFallback: true });
    }

  } catch (error) {
    console.error("Score API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
