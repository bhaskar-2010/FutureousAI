"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Target, Brain, ShieldAlert } from "lucide-react";
import { QuestionText } from "@/components/ui/QuestionText";

interface Question {
  id: string;
  trait: string;
  text: string;
}

export default function CareerInterviewPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const profileDataStr = localStorage.getItem("futureousPersonalAnalysisProfile");
    if (!profileDataStr) {
      router.push("/personal-analysis/onboarding");
      return;
    }

    try {
      const p = JSON.parse(profileDataStr);
      setProfile(p);
      generateQuestions(p);
    } catch (e) {
      router.push("/personal-analysis/onboarding");
    }
  }, [router]);

  const generateQuestions = async (p: any) => {
    try {
      const res = await fetch("/api/personal-analysis/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: p }),
      });
      
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
      } else {
        throw new Error("Failed to load questions");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate career intelligence. Please try again.");
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  const handleNext = () => {
    const currentQId = questions[currentIndex].id;
    if (!answers[currentQId] || answers[currentQId].trim().length < 10) {
      alert("Please provide a more detailed answer (at least 10 characters).");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishInterview();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const finishInterview = () => {
    const interviewData = {
      questions,
      answers
    };
    localStorage.setItem("futureousPersonalAnalysisInterview", JSON.stringify(interviewData));
    
    // Redirect to aptitude test with flow flag
    router.push("/aptitude?flow=personal");
  };

  if (loading || generating) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="mb-6">
          <Target className="w-16 h-16 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Career Intelligence Engine Active</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Analyzing {profile?.dreamCareer} profile and generating dynamic, career-specific scenarios...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">{error}</h2>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-full mt-4">
          Retry
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="w-full bg-muted h-1.5">
          <motion.div 
            className="bg-gradient-to-r from-accent to-primary h-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-semibold text-muted-foreground flex items-center gap-2">
            <Brain className="w-4 h-4" /> Career Intelligence Interview
          </div>
          <div className="font-bold text-foreground">
            Scenario {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 md:py-12 flex justify-center items-start">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-3xl shadow-lg p-6 md:p-10"
            >
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent font-medium rounded-full text-sm mb-6">
                Evaluating: {currentQ.trait}
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
                <QuestionText text={currentQ.text} />
              </h2>

              <div className="space-y-4">
                <textarea
                  autoFocus
                  placeholder="Type your authentic response here. How would you actually react in this situation?"
                  value={answers[currentQ.id] || ""}
                  onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                  className="w-full h-48 bg-background border border-border rounded-xl p-5 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none resize-none text-lg leading-relaxed"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                currentIndex === 0 ? "opacity-0 pointer-events-none" : "text-foreground hover:bg-muted"
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Previous
            </button>

            <button
              onClick={handleNext}
              className="group flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
            >
              {currentIndex === questions.length - 1 ? "Proceed to Aptitude Test" : "Next Scenario"} 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
