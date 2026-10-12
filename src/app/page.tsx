"use client";

import { useState, useEffect } from "react";
import HyperdriveHero from "@/components/ui/hyperdrive-hero";
import GeneratePage from "@/app/generate/page";
import { X, Sparkles, LogIn, UserPlus } from "lucide-react";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Load user info from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    if (storedEmail && storedName) {
      setEmail(storedEmail);
      setName(storedName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Retrieve name from localStorage based on email
    const storedName = localStorage.getItem(`userName_${email}`);
    let displayName = "";
    if (storedName) {
      displayName = storedName;
    } else {
      // Use email username as fallback if name not found
      const emailUsername = email.split("@")[0];
      displayName = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
    }
    setName(displayName);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", displayName);
    setIsLoggedIn(true);
    setAuthModal(null);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user info with email as key
    localStorage.setItem(`userName_${email}`, name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    setIsLoggedIn(true);
    setAuthModal(null);
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {!isLoggedIn ? (
        <>
          <HyperdriveHero
            onLogin={() => {
              setAuthModal("login");
              setName("");
            }}
            onSignUp={() => setAuthModal("signup")}
          />


          {/* Login / Sign Up Modal */}
          {authModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
                <button
                  onClick={() => setAuthModal(null)}
                  className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {authModal === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Bharat Vision AI Platform
                    </p>
                  </div>
                </div>

                <form onSubmit={authModal === "signup" ? handleSignupSubmit : handleLoginSubmit} className="space-y-4">
                  {authModal === "signup" && (
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Arjun Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="arjun@bharatvision.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {authModal === "login" ? (
                      <>
                        <LogIn className="h-4 w-4" /> Log In
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" /> Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-xs text-zinc-400">
                  {authModal === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthModal("signup");
                          setName("");
                        }}
                        className="text-indigo-400 hover:underline font-medium ml-1"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthModal("login");
                          setName("");
                        }}
                        className="text-indigo-400 hover:underline font-medium ml-1"
                      >
                        Log In
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Home Page After Login */
        <GeneratePage
          userName={name || "User"}
          userEmail={email || "user@example.com"}
          onLogout={() => {
            setIsLoggedIn(false);
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            setEmail("");
            setName("");
            setPassword("");
          }}
        />
      )}

    </main>
  );
}
