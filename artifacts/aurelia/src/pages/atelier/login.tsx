import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { useAtelierAuth } from "@/lib/atelierAuth";

export default function AtelierLogin() {
  const { login } = useAtelierAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/atelier/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">Internal Access</p>
          <h1 className="font-serif text-3xl tracking-widest text-white">Aurelia & Co.</h1>
          <div className="w-8 h-px bg-white/20 mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="atelier-email"
              className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              Email
            </label>
            <input
              id="atelier-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
              placeholder="you@aureliaco.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="atelier-password"
              className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              Password
            </label>
            <input
              id="atelier-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-400 tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-white text-[#0f0e0c] text-xs uppercase tracking-[0.3em] py-3.5 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Enter"}
          </button>
        </form>

        <p className="text-center text-[10px] text-white/20 tracking-widest mt-10">
          Restricted access — Aurelia & Co. staff only
        </p>
      </div>
    </div>
  );
}
