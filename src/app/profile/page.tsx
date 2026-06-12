"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthContext";
import { User, Mail, BookOpen, Tag, BarChart3, ArrowRight, Edit3, GraduationCap } from "lucide-react";

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (typeof window !== "undefined") {
      const pd = localStorage.getItem("futureousProfile");
      const rd = localStorage.getItem("futureousAptitudeResults");
      if (pd) setProfileData(JSON.parse(pd));
      if (rd) setResults(JSON.parse(rd));
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const totalAnswers = results ? Object.keys(results.answers || {}).length : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-24">
      {/* Header */}
      <div className="relative pt-16 pb-20 mesh-bg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30 text-3xl font-bold text-white overflow-hidden">
              {profile?.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoURL} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                (profile?.name?.[0] || "U").toUpperCase()
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile?.name || user.displayName || "Student"}</h1>
            <p className="text-muted-foreground">{profile?.email || user.email}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl -mt-10 relative z-20 space-y-6">
        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-border p-6"
        >
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Full Name</div>
                <div className="font-medium">{profile?.name || user.displayName || "Not set"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Email Address</div>
                <div className="font-medium">{profile?.email || user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Account Type</div>
                <div className="font-medium capitalize">{profile?.accountType || "Student"}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Academic Profile */}
        {profileData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" /> Academic Profile
              </h2>
              <Link href="/onboarding" className="flex items-center gap-1 text-xs text-primary hover:underline">
                <Edit3 className="w-3 h-3" /> Retake Onboarding
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold gradient-text">Class {profileData.studentClass}</div>
                <div className="text-xs text-muted-foreground mt-1">Class</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold gradient-text">{profileData.stream}</div>
                <div className="text-xs text-muted-foreground mt-1">Stream</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold gradient-text">{profileData.interests?.length || 0}</div>
                <div className="text-xs text-muted-foreground mt-1">Interests</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Selected Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.interests?.map((interest: string) => (
                  <span key={interest} className="text-xs bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 rounded-full">{interest}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl border border-border p-8 text-center"
          >
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't completed your academic profile yet.</p>
            <Link href="/onboarding" className="inline-flex items-center gap-2 px-6 py-2.5 font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary text-sm">
              Complete Onboarding <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Test Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" /> Aptitude Results
            </h2>
            {results && (
              <Link href="/analysis" className="text-xs text-primary hover:underline">View Full Analysis</Link>
            )}
          </div>
          {results ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold gradient-text">{totalAnswers}</div>
                <div className="text-xs text-muted-foreground mt-1">Questions Answered</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-green-400">Completed</div>
                <div className="text-xs text-muted-foreground mt-1">Test Status</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm mb-4">No test results yet. Take the aptitude test to get started.</p>
              <Link href="/aptitude" className="inline-flex items-center gap-2 px-6 py-2.5 font-bold text-white rounded-full bg-gradient-to-r from-accent/80 to-primary text-sm">
                Take Test <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
