"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, TrendingUp, Compass, Zap, Brain } from "lucide-react";
import { careersData, Career } from "@/data/careers";

const CATEGORIES = ["All", "Technology", "Medical", "Design", "Music", "Aviation", "Defence", "Future Careers"];

const DEMAND_COLOR: Record<string, string> = {
  "Very High": "text-green-400 bg-green-400/10 border-green-400/20",
  "High": "text-primary bg-primary/10 border-primary/20",
  "Moderate": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Emerging": "text-accent bg-accent/10 border-accent/20",
};

const CATEGORY_EMOJI: Record<string, string> = {
  "Technology": "💻",
  "Medical": "🏥",
  "Design": "🎨",
  "Music": "🎵",
  "Aviation": "✈️",
  "Defence": "🪖",
  "Future Careers": "🚀",
};

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = careersData.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.futureScope.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  const trendingCareers = careersData.filter(c => c.demand === "Very High").slice(0, 3);
  const futureCareers = careersData.filter(c => c.category === "Future Careers" || c.demand === "Emerging").slice(0, 3);
  const underratedCareers = careersData.filter(c => c.demand === "Moderate").slice(0, 3);

  const renderCareerCard = (career: Career, i: number) => {
    const emoji = CATEGORY_EMOJI[career.category] || "💼";
    return (
      <motion.div
        key={career.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(i * 0.04, 0.5) }}
        className="glass rounded-2xl border border-border hover:border-primary/30 transition-all group p-6 flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
        
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="text-3xl bg-background border border-border w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">{emoji}</div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${DEMAND_COLOR[career.demand] || ""}`}>
            {career.demand} Demand
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-1 relative z-10">{career.title}</h3>
        <div className="text-xs text-primary font-medium mb-3 relative z-10">{career.category}</div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10 line-clamp-3 mb-4">
          {career.futureScope}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="glass border border-border rounded-lg p-2">
            <span className="block text-muted-foreground mb-0.5">Salary</span>
            <span className="font-semibold text-green-400">{career.salaryRange}</span>
          </div>
          <div className="glass border border-border rounded-lg p-2">
            <span className="block text-muted-foreground mb-0.5">Eligibility</span>
            <span className="font-semibold text-foreground truncate">{career.eligibility}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border/50 relative z-10">
          <div className="flex flex-wrap gap-1 mb-4">
            {career.streams.map(s => (
              <span key={s} className="text-xs bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded-md">{s}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground truncate flex-1 mr-2 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" /> AI Impact: {career.aiImpact.split(" ")[0]}
            </div>
            <Link
              href={`/roadmap?career=${career.id}`}
              className="flex items-center gap-1 text-xs font-bold text-white bg-primary hover:bg-primary-dark px-3 py-1.5 rounded-lg transition-all shrink-0"
            >
              View Roadmap <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-24 font-sans">
      {/* Hero */}
      <div className="relative pt-20 pb-16 text-center mesh-bg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 border border-primary/20 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-accent" /> Discover {careersData.length}+ Verified Career Paths
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Explore <span className="gradient-text">Your Future</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              From popular streams to emerging fields, find out exactly what it takes to succeed in the careers of tomorrow.
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search careers, skills, or future scopes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border glass-strong focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4">
        
        {/* Curated Sections only show if no search and All category */}
        {search === "" && category === "All" && (
          <div className="space-y-16 mb-16">
            {/* Trending Careers */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Trending & High Demand</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trendingCareers.map((c, i) => renderCareerCard(c, i))}
              </div>
            </section>

            {/* Future Careers */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold">High Potential Future Careers</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {futureCareers.map((c, i) => renderCareerCard(c, i))}
              </div>
            </section>

            {/* Underrated Careers */}
            {underratedCareers.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Compass className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold">Underrated & Emerging</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {underratedCareers.map((c, i) => renderCareerCard(c, i))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Category filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-secondary" /> All Careers Directory
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  category === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "glass border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* All Careers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((career, i) => renderCareerCard(career, i))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground glass border border-border rounded-3xl mt-8">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No careers found for "{search}"</p>
            <button onClick={() => {setSearch(""); setCategory("All");}} className="mt-4 text-primary hover:underline">Clear filters</button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-20 glass-strong rounded-3xl border border-primary/20 p-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Find YOUR perfect match</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto relative z-10 text-lg">
            Stop guessing. Take our AI-powered aptitude test to get personalized career recommendations ranked just for your unique profile.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-4 font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/30 hover:scale-105 transition-transform relative z-10"
          >
            Start Free AI Analysis <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
