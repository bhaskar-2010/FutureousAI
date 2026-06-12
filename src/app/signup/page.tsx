"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { UserPlus, Eye, EyeOff, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"student" | "parent">("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        photoURL: "",
        provider: "email",
        accountType,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profileCompleted: false,
      });
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message?.replace("Firebase: ", "") || "Failed to create an account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        await updateDoc(ref, { lastLogin: new Date().toISOString() });
        router.push("/dashboard");
      } else {
        await setDoc(ref, {
          uid: user.uid,
          name: user.displayName || "User",
          email: user.email || "",
          photoURL: user.photoURL || "",
          provider: "google",
          accountType,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          profileCompleted: false,
        });
        router.push("/onboarding");
      }
    } catch (err: any) {
      setError(err.message?.replace("Firebase: ", "") || "Google sign-up failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 mesh-bg">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/30">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join FutureousAI to start your journey.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-500/20">
              {error}
            </div>
          )}

          {/* Account type toggle */}
          <div className="flex gap-3 mb-6">
            {[
              { value: "student", label: "Student", icon: GraduationCap },
              { value: "parent", label: "Parent", icon: Users },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setAccountType(value as "student" | "parent")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-all text-sm ${
                  accountType === value
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border bg-white/5 text-muted-foreground hover:border-border/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 pr-12"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-secondary/20 mt-2"
            >
              {loading ? "Creating account..." : <><UserPlus className="w-4 h-4" /> Create Account</>}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="mt-4 w-full bg-white/5 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
