"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/");
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#046A38] px-6">
      <div className="bg-[#000000] p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-[#F9F5EB] text-center mb-2">
          Sign in to <span className="text-[#B3A369]">Indian Food Trivia</span>
        </h2>
  
        {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
  
        <div className="mt-6">
          <label className="block text-sm font-medium text-[#F9F5EB] mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-3 border border-[#B3A369] rounded-lg bg-[#f9f5eb]/10 text-[#F9F5EB] placeholder-[#F9F5EB]/60 focus:ring-2 focus:ring-[#B3A369]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#F9F5EB] mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-[#B3A369] rounded-lg bg-[#f9f5eb]/10 text-[#F9F5EB] placeholder-[#F9F5EB]/60 focus:ring-2 focus:ring-[#B3A369]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        <div className="mt-2 text-right">
          <a href="#" className="text-[#F9F5EB] hover:underline text-sm">
            Forgot Password?
          </a>
        </div>
  
        <button
          onClick={handleLogin}
          className="mt-6 w-full flex items-center justify-center bg-[#B3A369] text-[#046A38] py-3 rounded-full font-semibold shadow-md hover:bg-[#C4A76B] transition-transform transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
  
        <div className="flex items-center my-6">
          <hr className="flex-grow border-[#F9F5EB]/30" />
          <span className="mx-3 text-[#F9F5EB]/60 text-sm">OR</span>
          <hr className="flex-grow border-[#F9F5EB]/30" />
        </div>
  
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-x-3 border border-gray-300 rounded-full py-3 shadow bg-[#1a1a1a] hover:bg-[#333] transition"
        >
          <img src="/google.png" alt="Google Logo" className="w-5 h-5" />
          <span className="text-[#F9F5EB] font-medium text-sm">Sign in with Google</span>
        </button>
      </div>
    </div>
  );  
};

export default Login;
