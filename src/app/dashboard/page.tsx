"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthContext";
import {
  ClipboardList, Compass, MessageSquare, BarChart3,
  ArrowRight, Sparkles, Trophy, BookOpen, User
} from "lucide-react";

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const profileData = profile?.profileCompleted ? profile : (typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("futureousProfile") || "null")
    : null);

  const hasCompletedTest = profile?.aptitudeScores ? true : (typeof window !== "undefined" &&
    !!localStorage.getItem("futureousAptitudeResults"));

  const quickLinks = [
    { icon: ClipboardList, label: "Take Aptitude Test", href: "/aptitude", desc: "Start or retake the assessment", color: "from-primary to-blue-500" },
    { icon: BarChart3, label: "View Analysis", href: "/analysis", desc: "See your career profile", color: "from-secondary to-purple-500" },
    { icon: Compass, label: "Explore Roadmaps", href: "/careers", desc: "Browse all career paths", color: "from-accent to-cyan-500" },
    { icon: MessageSquare, label: "AI Counselor", href: "/counselor", desc: "Chat with your career guide", color: "from-primary to-secondary" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-24">
      {/* Header */}
      <div className="relative pt-12 pb-16 mesh-bg overflow-hidden">
        <div className="absolute -top-10 -right-10 w-[400px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/30">
                {profile?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.photoURL} alt="avatar" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  (profile?.name?.[0] || "U").toUpperCase()
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Welcome back 👋</p>
                <h1 className="text-2xl md:text-3xl font-bold">{profile?.name || user.displayName || "Student"}</h1>
              </div>
            </div>

            {profileData && (
              <div className="flex flex-wrap gap-3">
                <span className="glass border border-border rounded-full px-4 py-1.5 text-sm">
                  📚 Class {profileData.studentClass}
                </span>
                {profileData.stream !== "None" && (
                  <span className="glass border border-border rounded-full px-4 py-1.5 text-sm">
                    📖 {profileData.stream}
                  </span>
                )}
                <span className={`rounded-full px-4 py-1.5 text-sm font-medium border ${
                  hasCompletedTest ? "bg-green-400/10 text-green-400 border-green-400/20" : "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
                }`}>
                  {hasCompletedTest ? "✓ Test Completed" : "⏳ Test Pending"}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20 space-y-8">
        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={link.href}
                className="glass border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-all group hover:-translate-y-1 duration-200 block"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold mb-1">{link.label}</div>
                  <div className="text-xs text-muted-foreground">{link.desc}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-auto">
                  Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Status / Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" /> Your Journey Progress
          </h2>
          <div className="space-y-4">
            {[
              { label: "Profile Created", done: true },
              { label: "Onboarding Completed", done: !!profileData },
              { label: "Aptitude Test Taken", done: hasCompletedTest },
              { label: "Career Recommendations Viewed", done: hasCompletedTest },
              { label: "Roadmap Explored", done: false },
              { label: "AI Counselor Session", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-green-400" : "bg-border"}`}>
                  {item.done && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${item.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Journey Completion</span>
              <span className="text-sm font-bold text-primary">
                {Math.round(([true, !!profileData, hasCompletedTest, hasCompletedTest, false, false].filter(Boolean).length / 6) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(([true, !!profileData, hasCompletedTest, hasCompletedTest, false, false].filter(Boolean).length / 6) * 100)}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Profile snapshot */}
        {profileData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Your Profile
              </h2>
              <Link href="/profile" className="text-sm text-primary hover:underline">View & Edit</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{profileData.studentClass}</div>
                <div className="text-xs text-muted-foreground mt-1">Class</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{profileData.stream}</div>
                <div className="text-xs text-muted-foreground mt-1">Stream</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{profileData.interests?.length || 0}</div>
                <div className="text-xs text-muted-foreground mt-1">Interests</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.interests?.slice(0, 6).map((interest: string) => (
                <span key={interest} className="text-xs bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full">{interest}</span>
              ))}
              {profileData.interests?.length > 6 && (
                <span className="text-xs text-muted-foreground px-3 py-1">+{profileData.interests.length - 6} more</span>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA if no profile */}
        {!profileData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl border border-primary/20 p-8 text-center"
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Complete Your Profile</h2>
            <p className="text-muted-foreground mb-6">Set up your class, stream, and interests to unlock your personalized AI career analysis.</p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-3 font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
            >
              Start Setup <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
