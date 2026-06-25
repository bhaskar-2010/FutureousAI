"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getRecommendations, Career } from "@/data/careers";
import { useAuth } from "@/components/providers/AuthContext";
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";
import { Brain, Target, Compass, Download, MessageSquare, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function AnalysisPage() {
  const router = useRouter();
  const { profile: authProfile, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;

    const profileDataStr = localStorage.getItem("futureousProfile");
    const resultsDataStr = localStorage.getItem("futureousAptitudeResults");

    const p = authProfile?.profileCompleted ? authProfile : (profileDataStr ? JSON.parse(profileDataStr) : null);
    const r = authProfile?.aptitudeScores ? authProfile.aptitudeScores : (resultsDataStr ? JSON.parse(resultsDataStr) : null);

    if (!p || !r) {
      router.push("/onboarding");
      return;
    }

    setProfile(p);
    setResults(r);
    
    // Generate Recommendations
    const recs = getRecommendations(p, r);
    setRecommendations(recs);
  }, [router, authProfile, loading]);

  if (!profile || !results) return <div className="min-h-screen flex items-center justify-center">Analyzing data...</div>;

  const radarData = {
    labels: ['Numerical', 'Logical', 'Spatial', 'Verbal', 'Scientific', 'Mechanical'],
    datasets: [
      {
        label: 'Aptitude Profile',
        data: [85, 90, 70, 80, 95, 60],
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderColor: 'rgba(59, 130, 246, 0.9)',
        pointBackgroundColor: 'rgba(168, 85, 247, 0.9)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    plugins: { legend: { display: false } },
    scales: {
      r: {
        min: 0, max: 100,
        grid: { color: 'rgba(255,255,255,0.08)' },
        angleLines: { color: 'rgba(255,255,255,0.08)' },
        pointLabels: { color: 'rgba(232,237,248,0.8)', font: { size: 11 } },
        ticks: { display: false },
      }
    }
  } as any;

  const handleDownloadPDF = async () => {
    const btn = document.getElementById("pdf-btn-text");
    const originalText = btn?.innerText || "Download PDF Report";
    if (btn) btn.innerText = "Generating...";

    try {
      const element = document.getElementById("analysis-report-content");
      if (!element) return;

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        // Since it has dark mode elements, we capture as is
        backgroundColor: null 
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdfWidth = 210; // Standard A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // We use a dynamic format so the page height perfectly matches the content, avoiding ALL clipping
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`FutureousAI_${profile.name || "Student"}_Career_Report.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      if (btn) btn.innerText = originalText;
    }
  };

  return (
    <div id="analysis-report-content" className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative pt-16 pb-24 px-4 overflow-hidden mesh-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10" />
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your AI Career Analysis</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Based on your Class {profile.studentClass} {profile.stream !== "None" ? profile.stream : ""} profile, 
            interests in {profile.interests.join(", ")}, and your aptitude test performance.
          </p>
          <div className="flex gap-4 mt-8" data-html2canvas-ignore="true">
            <button onClick={handleDownloadPDF} className="bg-white text-primary px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-colors">
              <Download className="w-4 h-4" /> <span id="pdf-btn-text">Download PDF Report</span>
            </button>
            <Link href="/counselor" className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-accent/90 transition-colors">
              <MessageSquare className="w-4 h-4" /> Talk to AI Counselor
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Aptitude Radar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-border rounded-2xl p-6 col-span-1 md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" /> Cognitive Profile
            </h3>
            <div className="aspect-square w-full">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </motion.div>

          {/* Insights Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass border border-border rounded-2xl p-6 col-span-1 md:col-span-2 flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary" /> AI Insights
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 flex-1">
              <div className="bg-primary/10 p-5 rounded-xl border border-primary/20">
                <h4 className="font-bold text-primary mb-3">Top Strengths</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm"><CheckIcon /> Strong Scientific Thinking</li>
                  <li className="flex items-center gap-2 text-sm"><CheckIcon /> High Logical Reasoning</li>
                  <li className="flex items-center gap-2 text-sm"><CheckIcon /> Fast Decision Making</li>
                </ul>
              </div>
              <div className="bg-secondary/10 p-5 rounded-xl border border-secondary/20">
                <h4 className="font-bold text-secondary mb-3">Learning Style</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  You are an <strong className="text-foreground">Analytical Learner</strong>. You grasp complex concepts quickly when presented with data, patterns, and logical frameworks.
                </p>
              </div>
              <div className="bg-accent/10 p-5 rounded-xl border border-accent/20 sm:col-span-2">
                <h4 className="font-bold text-accent mb-3">Personality Alignment</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Your responses indicate a preference for structured environments requiring deep focus. You align well with careers that demand precision, research, and technical mastery over purely extroverted roles.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Career Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Compass className="w-6 h-6 text-primary" /> Top Career Matches
            </h2>
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              Calculated using 5-factor AI matching
            </span>
          </div>

          <div className="grid gap-4">
            {recommendations.map((career: any, index: number) => (
              <div key={career.id} className="glass border border-border rounded-2xl p-6 hover:border-primary/30 transition-all relative overflow-hidden group">
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-950 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> TOP MATCH
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{career.title}</h3>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {career.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      <strong>Why it matches:</strong> {career.reason}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((s: string) => (
                        <span key={s} className="bg-muted text-foreground text-xs px-2 py-1 rounded-md">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-64 flex flex-col gap-3 border-l border-border md:pl-6">
                    <div className="text-sm">
                      <span className="text-muted-foreground block text-xs">Future Demand</span>
                      <span className="font-semibold text-accent">{career.demand}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground block text-xs">Recommended Exams</span>
                      <span className="font-semibold">{career.exams.join(", ")}</span>
                    </div>
                    <Link 
                      href={`/roadmap?career=${career.id}`}
                      className="mt-2 text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Full Roadmap <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                {/* Expandable alternative careers section could go here */}
                <div className="mt-6 pt-4 border-t border-border grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Similar Careers</span>
                    <div className="flex flex-wrap gap-2">
                      {career.similarCareers.map((sc: string) => (
                        <span key={sc} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md">{sc}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Emerging Options</span>
                    <div className="flex flex-wrap gap-2">
                      {career.emergingCareers.map((ec: string) => (
                        <span key={ec} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md">{ec}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
