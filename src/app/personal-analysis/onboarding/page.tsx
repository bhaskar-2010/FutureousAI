"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Target, Sparkles, User, BookOpen, Brain, Briefcase } from "lucide-react";

const CAREER_SUGGESTIONS = [
  "Indian Army Officer",
  "Navy Officer",
  "Air Force Officer",
  "Software Engineer",
  "Doctor",
  "Commercial Pilot",
  "Architect",
  "Lawyer",
  "Teacher",
  "Artist",
  "Musician",
  "Entrepreneur",
  "Scientist",
  "Data Scientist",
  "Investment Banker"
];

export default function PersonalAnalysisOnboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    stream: "",
    dreamCareer: "",
    customCareer: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const finalCareer = formData.dreamCareer === "Other" ? formData.customCareer : formData.dreamCareer;
    
    if (!formData.name || !formData.studentClass || !formData.stream || !finalCareer) {
      alert("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    const profileData = {
      name: formData.name,
      studentClass: formData.studentClass,
      stream: formData.stream,
      dreamCareer: finalCareer
    };

    localStorage.setItem("futureousPersonalAnalysisProfile", JSON.stringify(profileData));
    
    // Simulate slight loading for premium feel
    setTimeout(() => {
      router.push("/personal-analysis/interview");
    }, 800);
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="glass border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary shadow-lg shadow-accent/20 mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Personal Career Analysis</h1>
            <p className="text-muted-foreground text-lg">Let's build a profile tailored precisely to your ambitions.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User className="w-4 h-4 text-muted-foreground" /> Full Name
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g., Rahul Sharma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BookOpen className="w-4 h-4 text-muted-foreground" /> Class
                </label>
                <select 
                  required
                  value={formData.studentClass}
                  onChange={e => setFormData({ ...formData, studentClass: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none appearance-none"
                >
                  <option value="" disabled>Select Class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="Graduate">College/Graduate</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Brain className="w-4 h-4 text-muted-foreground" /> Stream
                </label>
                <select 
                  required
                  value={formData.stream}
                  onChange={e => setFormData({ ...formData, stream: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none appearance-none"
                >
                  <option value="" disabled>Select Stream</option>
                  <option value="MPC">PCM (Science)</option>
                  <option value="BiPC">PCB (Science)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities/Arts</option>
                  <option value="Not Decided">Not Decided Yet</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Briefcase className="w-4 h-4 text-muted-foreground" /> Dream Career
              </label>
              <select 
                required
                value={formData.dreamCareer}
                onChange={e => setFormData({ ...formData, dreamCareer: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none appearance-none"
              >
                <option value="" disabled>Select your Dream Career</option>
                {CAREER_SUGGESTIONS.map(career => (
                  <option key={career} value={career}>{career}</option>
                ))}
                <option value="Other">Other (Custom Career)</option>
              </select>
            </div>

            {formData.dreamCareer === "Other" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="w-4 h-4 text-accent" /> Specify Custom Career
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Space Architect, Sports Manager"
                  value={formData.customCareer}
                  onChange={e => setFormData({ ...formData, customCareer: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
                />
              </motion.div>
            )}

            <div className="pt-6">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative flex items-center justify-center gap-2 px-8 py-4 font-bold text-white rounded-full overflow-hidden shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-[1.02] bg-gradient-to-r from-accent to-primary disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Brain className="w-5 h-5" />
                    </motion.div>
                    Initializing Intelligence Engine...
                  </span>
                ) : (
                  <>
                    Begin Personal Analysis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </motion.div>
    </div>
  );
}
