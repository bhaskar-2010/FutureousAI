"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/components/providers/AuthContext";
import { ArrowRight, ArrowLeft, CheckCircle2, GraduationCap, BookOpen, Lightbulb, Sparkles } from "lucide-react";

const INTEREST_OPTIONS = [
  { label: "Technology", emoji: "💻" },
  { label: "Defence", emoji: "🛡️" },
  { label: "History", emoji: "📜" },
  { label: "Sports", emoji: "⚽" },
  { label: "Medicine", emoji: "🏥" },
  { label: "Leadership", emoji: "👑" },
  { label: "Business", emoji: "💼" },
  { label: "Art", emoji: "🎨" },
  { label: "Design", emoji: "✏️" },
  { label: "Research", emoji: "🔬" },
  { label: "Teaching", emoji: "📚" },
  { label: "Gaming", emoji: "🎮" },
  { label: "Psychology", emoji: "🧠" },
  { label: "Space", emoji: "🚀" },
  { label: "Environment", emoji: "🌿" },
  { label: "Writing", emoji: "✍️" },
  { label: "Robotics", emoji: "🤖" },
  { label: "Law", emoji: "⚖️" },
  { label: "Agriculture", emoji: "🌾" },
];

const STREAMS = [
  { id: "MPC", title: "MPC", sub: "Maths · Physics · Chemistry", icon: "⚛️" },
  { id: "BiPC", title: "BiPC", sub: "Biology · Physics · Chemistry", icon: "🧬" },
  { id: "Commerce", title: "Commerce", sub: "Accounts · Economics · Business", icon: "📈" },
  { id: "Humanities", title: "Humanities", sub: "History · Civics · Sociology", icon: "🏛️" },
];

const STEPS = [
  { icon: GraduationCap, label: "Your Class" },
  { icon: BookOpen, label: "Your Stream" },
  { icon: Lightbulb, label: "Interests" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [studentClass, setStudentClass] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const totalSteps = studentClass === "10" ? 2 : 3;
  const currentStepNum = step === 3 ? totalSteps : step;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const toggleInterest = (label: string) => {
    setInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      if (!studentClass) return;
      setStep(studentClass === "10" ? 3 : 2);
    } else if (step === 2) {
      if (!stream) return;
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3 && studentClass === "10") setStep(1);
    else setStep(step - 1);
  };

  const { refreshProfile } = useAuth();

  const handleFinish = async () => {
    if (interests.length === 0) return;
    setLoading(true);
    const profileData = {
      studentClass,
      stream: studentClass === "10" ? "None" : stream,
      interests,
      profileCompleted: true,
    };
    localStorage.setItem("futureousProfile", JSON.stringify(profileData));
    try {
      if (userId) {
        // Run firebase updates asynchronously without blocking navigation
        Promise.all([
          setDoc(doc(db, "users", userId), profileData, { merge: true }),
          refreshProfile()
        ]).catch(console.error);
      }
    } catch (err: any) {
      console.error("Error saving profile to Firebase:", err);
    }
    
    router.push("/aptitude");
  };

  const progressPct = (currentStepNum / totalSteps) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background mesh-bg flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-white/5 h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="flex-1 container mx-auto px-4 py-10 flex flex-col items-center">
        {/* Step indicators */}
        <div className="flex items-center gap-3 mb-12">
          {STEPS.slice(0, totalSteps).map((s, i) => {
            const stepNum = i + 1;
            const isActive = currentStepNum === stepNum;
            const isDone = currentStepNum > stepNum;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isDone ? "bg-primary/20 text-primary border border-primary/30" :
                  isActive ? "glass border border-primary/40 text-foreground shadow-lg shadow-primary/10" :
                  "bg-white/5 text-muted-foreground border border-border"
                }`}>
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />}
                  {s.label}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-8 h-0.5 ${isDone ? "bg-primary/50" : "bg-border"} transition-colors`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 1 — Class */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Which class are you in?</h2>
                  <p className="text-muted-foreground">We'll tailor your assessment to your academic level.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["10", "11", "12"].map((cls) => (
                    <motion.button
                      key={cls}
                      onClick={() => setStudentClass(cls)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-8 rounded-2xl border-2 transition-all text-center ${
                        studentClass === cls
                          ? "border-primary bg-primary/15 shadow-lg shadow-primary/20 glow-primary"
                          : "border-border glass hover:border-primary/40"
                      }`}
                    >
                      <div className="text-4xl mb-3">🎓</div>
                      <div className={`text-2xl font-extrabold mb-1 ${studentClass === cls ? "text-primary" : ""}`}>Class {cls}</div>
                      {studentClass === cls && (
                        <div className="flex items-center justify-center gap-1 text-primary text-xs mt-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 — Stream */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary/30">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">What's your stream?</h2>
                  <p className="text-muted-foreground">This tailors your aptitude test to your subjects.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {STREAMS.map((s) => (
                    <motion.button
                      key={s.id}
                      onClick={() => setStream(s.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        stream === s.id
                          ? "border-secondary bg-secondary/15 shadow-lg shadow-secondary/20"
                          : "border-border glass hover:border-secondary/40"
                      }`}
                    >
                      <div className="text-3xl mb-3">{s.icon}</div>
                      <div className={`text-xl font-bold mb-1 ${stream === s.id ? "text-secondary" : ""}`}>{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.sub}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3 — Interests */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/80 to-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">What excites you?</h2>
                  <p className="text-muted-foreground">Select all domains that spark your curiosity. ({interests.length} selected)</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {INTEREST_OPTIONS.map(({ label, emoji }) => {
                    const selected = interests.includes(label);
                    return (
                      <motion.button
                        key={label}
                        onClick={() => toggleInterest(label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                          selected
                            ? "border-accent bg-accent/20 text-accent shadow-md shadow-accent/10"
                            : "border-border glass hover:border-accent/40 text-muted-foreground"
                        }`}
                      >
                        <span>{emoji}</span>
                        {label}
                        {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </motion.button>
                    );
                  })}
                </div>
                {interests.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 justify-center text-sm text-accent"
                  >
                    <Sparkles className="w-4 h-4" />
                    Great choices! We'll match these to real careers.
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center border-t border-border/40 pt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                step === 1 ? "opacity-0 pointer-events-none" : "glass border border-border hover:border-primary/40 text-foreground"
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={(step === 1 && !studentClass) || (step === 2 && !stream)}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-all disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Next <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={interests.length === 0 || loading}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-accent/80 to-primary text-white font-bold hover:opacity-90 transition-all disabled:opacity-40 shadow-lg shadow-accent/20"
              >
                {loading ? "Saving..." : "Start Aptitude Test"} <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
