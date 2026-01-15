import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid login");

      const data = await res.json();
      setMsg("Login Successful! 🎉");
      
      if (onLoginSuccess) {
        onLoginSuccess(data.role);
      }
    } catch (err) {
      setMsg("Invalid Username or Password ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/0 to-white/10 animate-shimmer"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden group hover:shadow-purple-500/50 transition-all duration-500 hover:scale-[1.02]">
          
          {/* Card Top Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
          
          {/* Floating Corner Decorations */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-3xl border-2 border-white/50"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-3xl border-2 border-white/50"></div>

          {/* Logo with Glow */}
          <div className="text-center mb-10 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-6 shadow-2xl border-4 border-white/40 flex items-center justify-center group-hover:scale-110 transition-all duration-400 hover:shadow-purple-500/50 hover:shadow-2xl">
                <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              {/* Logo Glow Effect */}
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-400/50 via-transparent to-pink-400/50 blur animate-pulse group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            </div>
            
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2 font-semibold tracking-wide">Sign in to your account ✨</p>
          </div>

          {/* Form with Icon Inputs */}
          <div className="space-y-6">
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 group-hover/input:text-purple-500 transition-colors">
                👤
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-white/80 to-gray-50/80 shadow-inner focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/60 hover:border-purple-400 hover:shadow-md transition-all duration-300 text-lg backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>

            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 group-hover/input:text-purple-500 transition-colors">
                🔒
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-white/80 to-gray-50/80 shadow-inner focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/60 hover:border-purple-400 hover:shadow-md transition-all duration-300 text-lg backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>

            {msg && (
              <div className={`p-4 rounded-2xl text-sm font-bold text-center shadow-lg transform transition-all duration-300 hover:scale-105 ${
                msg.includes("Successful")
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/50"
                  : "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/50"
              }`}>
                <span className="inline-flex items-center gap-2">{msg}</span>
              </div>
            )}

            {/* Premium Button with Icons */}
            <button
              onClick={login}
              disabled={isLoading || !username || !password}
              className={`relative w-full py-5 px-6 rounded-2xl font-bold text-xl shadow-2xl overflow-hidden transition-all duration-400 transform hover:-translate-y-2 group/button ${
                isLoading || !username || !password
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed scale-95"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 hover:shadow-purple-500/50 text-white"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
              
              <span className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Sign In Now
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Fancy Footer */}
          <div className="mt-10 pt-8 border-t-2 border-gradient/30 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 via-transparent to-purple-400/10 rounded-b-3xl"></div>
            <p className="text-sm text-gray-600 font-semibold relative z-10">
              Don't have an account?{" "}
              <a href="#" className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:underline decoration-2 underline-offset-4">
                Create Account ✨
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 4s infinite;
        }
        .border-gradient {
          border-image: linear-gradient(to right, #667eea, #764ba2) 1;
        }
      `}</style>
    </div>
  );
}
