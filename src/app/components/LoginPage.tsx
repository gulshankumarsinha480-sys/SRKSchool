import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export default function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError("Username aur password dono required hain");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Login failed");
      localStorage.setItem("srk_token", json.token);
      onLogin(json.token);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">SRK</div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">S.R.K. Public School</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-1">Username</label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-violet-600 text-white font-semibold py-2.5 rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
