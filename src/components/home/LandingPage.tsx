"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Target, Compass, Sparkles, BarChart3, Users, CheckCircle2, Star, ShieldCheck, Heart, TrendingUp, Zap, Clock } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo/futureousai-logo.png";

const features = [
  { icon: Brain, title: "Psychometric Testing", desc: "Scientific assessments measuring aptitude, personality, and interests.", color: "from-primary to-blue-400" },
  { icon: Target, title: "Data-Driven Matching", desc: "Map your unique cognitive profile to 50+ verified career domains.", color: "from-secondary to-purple-400" },
  { icon: BarChart3, title: "7-Page Premium Report", desc: "Identify core competencies, weaknesses, and a future growth plan.", color: "from-accent to-cyan-400" },
  { icon: Sparkles, title: "Generative AI Counselor", desc: "24/7 personalized chat guidance using Gemini AI technology.", color: "from-primary to-secondary" },
  { icon: Compass, title: "Strategic Roadmaps", desc: "Step-by-step guidance from Class 10/12 to your dream profession.", color: "from-secondary to-accent" },
  { icon: ShieldCheck, title: "Parent Confidence", desc: "Dedicated insights for parents to understand and support their child.", color: "from-accent to-primary" },
];

const stats = [
  { value: "98%", label: "Student Satisfaction" },
  { value: "50+", label: "Verified Career Paths" },
  { value: "24/7", label: "AI Counselor Access" },
  { value: "100%", label: "Data Privacy" },
];

const testimonials = [
  { quote: "FutureousAI completely changed my perspective. I was confused between engineering and design, and the psychometric test clearly showed my aptitude for UI/UX.", author: "Rohan M.", role: "Class 12 Student, Science" },
  { quote: "As a parent, the 7-page Premium Report gave me the exact insights I needed to support my daughter's unconventional career choice in Aviation.", author: "Priya S.", role: "Parent" },
  { quote: "The AI counselor answered all my questions about entrance exams for NDA. It's like having a mentor available at midnight!", author: "Aditya V.", role: "Class 11 Student, MPC" },
];

const categories = [
  { name: "Technology & Engineering", icon: "💻", count: "15+ Paths" },
  { name: "Medical & Healthcare", icon: "🏥", count: "8+ Paths" },
  { name: "Design & Arts", icon: "🎨", count: "10+ Paths" },
  { name: "Defence & Aviation", icon: "✈️", count: "6+ Paths" },
  { name: "Business & Commerce", icon: "📈", count: "12+ Paths" },
  { name: "Future & Emerging", icon: "🚀", count: "9+ Paths" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-sans">
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
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 border border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-white tracking-wide uppercase">Premium AI Career Guidance</span>
            </motion.div>

            {/* Hero Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <Image src={Logo} alt="FutureousAI Hero Logo" className="w-auto h-20 md:h-24 object-contain drop-shadow-[0_0_25px_rgba(124,58,237,0.4)]" priority />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              Stop Guessing. Start <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#7C3AED] to-[#F0ABFC]">Designing Your Future.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#94A3B8] mb-10 leading-relaxed max-w-3xl mx-auto">
              The most advanced psychometric and AI engine built specifically for Indian students. Discover your true potential, get a 7-page comprehensive report, and chat with an expert AI counselor.
            </p>

            {/* ── Discovery Paths ── */}
            <div className="mt-16 w-full text-left">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Career Discovery Path</h2>
                <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                  Whether you already have a dream career or are still exploring, Futureous AI has the right path for you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Option 1: Explore Careers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#111827]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-[#10B981]/50 transition-all group shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Compass className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Explore Careers</h3>
                  <p className="text-[#94A3B8] mb-6 flex-1 text-base leading-relaxed">
                    Browse hundreds of careers across technology, defence, medicine, arts, business, aviation, music, design, government services and emerging industries.
                  </p>
                  <div className="bg-[#0B1020] p-4 rounded-xl border border-slate-800 mb-6">
                    <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block mb-1">Perfect For</span>
                    <span className="text-sm text-white font-medium">Students who want to discover and learn about different careers.</span>
                  </div>
                  <Link href="/careers" className="w-full py-4 rounded-xl font-bold text-center bg-white/5 hover:bg-white/10 text-white border border-slate-700 transition-colors">
                    Explore Careers
                  </Link>
                </motion.div>

                {/* Option 2: Personal Career Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#111827]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-[#7C3AED]/50 transition-all group shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] to-[#F0ABFC]" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Personal Career Analysis</h3>
                  <p className="text-[#94A3B8] mb-6 flex-1 text-base leading-relaxed">
                    Already have a dream career in mind? Get a deep AI-powered analysis of your chosen career based on your interests, personality, aptitude, strengths, weaknesses and future growth potential.
                  </p>
                  <div className="bg-[#0B1020] p-4 rounded-xl border border-slate-800 mb-6">
                    <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider block mb-1">Perfect For</span>
                    <span className="text-sm text-white font-medium">Students who already know which career they want.</span>
                  </div>
                  <Link href="/personal-analysis/onboarding" className="w-full py-4 rounded-xl font-bold text-center bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                    Analyze My Career
                  </Link>
                </motion.div>

                {/* Option 3: Start Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#111827]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-[#22D3EE]/50 transition-all group shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#0284C7] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Start Analysis</h3>
                  <p className="text-[#94A3B8] mb-6 flex-1 text-base leading-relaxed">
                    Not sure what career is right for you? Take the complete Futureous AI assessment and receive personalized career recommendations based on your personality, interests, aptitude and future goals.
                  </p>
                  <div className="bg-[#0B1020] p-4 rounded-xl border border-slate-800 mb-6">
                    <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider block mb-1">Perfect For</span>
                    <span className="text-sm text-white font-medium">Students who are confused about their career path.</span>
                  </div>
                  <Link href="/onboarding" className="w-full py-4 rounded-xl font-bold text-center bg-gradient-to-r from-[#22D3EE] to-[#0284C7] text-white hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    Start Assessment
                  </Link>
                </motion.div>
              </div>

              {/* Comparison Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#050810]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto"
              >
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <span className="font-bold text-white mb-1">Explore Careers</span>
                  <span className="text-sm text-[#10B981] flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Learn about careers</span>
                </div>
                <div className="hidden md:block w-px h-10 bg-slate-800" />
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <span className="font-bold text-white mb-1">Personal Career Analysis</span>
                  <span className="text-sm text-[#7C3AED] flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Analyze a career you already chose</span>
                </div>
                <div className="hidden md:block w-px h-10 bg-slate-800" />
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <span className="font-bold text-white mb-1">Start Analysis</span>
                  <span className="text-sm text-[#22D3EE] flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Discover the best career for you</span>
                </div>
              </motion.div>
            </div>
            
            {/* Social proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-col items-center justify-center gap-3 text-sm text-[#94A3B8]"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="font-medium text-white">Trusted by 10,000+ Students & Parents across India</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-slate-800/50 bg-[#0B1020]/50 backdrop-blur-md relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-4"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">{s.value}</div>
                <div className="text-sm font-bold text-[#7C3AED] uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 relative overflow-hidden bg-[#050810]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#22D3EE]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The FutureousAI Advantage</h2>
            <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto">
              We go beyond simple quizzes. Our engine provides deep analytical insights and actionable roadmaps.
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
                className="bg-[#111827] rounded-3xl p-8 border border-slate-800 hover:border-[#7C3AED]/50 transition-all group hover:-translate-y-2 duration-300 shadow-xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.2)] group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{f.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Categories ── */}
      <section className="py-24 border-t border-slate-800/50 relative overflow-hidden bg-[#0B1020]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Explore Domains</h2>
              <p className="text-lg text-[#94A3B8] max-w-xl">
                Dive into detailed career profiles, understand eligibility, salaries, and the impact of AI on each field.
              </p>
            </div>
            <Link href="/careers" className="inline-flex items-center gap-2 text-[#22D3EE] font-bold hover:underline">
              View All 50+ Careers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#050810] border border-slate-800 p-6 rounded-3xl hover:bg-[#111827] transition-colors group cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{cat.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-[#7C3AED] font-semibold text-sm">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parent Benefits ── */}
      <section className="py-24 bg-gradient-to-b from-[#0B1020] to-[#050810] border-y border-slate-800/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Empowering Parents with <span className="text-[#10B981]">Clarity</span></h2>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                As a parent, you want the best for your child. Our dedicated Parent Confidence Report translates complex psychometric data into clear, actionable advice.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Identify Hidden Strengths", desc: "See beyond grades to understand their true cognitive abilities.", icon: Star, color: "text-[#F59E0B]" },
                  { title: "Understand Learning Styles", desc: "Discover exactly how your child learns best.", icon: Brain, color: "text-[#22D3EE]" },
                  { title: "Actionable Support Strategies", desc: "Get concrete steps on how to support their journey.", icon: Heart, color: "text-[#10B981]" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className={`mt-1 bg-white/5 p-2 rounded-xl shrink-0 border border-slate-800 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-[#94A3B8]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#10B981]/10 blur-[100px] rounded-full" />
              <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 relative z-10 shadow-2xl">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-6 mb-6">
                  <div className="w-12 h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center border border-[#10B981]/30">
                    <ShieldCheck className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Parent Confidence Score</h4>
                    <p className="text-sm text-[#10B981] font-semibold">High Match (88/100)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-800 rounded-full w-3/4" />
                  <div className="h-4 bg-slate-800 rounded-full w-full" />
                  <div className="h-4 bg-slate-800 rounded-full w-5/6" />
                  <div className="p-4 bg-[#0B1020] rounded-xl border border-slate-800 mt-6">
                    <p className="text-sm text-[#94A3B8] italic">"With consistent effort, the student has the potential to excel in this field."</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-[#050810]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Student Success Stories</h2>
            <p className="text-xl text-[#94A3B8]">Hear from those who found their path.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111827] border border-slate-800 p-8 rounded-3xl flex flex-col relative"
              >
                <div className="text-5xl text-[#7C3AED] opacity-20 absolute top-4 right-6 font-serif">"</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-lg text-white leading-relaxed mb-8 flex-1 italic relative z-10">"{t.quote}"</p>
                <div>
                  <h4 className="font-bold text-white">{t.author}</h4>
                  <p className="text-sm text-[#7C3AED] font-semibold">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden bg-[#0B1020]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#111827] to-[#1e293b] border border-slate-700 p-12 md:p-20 rounded-[3rem] shadow-2xl max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Ready to Shape Your Future?</h2>
            <p className="text-xl text-[#94A3B8] mb-10 max-w-2xl mx-auto">
              Stop wandering. Take the definitive AI aptitude test today and get your personalized roadmap to success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-white rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] shadow-xl hover:scale-105 transition-transform"
              >
                Create Free Account <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-slate-800 bg-[#050810]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="FutureousAI Logo" width={40} height={40} className="object-contain drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]" />
            <div className="font-bold text-white tracking-widest text-lg">FUTUREOUS<span className="text-[#22D3EE]">AI</span></div>
          </div>
          <p>© {new Date().getFullYear()} FutureousAI EdTech. Empowering Indian Students.</p>
          <div className="flex gap-6 font-medium">
            <Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
