"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { QuestionText } from "@/components/ui/QuestionText";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/components/providers/AuthContext";
import { getQuestions, Question } from "@/data/questions";

export default function AptitudeTestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, profile, refreshProfile } = useAuth();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeTaken, setTimeTaken] = useState<Record<number, number>>({});
  
  // Timers
  const [totalTimeLeft, setTotalTimeLeft] = useState(15 * 60); // 15 mins total
  const [questionTimeLeft, setQuestionTimeLeft] = useState(60); // 60s per question
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile from local storage
    const profileDataStr = localStorage.getItem("futureousProfile");
    if (!profileDataStr) {
      router.push("/onboarding");
      return;
    }

    try {
      const profile = JSON.parse(profileDataStr);
      const q = getQuestions(profile.studentClass, profile.stream);
      if (q.length === 0) {
        // Fallback or error
        console.error("No questions found for", profile.studentClass, profile.stream);
        router.push("/onboarding");
        return;
      }
      setQuestions(q);
      setLoading(false);
    } catch (e) {
      router.push("/onboarding");
    }
  }, [router]);

  // Total Timer
  useEffect(() => {
    if (loading || totalTimeLeft <= 0) return;
    const timer = setInterval(() => setTotalTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [loading, totalTimeLeft]);

  // Question Timer
  useEffect(() => {
    if (loading || questionTimeLeft <= 0) return;
    const timer = setInterval(() => setQuestionTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [loading, questionTimeLeft, currentIndex]);

  const handleAnswer = (optionKey: string) => {
    const qId = questions[currentIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: optionKey }));
    setTimeTaken(prev => ({ ...prev, [qId]: 60 - questionTimeLeft }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setQuestionTimeLeft(60); // Reset question timer
    } else {
      finishTest();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setQuestionTimeLeft(60 - (timeTaken[questions[currentIndex - 1].id] || 0));
    }
  };

  const finishTest = useCallback(async () => {
    // Save results
    const results = {
      answers,
      timeTaken,
      totalTimeLeft
    };
    localStorage.setItem("futureousAptitudeResults", JSON.stringify(results));
    try {
      if (user?.uid) {
        await setDoc(doc(db, "users", user.uid), { aptitudeScores: results }, { merge: true });
        await refreshProfile();
      }
    } catch (e) {
      console.error(e);
    }
    
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("flow") === "personal") {
        router.push("/personal-analysis/report");
        return;
      }
    }
    
    router.push("/analysis");
  }, [answers, timeTaken, totalTimeLeft, router, user, refreshProfile]);

  // Auto finish if total time runs out
  useEffect(() => {
    if (totalTimeLeft === 0) {
      finishTest();
    }
  }, [totalTimeLeft, finishTest]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading test environment...</div>;
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col">
      {/* Test Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="w-full bg-muted h-1">
          <div className="bg-primary h-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-semibold text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="flex gap-6">
            <div className={`flex items-center gap-2 font-mono font-bold ${questionTimeLeft < 15 ? 'text-red-500' : 'text-primary'}`}>
              <Clock className="w-4 h-4" />
              {questionTimeLeft}s
            </div>
            <div className={`flex items-center gap-2 font-mono font-bold ${totalTimeLeft < 60 ? 'text-red-500' : 'text-foreground'}`}>
              Total: {formatTime(totalTimeLeft)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 md:py-12 flex justify-center">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-10"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
                <QuestionText text={currentQ.text} />
              </h2>

              <div className="space-y-4">
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswer(key)}
                    className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      answers[currentQ.id] === key
                        ? "border-primary bg-primary/5 text-foreground shadow-sm"
                        : "border-border hover:border-primary/40 bg-background"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      answers[currentQ.id] === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {key}
                    </div>
                    <span className="text-lg"><QuestionText text={value} /></span>
                  </button>
                ))}
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
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-105"
            >
              {currentIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
