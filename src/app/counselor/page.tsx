"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send, User, Bot, AlertCircle, Sparkles, Database, WifiOff } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "What are the best careers for MPC students?",
  "Which exams do I need for IIT?",
  "Is NEET the only option for BiPC students?",
  "How do I become an IAS officer?",
];

export default function CounselorPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profileDataStr = localStorage.getItem("futureousProfile");
    const resultsDataStr = localStorage.getItem("futureousAptitudeResults");
    if (!profileDataStr) {
      router.push("/onboarding");
      return;
    }
    setProfile(JSON.parse(profileDataStr));
    if (resultsDataStr) setResults(JSON.parse(resultsDataStr));

    setMessages([
      {
        id: "init",
        role: "model",
        text: "Hello! I'm your **FutureousAI Career Counselor**, powered by Gemini AI. 🎯\n\nI know your profile and test results. Ask me anything about:\n- Career choices and their requirements\n- Entrance exams and preparation strategies\n- College selection and cut-offs\n- Day-to-day life in any career\n\nWhat would you like to know?",
      },
    ]);
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", text: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const history = messages
        .filter(m => m.id !== "init")
        .map(m => ({ role: m.role, parts: [{ text: m.text }] }));

      const res = await fetch("/api/counsel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage.text,
          profile,
          interests: profile?.interests,
          aptitude: results?.answers,
          history,
          demoMode
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get response");

      setIsFallback(data.isFallback || false);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "model", text: data.response }]);
    } catch (err: any) {
      // In case of a hard network error (fetch fails entirely)
      setError("Unable to connect to the counselor. Please check your internet connection.");
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/50 glass-strong py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold flex items-center gap-2">
              AI Career Counselor
              {demoMode ? (
                <span className="flex items-center gap-1 text-xs bg-purple-400/10 text-purple-400 border border-purple-400/20 px-2 py-0.5 rounded-full">
                  <Database className="w-3 h-3" /> Demo Mode
                </span>
              ) : isFallback ? (
                <span className="flex items-center gap-1 text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-full">
                  <WifiOff className="w-3 h-3" /> Backup Counselor Mode
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> AI Counselor Online
                </span>
              )}
            </h1>
            <p className="text-xs text-muted-foreground">
              {demoMode || isFallback ? "Powered by Local Career Intelligence" : "Powered by Google Gemini · Personalized to your profile"}
            </p>
          </div>
        </div>
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden md:inline">Demo Mode</span>
          <button 
            onClick={() => setDemoMode(!demoMode)}
            className={`w-10 h-5 rounded-full relative transition-colors ${demoMode ? 'bg-purple-500' : 'bg-muted'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${demoMode ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
        <div className="container mx-auto max-w-3xl space-y-5">
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-primary to-secondary"
                  : "bg-gradient-to-br from-secondary to-primary/60"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary/20 border border-primary/30 rounded-tr-none text-foreground"
                  : "glass border border-border rounded-tl-none"
              }`}>
                {msg.role === "model" ? (
                  <div className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:text-foreground [&>ul]:text-muted-foreground [&>ol]:text-muted-foreground [&>h1]:text-foreground [&>h2]:text-foreground [&>h3]:text-foreground [&>strong]:text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-primary/60 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="glass border border-border rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto bg-red-500/10 text-red-400 p-3 rounded-xl border border-red-500/20 flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested questions (shown when only init message) */}
      {messages.length === 1 && (
        <div className="border-t border-border/30 px-4 py-3">
          <div className="container mx-auto max-w-3xl">
            <p className="text-xs text-muted-foreground mb-2">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs glass border border-border rounded-full px-3 py-1.5 hover:border-primary/40 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border/50 p-3 md:p-4 glass-strong">
        <form onSubmit={handleSubmit} className="container mx-auto max-w-3xl relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about any career, exam, or college…"
            className="flex-1 pl-5 pr-4 py-3.5 rounded-2xl border border-border bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all disabled:opacity-50 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
