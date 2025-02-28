"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert("Check your email for confirmation!");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/");
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Login / Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />
      <br />
      <button onClick={handleLogin} disabled={loading} style={{ margin: "0.5rem" }}>
        Login
      </button>
      <button onClick={handleSignUp} disabled={loading} style={{ margin: "0.5rem" }}>
        Sign Up
      </button>
    </div>
  );
};

export default LoginPage;
