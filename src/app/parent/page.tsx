"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import { Activity, BookOpen, Target, TrendingUp, Download } from "lucide-react";
import { getRecommendations } from "@/data/careers";

export default function ParentDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would fetch the linked student's data from Firestore
    const profileDataStr = localStorage.getItem("futureousProfile");
    const resultsDataStr = localStorage.getItem("futureousAptitudeResults");

    if (!profileDataStr || !resultsDataStr) {
      // Mocking data if none exists for the demo
      setProfile({ studentClass: "11", stream: "MPC", interests: ["Technology", "Robotics"] });
      setResults({ answers: { 1: 'A', 2: 'B', 3: 'C', 4: 'A', 5: 'B' }, timeTaken: {} });
      return;
    }

    const p = JSON.parse(profileDataStr);
    const r = JSON.parse(resultsDataStr);
    setProfile(p);
    setResults(r);
    setRecommendations(getRecommendations(p, r));
  }, []);

  if (!profile) return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;

  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Aptitude Growth',
        data: [65, 70, 75, 82, 85, 90],
        borderColor: 'rgba(30, 58, 138, 1)',
        backgroundColor: 'rgba(30, 58, 138, 0.2)',
        fill: true,
      }
    ]
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 pb-20">
      <div className="bg-primary text-primary-foreground py-10 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
            <p className="opacity-90">Monitoring Student Progress & Career Readiness</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
               <Download className="w-4 h-4" /> Export Report
             </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Overall Score", value: "85%", icon: Target, color: "text-blue-500" },
            { label: "Completed Tests", value: "3", icon: BookOpen, color: "text-purple-500" },
            { label: "Career Readiness", value: "High", icon: Activity, color: "text-green-500" },
            { label: "Growth Trend", value: "+12%", icon: TrendingUp, color: "text-cyan-500" }
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Aptitude Progress Over Time</h3>
            <div className="h-64">
              <Line 
                data={progressData} 
                options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } } }} 
              />
            </div>
          </div>

          {/* Insights & Improvement Plan */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Aptitude Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 text-green-800 rounded-lg border border-green-200">
                  <span className="font-medium">Strengths</span>
                  <span className="text-sm">Scientific Thinking, Logic</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
                  <span className="font-medium">Improvement Areas</span>
                  <span className="text-sm">Spatial Reasoning, Speed</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">90-Day Improvement Plan</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Practice spatial puzzles for 15 mins daily.</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Enroll in intermediate Python course.</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Take timed mock tests to improve speed.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Top Recommendations */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Suggested Career Paths</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.length > 0 ? recommendations.slice(0, 3).map((rec: any) => (
              <div key={rec.id} className="p-4 rounded-xl border border-border hover:border-primary transition-colors cursor-pointer" onClick={() => router.push(`/roadmap?career=${rec.id}`)}>
                <h4 className="font-bold text-lg mb-1">{rec.title}</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{rec.matchScore}% Match</span>
              </div>
            )) : (
               <div className="p-4 rounded-xl border border-border">
                <h4 className="font-bold text-lg mb-1">Software Engineer</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">92% Match</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
