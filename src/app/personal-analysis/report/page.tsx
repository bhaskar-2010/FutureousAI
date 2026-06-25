"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Download, Brain, Target, Star, TrendingUp, Compass, ChevronRight, CheckCircle2, AlertTriangle, Users, BookOpen, User, Book, Zap, Lightbulb
} from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function PremiumReportPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    const profileDataStr = localStorage.getItem("futureousPersonalAnalysisProfile");
    const interviewDataStr = localStorage.getItem("futureousPersonalAnalysisInterview");
    const aptitudeDataStr = localStorage.getItem("futureousAptitudeResults");

    if (!profileDataStr || !interviewDataStr) {
      router.push("/personal-analysis/onboarding");
      return;
    }

    const p = JSON.parse(profileDataStr);
    const i = JSON.parse(interviewDataStr);
    const a = aptitudeDataStr ? JSON.parse(aptitudeDataStr) : null;

    setProfile(p);
    generateReport(p, i, a);
  }, [router]);

  const generateReport = async (p: any, i: any, a: any) => {
    try {
      const res = await fetch("/api/personal-analysis/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: p, interview: i, aptitude: a }),
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      } else {
        throw new Error("Invalid report data");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate comprehensive report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    
    try {
      const pages = [
        document.getElementById('pdf-page-1'),
        document.getElementById('pdf-page-2'),
        document.getElementById('pdf-page-3'),
        document.getElementById('pdf-page-4'),
        document.getElementById('pdf-page-5'),
        document.getElementById('pdf-page-6'),
        document.getElementById('pdf-page-7')
      ].filter(Boolean);

      if (pages.length === 0) return;

      const pdfWidth = 210; // Standard A4 width in mm
      let pdf: jsPDF | null = null;

      for (let i = 0; i < pages.length; i++) {
        const pageElement = pages[i];
        if (!pageElement) continue;

        const originalBorderRadius = pageElement.style.borderRadius;
        const originalBorder = pageElement.style.border;

        pageElement.style.borderRadius = '0';
        pageElement.style.border = 'none';

        const canvas = await html2canvas(pageElement, { 
          scale: 2, 
          useCORS: true,
          backgroundColor: '#0B1020',
          windowWidth: 1000
        });
        
        pageElement.style.borderRadius = originalBorderRadius;
        pageElement.style.border = originalBorder;

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (i === 0) {
          pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [pdfWidth, pdfHeight]
          });
        } else {
          pdf!.addPage([pdfWidth, pdfHeight], "portrait");
        }
        
        pdf!.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf!.save(`FutureousAI_${profile.name}_Premium_Report.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGeneratingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1020] text-white flex flex-col items-center justify-center p-4">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="mb-6">
          <Brain className="w-16 h-16 text-[#7C3AED]" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2 text-[#FFFFFF]">Compiling Premium Report</h2>
        <p className="text-[#94A3B8] text-center max-w-md">
          Generating highly detailed analytics, professional evaluations, and formatting the final document...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex flex-col items-center justify-center p-4 text-white">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">{error}</h2>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#7C3AED] text-white rounded-full mt-4 hover:bg-[#6D28D9] transition">
          Retry
        </button>
      </div>
    );
  }

  const chartData = {
    labels: ['Leadership', 'Communication', 'Creativity', 'Discipline', 'Problem Solving', 'Aptitude'],
    datasets: [
      {
        label: 'Skill Matrix',
        data: [
          report.scores?.leadership || 80, 
          report.scores?.communication || 80, 
          report.scores?.creativity || 80, 
          report.scores?.discipline || 80, 
          report.scores?.problemSolving || 80, 
          report.scores?.aptitude || 80
        ],
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        borderColor: '#22D3EE',
        borderWidth: 2,
        pointBackgroundColor: '#22D3EE',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#94A3B8', font: { size: 14, family: "'Inter', sans-serif" } },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  const PageContainer = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <div id={id} className="w-[1000px] mx-auto min-h-[1414px] bg-[#0B1020] text-white flex flex-col mb-12 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl shrink-0" style={{ pageBreakInside: 'avoid' }}>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]" />
      <div className="flex-1 p-12 flex flex-col">
        {children}
      </div>
      <div className="px-12 py-6 border-t border-slate-800 flex justify-between items-center text-[#94A3B8] text-sm mt-auto">
        <div className="flex items-center gap-2"><Star className="w-4 h-4 text-[#7C3AED]" /> FutureousAI Assessment Report</div>
        <div>{profile.name} • {profile.dreamCareer}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050810] pb-24 font-sans text-white">
      {/* Sticky Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0B1020]/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-[1000px]">
          <div className="font-bold text-xl flex items-center gap-2 text-white">
            <Target className="text-[#22D3EE]" /> Premium Analysis Complete
          </div>
          <button 
            onClick={handleDownloadPDF}
            disabled={generatingPDF}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#7C3AED] text-white font-bold hover:bg-[#6D28D9] transition-all text-sm disabled:opacity-70 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
          >
            {generatingPDF ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Brain className="w-4 h-4" /></motion.div> Generating PDF...</>
            ) : (
              <><Download className="w-4 h-4" /> Download Complete Report</>
            )}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12 flex flex-col items-center">
        
        {/* PAGE 1: COVER PAGE */}
        <PageContainer id="pdf-page-1">
          <div className="flex-1 flex flex-col justify-center items-center text-center relative h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="w-24 h-24 rounded-3xl bg-[#111827] border border-slate-800 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.2)] mb-12 relative z-10">
              <Brain className="w-12 h-12 text-[#22D3EE]" />
            </div>
            
            <h3 className="text-[#22D3EE] font-bold tracking-[0.3em] uppercase text-sm mb-6 relative z-10">Confidential Assessment Report</h3>
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight relative z-10 px-8">
              {profile.dreamCareer}
            </h1>
            
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 max-w-2xl w-full mx-auto relative z-10 shadow-2xl mt-16">
              <div className="grid grid-cols-2 gap-8 text-left">
                <div>
                  <p className="text-[#94A3B8] text-sm uppercase tracking-wider mb-1">Student Profile</p>
                  <p className="text-2xl font-bold text-white">{profile.name}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm uppercase tracking-wider mb-1">Academic Level</p>
                  <p className="text-2xl font-bold text-white">Class {profile.studentClass}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm uppercase tracking-wider mb-1">Stream</p>
                  <p className="text-2xl font-bold text-white">{profile.stream}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm uppercase tracking-wider mb-1">Assessment Date</p>
                  <p className="text-2xl font-bold text-white">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-32 max-w-xl mx-auto italic text-[#94A3B8] leading-relaxed relative z-10">
              "{report.motivationalInsights}"
            </div>
          </div>
        </PageContainer>

        {/* PAGE 2: EXECUTIVE SUMMARY & VISUAL ANALYTICS */}
        <PageContainer id="pdf-page-2">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <Target className="text-[#7C3AED]" /> Executive Summary
          </h2>
          
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="col-span-2 bg-[#111827] p-8 rounded-3xl border border-slate-800">
              <p className="text-xl text-[#94A3B8] leading-relaxed mb-6">
                {report.executiveSummary.shortSummary}
              </p>
              <div className="p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30">
                <p className="text-[#7C3AED] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> {report.executiveSummary.overallRecommendation}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/10 p-8 rounded-3xl border border-[#7C3AED]/30 flex flex-col items-center justify-center text-center">
              <p className="text-[#94A3B8] font-bold uppercase tracking-widest text-sm mb-2">Career Fit Score</p>
              <div className="text-7xl font-black text-white mb-4">{report.scores.finalFit || report.scores.careerCompatibility}</div>
              <div className="px-4 py-1.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold text-sm border border-[#10B981]/30">
                {report.classification}
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <TrendingUp className="text-[#22D3EE]" /> Visual Analytics
          </h2>

          <div className="grid grid-cols-2 gap-8 flex-1">
            <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 flex items-center justify-center">
              <div className="w-full max-w-[350px] aspect-square">
                <Radar data={chartData} options={chartOptions as any} />
              </div>
            </div>
            
            <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 flex flex-col justify-center space-y-6">
              {[
                { label: "Interest Alignment", score: report.scores.interest, color: "bg-[#7C3AED]" },
                { label: "Personality Compatibility", score: report.scores.personality, color: "bg-[#22D3EE]" },
                { label: "Aptitude Readiness", score: report.scores.aptitude, color: "bg-[#10B981]" },
                { label: "Career Commitment", score: report.scores.commitment, color: "bg-[#F59E0B]" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold text-white mb-3">
                    <span>{item.label}</span>
                    <span className="text-[#94A3B8]">{item.score}/100</span>
                  </div>
                  <div className="w-full bg-[#0B1020] rounded-full h-3 overflow-hidden border border-slate-800">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>

        {/* PAGE 3: DETAILED SKILL & LEARNING BREAKDOWN */}
        <PageContainer id="pdf-page-3">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <User className="text-[#7C3AED]" /> Personality & Learning Style
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800">
              <h3 className="text-[#94A3B8] text-sm uppercase font-bold tracking-wider mb-2">Personality Archetype</h3>
              <p className="text-2xl font-bold text-[#22D3EE] mb-4">{report.personalityInsights.archetype}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {report.personalityInsights.traits.map((t: string, i: number) => (
                  <span key={i} className="text-xs bg-white/5 border border-slate-700 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <p className="text-[#94A3B8] leading-relaxed text-sm">
                <span className="text-white font-medium">Workplace Behavior: </span>
                {report.personalityInsights.workplaceBehavior}
              </p>
            </div>

            <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800">
              <h3 className="text-[#94A3B8] text-sm uppercase font-bold tracking-wider mb-2">Primary Learning Style</h3>
              <p className="text-2xl font-bold text-[#10B981] mb-4">{report.learningStyle.primaryStyle}</p>
              <p className="text-[#94A3B8] leading-relaxed text-sm mb-4">{report.learningStyle.description}</p>
              <h4 className="text-white font-semibold text-sm mb-2">Best Study Methods:</h4>
              <ul className="space-y-1">
                {report.learningStyle.bestStudyMethods.map((m: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-[#94A3B8] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <Brain className="text-[#22D3EE]" /> Subject Performance Analysis
          </h2>
          
          <div className="grid grid-cols-3 gap-6 mb-12">
             {report.subjectPerformance?.map((sub: any, i: number) => (
                <div key={i} className="bg-[#111827] p-6 rounded-3xl border border-slate-800 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#0B1020] border-2 border-slate-700 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#22D3EE]">{sub.score}</span>
                  </div>
                  <h4 className="font-bold text-white mb-2">{sub.subject}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{sub.analysis}</p>
                </div>
             ))}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <Book className="text-[#7C3AED]" /> Skill Evaluation
          </h2>
          <div className="bg-[#111827] rounded-3xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1020] text-[#94A3B8] text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold w-1/4 border-b border-slate-800">Skill Domain</th>
                  <th className="p-4 font-semibold border-b border-slate-800">Score</th>
                  <th className="p-4 font-semibold border-b border-slate-800">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {report.detailedSkills.map((skill: any, i: number) => (
                  <tr key={i}>
                    <td className="p-4 font-bold text-white text-sm">{skill.skill}</td>
                    <td className="p-4 font-black text-[#7C3AED]">{skill.score}</td>
                    <td className="p-4 text-[#94A3B8] text-sm">{skill.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageContainer>

        {/* PAGE 4: STRENGTHS & WEAKNESSES */}
        <PageContainer id="pdf-page-4">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <CheckCircle2 className="text-[#10B981]" /> Core Strengths
          </h2>
          
          <div className="grid grid-cols-2 gap-6 mb-12">
            {report.strengthsAnalysis.map((s: any, i: number) => (
              <div key={i} className="bg-[#111827] p-8 rounded-3xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed mb-6 min-h-[60px]">{s.description}</p>
                <div className="bg-[#0B1020] p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-1">Career Impact</p>
                  <p className="text-[#10B981] font-medium text-sm">{s.careerImpact}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <AlertTriangle className="text-[#F59E0B]" /> Weaknesses & Mitigation
          </h2>
          
          <div className="grid grid-cols-2 gap-6 flex-1">
            {report.weaknessAnalysis?.map((w: any, i: number) => (
              <div key={i} className="bg-[#111827] p-8 rounded-3xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-4">{w.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed mb-6 min-h-[60px]">{w.description}</p>
                <div className="bg-[#0B1020] p-4 rounded-xl border border-slate-800 border-l-4 border-l-[#F59E0B]">
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wider mb-1">Mitigation Strategy</p>
                  <p className="text-white font-medium text-sm">{w.mitigationStrategy}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>

        {/* PAGE 5: CAREER ROADMAP & ALTERNATIVES */}
        <PageContainer id="pdf-page-5">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <Compass className="text-[#7C3AED]" /> Strategic Career Roadmap
          </h2>

          <div className="flex flex-col gap-6 mb-16">
            {[
              { title: "Immediate Focus (0 - 3 Months)", items: report.roadmap.shortTerm, color: "border-[#22D3EE]", bg: "bg-[#22D3EE]/10", icon: "text-[#22D3EE]" },
              { title: "Mid-Term Execution (3 - 12 Months)", items: report.roadmap.mediumTerm, color: "border-[#7C3AED]", bg: "bg-[#7C3AED]/10", icon: "text-[#7C3AED]" },
              { title: "Long-Term Trajectory (1+ Years)", items: report.roadmap.longTerm, color: "border-[#10B981]", bg: "bg-[#10B981]/10", icon: "text-[#10B981]" }
            ].map((phase, i) => (
              <div key={i} className={`bg-[#111827] border-l-4 ${phase.color} rounded-r-3xl p-6 shadow-md`}>
                <h3 className="text-lg font-bold text-white mb-4">{phase.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {phase.items.map((item: string, j: number) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${phase.bg} ${phase.icon}`}>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Star className="text-[#F59E0B]" /> Recommended Paths
              </h2>
              <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl space-y-6">
                <div>
                  <h4 className="text-[#94A3B8] text-xs uppercase font-bold tracking-wider mb-3">Top Matches</h4>
                  <ul className="space-y-2">
                    {report.recommendedCareers.topMatching.map((c: string, i: number) => (
                      <li key={i} className="text-white font-semibold bg-[#0B1020] p-3 rounded-xl border border-slate-800">{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#94A3B8] text-xs uppercase font-bold tracking-wider mb-3">Strong Alternatives</h4>
                  <ul className="space-y-2">
                    {report.recommendedCareers.alternative.map((c: string, i: number) => (
                      <li key={i} className="text-white text-sm bg-[#0B1020] p-3 rounded-xl border border-slate-800">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Lightbulb className="text-[#22D3EE]" /> Future Growth Plan
              </h2>
              <div className="bg-[#111827] border border-slate-800 p-6 rounded-3xl h-full">
                <ul className="space-y-4">
                  {report.futureGrowthPlan?.map((plan: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#22D3EE] mt-2 shrink-0" />
                      <p className="text-[#94A3B8] leading-relaxed">{plan}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </PageContainer>

        {/* PAGE 6: PARENT SUPPORT REPORT */}
        <PageContainer id="pdf-page-6">
          <div className="bg-[#7C3AED]/10 p-10 rounded-3xl border border-[#7C3AED]/30 mb-12 flex items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[#111827] flex items-center justify-center shrink-0 border border-slate-800">
              <Users className="w-10 h-10 text-[#7C3AED]" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Parent Support Report</h2>
              <p className="text-[#94A3B8] text-lg">Confidential Guidance for the Parents of {profile.name}</p>
            </div>
            <div className="ml-auto text-center">
              <div className="text-5xl font-black text-[#22D3EE] mb-1">{report.parentConfidence.confidenceScore}</div>
              <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-bold">Confidence Score</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 flex-1">
            <div className="space-y-8">
              <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 h-full">
                <h4 className="text-xl font-bold text-[#10B981] mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Child's Core Strengths</h4>
                <p className="text-[#94A3B8] leading-relaxed">{report.parentConfidence.childStrengthAnalysis}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 h-full">
                <h4 className="text-xl font-bold text-[#7C3AED] mb-4 flex items-center gap-2"><Brain className="w-5 h-5"/> Observed Potential & Fit</h4>
                <p className="text-[#94A3B8] leading-relaxed">{report.parentConfidence.observedPotential}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 h-full">
                <h4 className="text-xl font-bold text-[#F59E0B] mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Improvement Opportunities</h4>
                <p className="text-[#94A3B8] leading-relaxed">{report.parentConfidence.improvementOpportunities}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 h-full">
                <h4 className="text-xl font-bold text-[#22D3EE] mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5"/> How Parents Can Support</h4>
                <p className="text-white font-medium mb-3">{report.parentConfidence.howToSupport}</p>
                <p className="text-[#94A3B8] leading-relaxed">{report.parentConfidence.guidanceForParents}</p>
              </div>
            </div>
            
            <div className="col-span-2 bg-gradient-to-r from-[#111827] to-[#0B1020] p-8 rounded-3xl border border-slate-800 mt-4">
              <h4 className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Professional Summary</h4>
              <p className="text-white text-xl leading-relaxed italic border-l-4 border-[#7C3AED] pl-6">"{report.parentConfidence.professionalSummary}"</p>
            </div>
          </div>
        </PageContainer>

        {/* PAGE 7: FINAL VERDICT */}
        <PageContainer id="pdf-page-7">
          <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#22D3EE]/5 blur-[150px] rounded-full pointer-events-none" />
            
            <Target className="w-20 h-20 text-[#7C3AED] mb-8 relative z-10" />
            <h2 className="text-5xl font-black text-white mb-12 relative z-10">Final Verdict & Recommendation</h2>
            
            <div className="bg-[#111827] p-12 rounded-[3rem] border border-slate-800 shadow-2xl relative z-10 w-full">
              <p className="text-2xl text-[#94A3B8] leading-relaxed italic mb-12">
                "{report.finalVerdict}"
              </p>
              
              <div className="flex items-center justify-center gap-8 border-t border-slate-800 pt-12">
                <div className="text-left">
                  <p className="text-sm text-[#94A3B8] uppercase tracking-wider mb-1">Assessed By</p>
                  <p className="text-xl font-bold text-white flex items-center gap-2"><Brain className="w-5 h-5 text-[#7C3AED]"/> FutureousAI Intelligence Engine</p>
                </div>
                <div className="w-px h-16 bg-slate-800" />
                <div className="text-left">
                  <p className="text-sm text-[#94A3B8] uppercase tracking-wider mb-1">Final Suitability</p>
                  <p className="text-xl font-bold text-[#10B981]">{report.classification}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto text-center pt-12">
            <p className="text-[#94A3B8] text-sm">
              This report was generated autonomously by FutureousAI based on comprehensive psychometric evaluation and aptitude scoring.
              <br/>© {new Date().getFullYear()} FutureousAI EdTech. All Rights Reserved.
            </p>
          </div>
        </PageContainer>

      </div>
    </div>
  );
}
