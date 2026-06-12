"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getRoadmap, Roadmap } from "@/data/roadmaps";
import { Map, GraduationCap, Briefcase, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function RoadmapContent() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get("career");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    if (careerId) {
      setRoadmap(getRoadmap(careerId));
    } else {
      setRoadmap(getRoadmap("generic"));
    }
  }, [careerId]);

  if (!roadmap) return <div className="min-h-screen flex items-center justify-center">Loading Roadmap...</div>;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-20 mesh-bg">
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">{roadmap.careerName} Roadmap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your step-by-step journey from school to starting your professional career.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-20">
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-primary/50 before:via-secondary/50 before:to-transparent">
          {roadmap.steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-gradient-to-br from-primary to-secondary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg shadow-primary/30 z-10 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-strong border border-border p-8 rounded-3xl shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-accent text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 border border-accent/20">{step.stage}</span>
                    <span className="text-muted-foreground/30 font-extrabold text-4xl">0{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-2xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Roadmap Engine...</div>}>
      <RoadmapContent />
    </Suspense>
  );
}
