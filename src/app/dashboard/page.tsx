"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthContext";
import { careersData } from "@/data/careers";
import {
  ClipboardList, Compass, MessageSquare, BarChart3,
  ArrowRight, Sparkles, Trophy, User, BookOpen, Clock, Heart, Zap, BrainCircuit, CheckCircle2
} from "lucide-react";

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#7C3AED] border-t-transparent animate-spin" />
          <p className="text-[#94A3B8] font-medium">Initializing Workspace…</p>
        </div>
      </div>
    );
  }

  const profileData = profile?.profileCompleted ? profile : (typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("futureousProfile") || "null")
    : null);

  const hasCompletedTest = profile?.aptitudeScores ? true : (typeof window !== "undefined" &&
    !!localStorage.getItem("futureousAptitudeResults"));

  const recentAnalysisScore = hasCompletedTest ? "88/100" : "--";
  const recentAnalysisMatch = hasCompletedTest ? profileData?.dreamCareer || "Engineering" : "--";

  const recommendedCareers = hasCompletedTest ? careersData.slice(0, 3) : [];
  
  const journeySteps = [
    { label: "Profile Created", done: true },
    { label: "Onboarding Completed", done: !!profileData },
    { label: "Aptitude Test Taken", done: hasCompletedTest },
    { label: "Premium Report Viewed", done: hasCompletedTest },
    { label: "Roadmap Explored", done: false },
    { label: "AI Counselor Session", done: false },
  ];
  const completionPercentage = Math.round((journeySteps.filter(s => s.done).length / journeySteps.length) * 100);

  const quickLinks = [
    { icon: ClipboardList, label: "Aptitude Test", href: "/aptitude", desc: "Start or retake assessment", color: "from-[#22D3EE] to-blue-500" },
    { icon: BarChart3, label: "Premium Report", href: "/personal-analysis/report", desc: "View your detailed analysis", color: "from-[#7C3AED] to-purple-500" },
    { icon: Compass, label: "Career Explorer", href: "/careers", desc: "Browse 50+ career paths", color: "from-[#10B981] to-emerald-500" },
    { icon: MessageSquare, label: "AI Counselor", href: "/counselor", desc: "24/7 expert guidance chat", color: "from-[#F59E0B] to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-[#050810] pb-24 font-sans text-white">
      {/* Header Widget */}
      <div className="bg-[#0B1020] border-b border-slate-800">
        <div className="container mx-auto px-4 py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#7C3AED]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] p-[2px] shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                <div className="w-full h-full rounded-[2rem] bg-[#0B1020] flex items-center justify-center overflow-hidden">
                  {profile?.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.photoURL} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#7C3AED] to-[#22D3EE]">
                      {(profile?.name?.[0] || user.displayName?.[0] || "U").toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[#94A3B8] font-medium mb-1">{greeting},</p>
                <h1 className="text-3xl md:text-4xl font-black">{profile?.name || user.displayName || "Student"}</h1>
                
                {profileData && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-[#111827] border border-slate-700 rounded-lg px-3 py-1 text-xs font-semibold text-[#94A3B8]">
                      Class {profileData.studentClass}
                    </span>
                    {profileData.stream !== "None" && (
                      <span className="bg-[#111827] border border-slate-700 rounded-lg px-3 py-1 text-xs font-semibold text-[#94A3B8]">
                        {profileData.stream}
                      </span>
                    )}
                    <span className={`rounded-lg px-3 py-1 text-xs font-bold border ${
                      hasCompletedTest ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20" : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                    }`}>
                      {hasCompletedTest ? "✓ Analysis Complete" : "⏳ Pending Analysis"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {hasCompletedTest && (
              <Link href="/personal-analysis/report" className="hidden md:flex items-center gap-3 bg-[#111827] border border-[#7C3AED]/30 rounded-2xl p-4 hover:bg-[#7C3AED]/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-bold mb-1">Latest Match</p>
                  <p className="font-bold text-white flex items-center gap-2">{recentAnalysisMatch} <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:translate-x-1 transition-transform" /></p>
                </div>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 space-y-8">
        
        {/* Quick Actions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={link.href} className="bg-[#111827] border border-slate-800 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-[#7C3AED]/50 transition-all group hover:-translate-y-1 block shadow-lg">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <link.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">{link.label}</div>
                  <div className="text-sm text-[#94A3B8]">{link.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recommendations */}
            {hasCompletedTest && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0B1020] rounded-[2rem] border border-slate-800 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h2 className="text-2xl font-bold flex items-center gap-3"><Zap className="text-[#22D3EE] w-6 h-6" /> Top Matches For You</h2>
                  <Link href="/careers" className="text-sm font-bold text-[#22D3EE] hover:underline">View All</Link>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                  {recommendedCareers.map((career) => (
                    <Link key={career.id} href={`/roadmap?career=${career.id}`} className="bg-[#111827] border border-slate-800 rounded-2xl p-5 hover:border-[#22D3EE]/40 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg group-hover:text-[#22D3EE] transition-colors">{career.title}</h3>
                        <div className="w-8 h-8 rounded-full bg-[#0B1020] flex items-center justify-center border border-slate-700">
                          <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#22D3EE] group-hover:-rotate-45 transition-all" />
                        </div>
                      </div>
                      <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2">{career.futureScope}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20 px-2 py-1 rounded-md">{career.demand} Demand</span>
                        <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-1 rounded-md">{career.salaryRange.split("-")[0]} Starting</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA if no profile */}
            {!profileData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-[#111827] to-[#0B1020] rounded-[2rem] border border-[#7C3AED]/30 p-10 text-center shadow-[0_0_40px_rgba(124,58,237,0.1)]">
                <Sparkles className="w-12 h-12 text-[#22D3EE] mx-auto mb-6" />
                <h2 className="text-3xl font-black mb-4">Complete Your Profile</h2>
                <p className="text-[#94A3B8] text-lg mb-8 max-w-lg mx-auto">Set up your class, stream, and interests to unlock your personalized AI career analysis and roadmaps.</p>
                <Link href="/onboarding" className="inline-flex items-center gap-2 px-10 py-4 font-bold text-white rounded-full bg-[#7C3AED] shadow-lg shadow-[#7C3AED]/30 hover:scale-105 transition-transform">
                  Start Setup <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Progress Widget */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-[#0B1020] rounded-[2rem] border border-slate-800 p-8 shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F59E0B]" /> Career Journey
              </h2>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">Completion</span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-[#111827] rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${completionPercentage}%` }} />
                </div>
              </div>

              <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-800">
                {journeySteps.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0B1020] ${item.done ? "bg-[#10B981]" : "bg-slate-700"}`}>
                      {item.done && <CheckCircle2 className="w-3 h-3 text-[#0B1020]" />}
                    </div>
                    <span className={`text-sm mt-0.5 ${item.done ? "text-white font-bold" : "text-[#94A3B8]"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Snapshot */}
            {profileData && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-[#111827] rounded-[2rem] border border-slate-800 p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Profile Summary</h2>
                  <Link href="/profile" className="text-sm font-bold text-[#7C3AED] hover:underline">Edit</Link>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#0B1020] border border-slate-800 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-black text-white">{profileData.studentClass}</div>
                    <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mt-1">Class</div>
                  </div>
                  <div className="bg-[#0B1020] border border-slate-800 rounded-2xl p-4 text-center">
                    <div className="text-xl font-black text-white truncate px-1">{profileData.stream}</div>
                    <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mt-1">Stream</div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Saved Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests?.map((interest: string) => (
                      <span key={interest} className="text-xs bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 px-3 py-1.5 rounded-lg font-medium">{interest}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
