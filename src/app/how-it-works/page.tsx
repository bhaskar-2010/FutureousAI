"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap, BookOpen, Lightbulb, FlaskConical, Sparkles,
  Compass, Map, MessageSquare, ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: GraduationCap,
    step: "01",
    title: "Select Your Class",
    desc: "Tell us whether you're in Class 10, 11, or 12. This helps us load the right academic context for your assessment.",
    color: "from-primary to-blue-400",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Choose Your Stream",
    desc: "Pick from MPC, BiPC, Commerce, or Humanities. Your stream shapes the specific aptitude questions you'll receive.",
    color: "from-secondary to-purple-400",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Discover Interests",
    desc: "Select the domains that genuinely excite you — from Technology to Defence to Psychology. Be honest, not strategic.",
    color: "from-accent to-cyan-400",
  },
  {
    icon: FlaskConical,
    step: "04",
    title: "Take the Aptitude Test",
    desc: "Complete 15 carefully designed questions. The test measures numerical, logical, scientific, and verbal abilities with per-question timers.",
    color: "from-primary to-secondary",
  },
  {
    icon: Sparkles,
    step: "05",
    title: "Receive AI Analysis",
    desc: "Our engine analyzes your answers, time patterns, and profile across 5 dimensions: aptitude, interest, stream, personality, and class.",
    color: "from-secondary to-accent",
  },
  {
    icon: Compass,
    step: "06",
    title: "Explore Career Matches",
    desc: "Get your top career recommendations ranked by a weighted match score. Each recommendation shows why it's perfect for you.",
    color: "from-accent to-primary",
  },
  {
    icon: Map,
    step: "07",
    title: "Generate Your Roadmap",
    desc: "Each career comes with a step-by-step roadmap: from Class 10 basics to entrance exams, degrees, and job placements.",
    color: "from-primary to-blue-500",
  },
  {
    icon: MessageSquare,
    step: "08",
    title: "Talk to AI Counselor",
    desc: "Chat with our Gemini-powered AI counselor. Ask about specific exams, colleges, salaries, or day-to-day life in any career.",
    color: "from-secondary to-purple-500",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-24">
      {/* Hero */}
      <div className="relative pt-20 pb-16 text-center overflow-hidden mesh-bg">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 border border-primary/20 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" /> 8 Steps to Your Perfect Career
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              How <span className="gradient-text">FutureousAI</span> Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our scientific process goes beyond generic career tests to give you deeply personalized guidance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-4 max-w-4xl mt-8">
        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl border border-border hover:border-primary/25 transition-all p-6 md:p-8 flex gap-6 items-start group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Step {step.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 glass rounded-2xl border border-border p-10"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8">The full analysis takes about 20 minutes and is completely free.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
          >
            Start Free Analysis <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
