"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Target, Compass, Sparkles, BarChart3, Users, CheckCircle2, Star } from "lucide-react";

const features = [
  { icon: Brain, title: "Aptitude Testing", desc: "Dynamic assessments tailored to your class and stream.", color: "from-primary to-blue-400" },
  { icon: Target, title: "Interest Discovery", desc: "Map your passions to real-world career domains.", color: "from-secondary to-purple-400" },
  { icon: BarChart3, title: "Strength Analysis", desc: "Identify your core competencies and areas to grow.", color: "from-accent to-cyan-400" },
  { icon: Sparkles, title: "AI Recommendations", desc: "Data-driven career matching with confidence scores.", color: "from-primary to-secondary" },
  { icon: Compass, title: "Detailed Roadmaps", desc: "Step-by-step guidance from school to your dream job.", color: "from-secondary to-accent" },
  { icon: Users, title: "Parent Dashboard", desc: "Track progress and explore career options together.", color: "from-accent to-primary" },
];

const steps = [
  { num: "01", title: "Create Profile", desc: "Tell us your class, stream, and interests in 3 easy steps." },
  { num: "02", title: "Aptitude Test", desc: "Complete our scientifically designed test tailored to you." },
  { num: "03", title: "AI Analysis", desc: "Our engine analyzes your unique multi-dimensional profile." },
  { num: "04", title: "Get Guidance", desc: "Receive ranked career roadmaps and AI counselling." },
];

const stats = [
  { value: "50+", label: "Career Paths" },
  { value: "135", label: "Aptitude Questions" },
  { value: "9", label: "Question Sets" },
  { value: "AI", label: "Powered Analysis" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden mesh-bg">
        {/* Ambient glows */}
        <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">AI-Powered Career Guidance for Indian Students</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Know Yourself Before{" "}
              <span className="gradient-text">Choosing Your Future</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Scientifically analyze your interests, aptitude, and personality to discover careers you'll truly excel at — built for Class 10, 11 &amp; 12 students.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
              <Link
                href="/personal-analysis/onboarding"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full overflow-hidden shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-shadow hover:scale-105 transition-transform bg-gradient-to-r from-accent to-primary"
              >
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5" /> Personal Career Analysis
                </span>
              </Link>
              <Link
                href="/onboarding"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full overflow-hidden shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary"
              >
                <span className="flex items-center gap-2">
                  Start Free Analysis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full border border-border glass hover:border-primary/40 transition-colors"
              >
                Explore Careers
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {["🧑", "👩", "🧑", "👦"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full glass border border-border flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <span>Trusted by students across India</span>
              <div className="flex items-center gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-border/50 bg-background-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Scientific Analysis Engine</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We go beyond generic suggestions. Our AI deeply analyzes multiple dimensions of your profile.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-8 border border-border hover:border-primary/30 transition-all group hover:-translate-y-1 duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-muted/10 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Four simple steps to discover your ideal career path.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12%] w-[76%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full glass border-2 border-primary/40 flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-primary/10 glow-primary">
                  <span className="gradient-text">{item.num}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-it-works" className="text-primary font-medium hover:underline text-sm">
              See the detailed 8-step walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need</h2>
          </div>
          <div className="glass rounded-2xl border border-border p-8 grid sm:grid-cols-2 gap-4">
            {[
              "Personalized aptitude test with 15 questions",
              "AI-powered career match with confidence scores",
              "Step-by-step roadmap for every career",
              "AI Counselor chat for real-time guidance",
              "Parent dashboard to track progress",
              "One-click PDF career report",
              "Similar & emerging career suggestions",
              "Supports all streams: MPC, BiPC, Commerce, Humanities",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to shape your future?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of students who have discovered their true potential with FutureousAI.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-2xl shadow-primary/30 hover:scale-105 transition-transform hover:shadow-primary/50"
            >
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-border/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-semibold gradient-text text-base">FutureousAI</div>
          <p>© {new Date().getFullYear()} FutureousAI. Designed for Indian Students.</p>
          <div className="flex gap-4">
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
