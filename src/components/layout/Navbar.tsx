"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/AuthContext";
import { LayoutDashboard, User, LogOut, Sparkles, Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo/futureousai-logo.png";

export default function Navbar() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
    setDropOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-strong">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src={Logo} alt="FutureousAI Logo" width={36} height={36} className="object-contain" />
          <span className="text-xl font-bold gradient-text">
            FutureousAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/reviews" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Reviews
          </Link>
          <Link href="/careers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Careers
          </Link>

          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold ring-2 ring-border hover:ring-primary/50 transition-all"
                >
                  {profile?.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.photoURL} alt="avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    (profile?.name?.[0] || user.email?.[0] || "U").toUpperCase()
                  )}
                </button>
                {dropOpen && (
                  <div className="absolute right-0 top-12 w-52 glass-strong rounded-xl py-2 shadow-2xl">
                    <div className="px-4 py-2 border-b border-border/50 mb-1">
                      <p className="text-sm font-semibold truncate">{profile?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{profile?.email || user.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setDropOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors">
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link href="/dashboard" onClick={() => setDropOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-white/5 transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center ml-4">
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-border/50 py-4 px-4 flex flex-col gap-3">
          <Link href="/how-it-works" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">How It Works</Link>
          <Link href="/reviews" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Reviews</Link>
          <Link href="/careers" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Careers</Link>
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Dashboard</Link>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Profile</Link>
              <button onClick={handleSignOut} className="text-sm font-medium text-destructive py-2 text-left">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Login</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full text-center">Get Started</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
