"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

type CareerEntry = {
  id: string;
  title: string;
  category: string;
  streams: string[];
  demand: string;
  description: string;
  exams: string[];
  emoji: string;
};

const ALL_CAREERS: CareerEntry[] = [
  { id: "software-engineer", emoji: "💻", title: "Software Engineer", category: "Technology", streams: ["MPC"], demand: "Very High", description: "Design and build software systems, applications, and platforms that power the digital world.", exams: ["JEE Main", "JEE Advanced", "BITSAT"] },
  { id: "ai-engineer", emoji: "🤖", title: "AI / ML Engineer", category: "Technology", streams: ["MPC"], demand: "Very High", description: "Build intelligent systems using machine learning, neural networks, and large language models.", exams: ["JEE Advanced", "BITSAT"] },
  { id: "data-scientist", emoji: "📊", title: "Data Scientist", category: "Technology", streams: ["MPC", "Commerce"], demand: "Very High", description: "Extract insights from large datasets to help businesses make data-driven decisions.", exams: ["JEE Main", "CAT"] },
  { id: "cybersecurity", emoji: "🔐", title: "Cybersecurity Expert", category: "Technology", streams: ["MPC"], demand: "High", description: "Protect digital assets, networks, and systems from hackers and cyberattacks.", exams: ["JEE Main", "GATE"] },
  { id: "civil-engineer", emoji: "🏗️", title: "Civil Engineer", category: "Engineering", streams: ["MPC"], demand: "High", description: "Design and construct infrastructure including roads, bridges, dams, and buildings.", exams: ["JEE Main", "JEE Advanced"] },
  { id: "mechanical-engineer", emoji: "⚙️", title: "Mechanical Engineer", category: "Engineering", streams: ["MPC"], demand: "High", description: "Design and develop mechanical systems from engines to manufacturing equipment.", exams: ["JEE Main", "JEE Advanced", "GATE"] },
  { id: "aerospace-engineer", emoji: "✈️", title: "Aerospace Engineer", category: "Engineering", streams: ["MPC"], demand: "High", description: "Design aircraft, spacecraft, and related systems for aviation and space exploration.", exams: ["JEE Advanced", "NDA"] },
  { id: "mbbs-doctor", emoji: "🏥", title: "MBBS Doctor", category: "Medical", streams: ["BiPC"], demand: "Very High", description: "Diagnose and treat diseases, provide healthcare services, and improve patient outcomes.", exams: ["NEET UG"] },
  { id: "pharmacist", emoji: "💊", title: "Pharmacist", category: "Medical", streams: ["BiPC"], demand: "High", description: "Dispense medications and advise patients on safe drug usage and interactions.", exams: ["NEET UG", "GPAT"] },
  { id: "biotechnologist", emoji: "🧬", title: "Biotechnologist", category: "Research", streams: ["BiPC"], demand: "High", description: "Apply biological systems and living organisms to develop products for medicine and agriculture.", exams: ["NEET", "CUET", "IIT JAM"] },
  { id: "data-researcher", emoji: "🔬", title: "Research Scientist", category: "Research", streams: ["MPC", "BiPC"], demand: "High", description: "Conduct fundamental and applied research in sciences to advance human knowledge.", exams: ["CSIR NET", "IIT JAM", "GATE"] },
  { id: "space-scientist", emoji: "🚀", title: "Space Scientist", category: "Research", streams: ["MPC"], demand: "Emerging", description: "Work with ISRO or international agencies to develop satellites, rockets, and space missions.", exams: ["JEE Advanced", "ISRO exam"] },
  { id: "chartered-accountant", emoji: "📑", title: "Chartered Accountant", category: "Commerce", streams: ["Commerce"], demand: "High", description: "Manage financial records, audit businesses, and advise on tax and investment strategies.", exams: ["CA Foundation", "CA Inter", "CA Final"] },
  { id: "investment-banker", emoji: "💰", title: "Investment Banker", category: "Commerce", streams: ["Commerce"], demand: "High", description: "Help companies raise capital, structure mergers, and manage complex financial transactions.", exams: ["CAT", "GMAT"] },
  { id: "economist", emoji: "📉", title: "Economist", category: "Commerce", streams: ["Commerce", "Humanities"], demand: "High", description: "Study production, distribution, and consumption of goods to advise governments and businesses.", exams: ["CUET", "CAT", "UPSC"] },
  { id: "entrepreneur", emoji: "🚀", title: "Entrepreneur", category: "Business", streams: ["Commerce", "MPC", "Humanities"], demand: "High", description: "Create and scale your own ventures, products, or services to solve real-world problems.", exams: ["CAT", "GMAT"] },
  { id: "marketing-manager", emoji: "📣", title: "Marketing Manager", category: "Business", streams: ["Commerce", "Humanities"], demand: "High", description: "Develop strategies to promote brands, products, and services to target audiences.", exams: ["CAT", "XAT", "SNAP"] },
  { id: "lawyer", emoji: "⚖️", title: "Lawyer", category: "Law", streams: ["Humanities", "Commerce"], demand: "High", description: "Represent clients in legal matters, provide legal counsel, and argue cases in court.", exams: ["CLAT", "AILET", "LSAT"] },
  { id: "judge", emoji: "🏛️", title: "Judge", category: "Law", streams: ["Humanities"], demand: "Moderate", description: "Interpret and apply the law to resolve disputes and deliver justice in courts.", exams: ["CLAT", "UPSC"] },
  { id: "army-officer", emoji: "🪖", title: "Army Officer", category: "Defence", streams: ["MPC", "Humanities"], demand: "High", description: "Lead soldiers, plan strategic operations, and protect the nation through the Indian Army.", exams: ["NDA", "CDS", "AFCAT"] },
  { id: "ias-officer", emoji: "🏛️", title: "IAS Officer", category: "Government", streams: ["Humanities", "MPC", "Commerce", "BiPC"], demand: "High", description: "Administer government policies at district and state levels as a top civil servant.", exams: ["UPSC CSE"] },
  { id: "politician", emoji: "🗳️", title: "Political Leader", category: "Government", streams: ["Humanities"], demand: "Moderate", description: "Represent citizens in democratic institutions and shape public policy at local, state, or national level.", exams: ["UPSC", "State PCS"] },
  { id: "graphic-designer", emoji: "🎨", title: "Graphic Designer", category: "Design", streams: ["Humanities", "Commerce", "MPC", "BiPC"], demand: "High", description: "Create visual concepts to communicate ideas that inspire, inform, and captivate consumers.", exams: ["NID", "NIFT", "UCEED"] },
  { id: "ux-designer", emoji: "📱", title: "UX Designer", category: "Design", streams: ["MPC", "Humanities"], demand: "High", description: "Design intuitive digital experiences that are user-friendly, accessible, and engaging.", exams: ["NID", "NIFT"] },
  { id: "clinical-psychologist", emoji: "🧠", title: "Clinical Psychologist", category: "Psychology", streams: ["Humanities", "BiPC"], demand: "High", description: "Diagnose and treat mental health disorders through evidence-based therapies.", exams: ["CUET", "RCI licensure"] },
  { id: "sports-coach", emoji: "🏆", title: "Sports Coach", category: "Sports", streams: ["Humanities", "MPC"], demand: "Moderate", description: "Train athletes, develop performance plans, and lead teams to peak competitive performance.", exams: ["NIS Patiala", "B.P.Ed"] },
  { id: "hotel-manager", emoji: "🏨", title: "Hotel Manager", category: "Hospitality", streams: ["Humanities", "Commerce"], demand: "High", description: "Oversee all aspects of hotel operations to deliver exceptional guest experiences.", exams: ["NCHMCT JEE"] },
  { id: "chef", emoji: "👨‍🍳", title: "Chef / Culinary Artist", category: "Hospitality", streams: ["Humanities", "Commerce"], demand: "High", description: "Create culinary experiences, manage kitchens, and innovate menus in restaurants worldwide.", exams: ["NCHMCT JEE", "IHM entrance"] },
];

const CATEGORIES = ["All", "Technology", "Engineering", "Medical", "Research", "Commerce", "Business", "Law", "Defence", "Government", "Design", "Psychology", "Sports", "Hospitality"];

const DEMAND_COLOR: Record<string, string> = {
  "Very High": "text-green-400 bg-green-400/10 border-green-400/20",
  "High": "text-primary bg-primary/10 border-primary/20",
  "Moderate": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Emerging": "text-accent bg-accent/10 border-accent/20",
};

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = ALL_CAREERS.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background pb-24">
      {/* Hero */}
      <div className="relative pt-20 pb-16 text-center mesh-bg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 border border-primary/20 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-accent" /> {ALL_CAREERS.length} Career Paths Explored
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Explore <span className="gradient-text">Career Paths</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse all careers, understand what they involve, and explore your personalized roadmap.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers, categories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border glass focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                category === cat
                  ? "bg-primary/20 border-primary/50 text-primary"
                  : "glass border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Career grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.5) }}
              className="glass rounded-2xl border border-border hover:border-primary/30 transition-all group p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{career.emoji}</div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${DEMAND_COLOR[career.demand] || ""}`}>
                  {career.demand}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1">{career.title}</h3>
              <div className="text-xs text-muted-foreground font-medium mb-3">{career.category}</div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{career.description}</p>

              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1 mb-4">
                  {career.streams.map(s => (
                    <span key={s} className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-md">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground truncate flex-1 mr-2">
                    {career.exams.slice(0, 2).join(" · ")}
                  </div>
                  <Link
                    href={`/roadmap?career=${career.id}`}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all shrink-0"
                  >
                    View Roadmap <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p>No careers found for "{search}"</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 glass rounded-2xl border border-border p-10">
          <h2 className="text-2xl font-bold mb-3">Find YOUR best match</h2>
          <p className="text-muted-foreground mb-6">Take the AI-powered aptitude test to get personalized career recommendations ranked just for you.</p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
          >
            Start Free Analysis <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
