"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/logo/futureousai-logo.png";
import { getFriendlyErrorMessage } from "@/lib/auth-errors";
import { useAuth } from "@/components/providers/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user && !isSuccess) {
      router.push("/dashboard");
    }
  }, [user, authLoading, isSuccess, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isSigningIn) return;
    setError("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Update lastLogin
      try {
        await updateDoc(doc(db, "users", cred.user.uid), {
          lastLogin: new Date().toISOString(),
        });
      } catch { /* doc may not exist yet */ }
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: any) {
      console.error("Email login failed", err);
      setError(getFriendlyErrorMessage(err));
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading || isSigningIn) return;
    const provider = new GoogleAuthProvider();
    setError("");
    setIsSigningIn(true);
    console.log("Google popup started");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google popup success - User authenticated:", user.uid);
      console.log("User object received:", user);
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      await setDoc(ref, {
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        provider: "google",
        lastLogin: new Date().toISOString(),
        ...(snap.exists() ? {} : {
          accountType: "student",
          createdAt: new Date().toISOString(),
          profileCompleted: false,
        })
      }, { merge: true });
      
      setIsSuccess(true);
      console.log("Redirect triggered to /dashboard");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: any) {
      console.error("Google popup failed");
      console.error("error.code:", err.code);
      console.error("error.message:", err.message);
      console.error("error.stack:", err.stack);
      setError(getFriendlyErrorMessage(err));
      setIsSigningIn(false);
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image src={Logo} alt="FutureousAI Logo" width={48} height={48} className="rounded-xl object-contain shadow-lg shadow-primary/20" />
              <span className="text-2xl font-bold gradient-text">FutureousAI</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your journey.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-500/20">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-500/10 text-green-400 p-3 rounded-lg text-sm mb-6 border border-green-500/20 flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
              Login successful! Redirecting to dashboard...
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading || isSigningIn}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={loading || isSigningIn}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" disabled={loading || isSigningIn} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSigningIn || isSuccess}
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-primary/20 mt-2"
            >
              {loading || isSuccess ? "Signing in..." : <><LogIn className="w-4 h-4" /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading || isSigningIn || isSuccess}
            className="mt-4 w-full bg-white/5 border border-border text-foreground font-medium py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSigningIn ? (
              <span>Connecting to Google...</span>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
