"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, Quote, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const REVIEWS = [
  {
    id: 1,
    name: "Rohan M.",
    role: "Class 12, Science (MPC)",
    category: "student",
    rating: 5,
    text: "FutureousAI completely changed my perspective. I was confused between engineering and design. The psychometric test clearly showed my aptitude for UI/UX and now I'm preparing for NID with a clear goal.",
  },
  {
    id: 2,
    name: "Priya S.",
    role: "Parent of Class 10 Student",
    category: "parent",
    rating: 5,
    text: "As a parent, the 7-page Premium Report gave me the exact insights I needed. It highlighted my daughter's strengths in communication and suggested law, which we hadn't even considered. Highly recommended!",
  },
  {
    id: 3,
    name: "Aditya V.",
    role: "Class 11, Commerce",
    category: "student",
    rating: 5,
    text: "The AI counselor is like magic. I asked it about entrance exams for Chartered Accountancy and it gave me a step-by-step roadmap in seconds. It's like having a mentor available at midnight!",
  },
  {
    id: 4,
    name: "Dr. Ananya R.",
    role: "School Principal",
    category: "school",
    rating: 5,
    text: "We integrated FutureousAI for our Class 10 batch before they chose their streams. The data-driven approach removes the guesswork. Students are much more confident about their choices now.",
  },
  {
    id: 5,
    name: "Sneha P.",
    role: "Class 12, Humanities",
    category: "student",
    rating: 4,
    text: "I always wanted to do psychology but wasn't sure if I had the aptitude. The assessment confirmed my interest and aptitude aligned perfectly. The roadmap feature is super helpful.",
  },
  {
    id: 6,
    name: "Rahul T.",
    role: "Parent of Class 12 Student",
    category: "parent",
    rating: 5,
    text: "My son was struggling with the pressure of JEE preparation. The analysis showed his true aptitude was in Business Management. We pivoted his preparation, and he's much happier and performing better.",
  }
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");

  const filteredReviews = filter === "all" ? REVIEWS : REVIEWS.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-background pb-24 font-sans">
      {/* Hero */}
      <section className="relative pt-28 pb-20 text-center mesh-bg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 border border-primary/20">
              <MessageCircle className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Trusted by 10,000+ Users</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Stories of <span className="gradient-text">Clarity & Success</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Don't just take our word for it. Read how FutureousAI is helping students discover their true potential and giving parents peace of mind.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span className="text-white">4.9/5</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-muted-foreground text-lg font-normal ml-2">(2,400+ Reviews)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: "all", label: "All Reviews", icon: Quote },
            { id: "student", label: "Students", icon: GraduationCap },
            { id: "parent", label: "Parents", icon: Users },
            { id: "school", label: "Educators", icon: CheckCircle2 }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                filter === f.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30 border-2 border-primary"
                  : "bg-white/5 text-muted-foreground border-2 border-border hover:border-primary/50 hover:text-white"
              }`}
            >
              <f.icon className="w-4 h-4" />
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong p-8 rounded-3xl border border-border hover:border-primary/40 transition-colors flex flex-col relative group"
            >
              <div className="absolute top-4 right-6 text-6xl text-primary opacity-10 group-hover:opacity-20 transition-opacity font-serif">"</div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`} />
                ))}
              </div>
              
              <p className="text-lg text-foreground leading-relaxed mb-8 flex-1 relative z-10 italic">
                "{review.text}"
              </p>
              
              <div className="mt-auto border-t border-border pt-4">
                <p className="font-bold text-white">{review.name}</p>
                <p className="text-sm text-primary font-medium">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No reviews found for this category.
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-24 text-center">
        <div className="glass-strong rounded-3xl border border-border p-12 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Write Your Own Success Story</h2>
          <p className="text-muted-foreground mb-8 text-lg relative z-10 max-w-2xl mx-auto">
            Join the thousands of students who have found clarity and direction with FutureousAI.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-4 font-bold text-white rounded-full bg-primary hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:scale-105 relative z-10"
          >
            Start Free Analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
