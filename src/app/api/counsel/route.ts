import { NextResponse } from "next/server";
import { generateCounselorResponse } from "@/lib/gemini";
import { generateLocalCounselorResponse } from "@/lib/localCounselor";

// Simple in-memory cache to prevent repetitive queries during demos
const responseCache = new Map<string, { response: string, isFallback: boolean, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export async function POST(req: Request) {
  console.log("Counsel API Started");
  try {
    const body = await req.json();
    const { question, profile, interests, aptitude, history, demoMode } = body;

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    // Check Cache
    const cacheKey = `${question}-${profile?.studentClass}-${profile?.stream}-${demoMode}`;
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ response: cached.response, isFallback: cached.isFallback });
    }

    // If demoMode is enabled, instantly return local fallback
    if (demoMode) {
      const localResponse = generateLocalCounselorResponse(question, profile);
      responseCache.set(cacheKey, { response: localResponse, isFallback: true, timestamp: Date.now() });
      return NextResponse.json({ response: localResponse, isFallback: true });
    }

    const promptContext = `
Student Profile: Class ${profile?.studentClass || 'Unknown'}, Stream: ${profile?.stream || 'Unknown'}
Interests: ${interests?.join(', ') || 'None provided'}
Aptitude Test Base Stats: ${aptitude ? Object.keys(aptitude).length + ' answers captured' : 'No data'}
    
Student Question: ${question}
`;

    try {
      const rawResponse = await generateCounselorResponse(promptContext, history || []);
      const responseText = rawResponse || "I am sorry, but I am unable to provide a response right now.";
      responseCache.set(cacheKey, { response: responseText, isFallback: false, timestamp: Date.now() });
      return NextResponse.json({ response: responseText, isFallback: false });
    } catch (geminiError: any) {
      // Unconditionally log the error so we can debug on Vercel
      console.error("Gemini failed completely, falling back to local intelligence:", geminiError);
      
      const localResponse = generateLocalCounselorResponse(question, profile);
      responseCache.set(cacheKey, { response: localResponse, isFallback: true, timestamp: Date.now() });
      return NextResponse.json({ response: localResponse, isFallback: true });
    }

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Counselor is temporarily unavailable." },
      { status: 500 }
    );
  }
}
