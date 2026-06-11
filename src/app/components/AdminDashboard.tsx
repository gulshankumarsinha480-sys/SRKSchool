import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

interface Enquiry {
  Id: string;
  Name: string;
  Phone: string;
  Grade: string;
  Message: string;
  Status: string;
  SubmittedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new:       { label: "New",       bg: "bg-blue-50",   text: "text-blue-700",  dot: "bg-blue-500"  },
  contacted: { label: "Contacted", bg: "bg-amber-50",  text: "text-amber-700", dot: "bg-amber-500" },
  closed:    { label: "Closed",    bg: "bg-green-50",  text: "text-green-700", dot: "bg-green-500" },
};

function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError("Both fields are required");
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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)" }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed)" }} />

          <div className="p-8 sm:p-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg shadow-violet-200" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                SRK
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
              <p className="text-sm text-gray-400 mt-1">S.R.K. Public School — Admin Panel</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPass
                      ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 mt-1 flex items-center justify-center gap-2"
                style={{ background: loading ? "#a78bfa" : "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing in...</>
                ) : "Sign in"}
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">S.R.K. Public School · Haldia, West Bengal</p>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${color}`}>
        {value}
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">{label}</div>
      </div>
    </div>
  );
}

// ── Mobile Enquiry Card ──────────────────────────────────────
function EnquiryCard({ e, onStatusChange, onDelete }: { e: Enquiry; onStatusChange: (id: string, status: string) => void; onDelete: (id: string) => void }) {
  const cfg = STATUS_CONFIG[e.Status] ?? STATUS_CONFIG.new;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-gray-900 text-sm">{e.Name}</div>
          <div className="text-xs text-gray-400 mt-0.5">{e.Phone}</div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-violet-50 text-violet-700 text-xs px-2.5 py-1 rounded-full font-medium">{e.Grade}</span>
        <span className="text-xs text-gray-400">{new Date(e.SubmittedAt).toLocaleDateString("en-IN")}</span>
      </div>
      {e.Message && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{e.Message}</p>}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
        <select
          value={e.Status}
          onChange={(ev) => onStatusChange(e.Id, ev.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-violet-400"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={() => onDelete(e.Id)} className="text-red-400 hover:text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
      </div>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────
export default function AdminDashboard() {
  const [token, setToken]         = useState<string | null>(localStorage.getItem("srk_token"));
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  async function fetchEnquiries(t: string) {
    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 401) { handleLogout(); return; }
      const json = await res.json();
      setEnquiries(json.data || []);
    } catch {
      setError("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`${API_BASE}/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchEnquiries(token!);
  }

  async function deleteEnquiry(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`${API_BASE}/api/enquiries/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEnquiries(token!);
  }

  function handleLogout() {
    localStorage.removeItem("srk_token");
    setToken(null);
  }

  useEffect(() => {
    if (token) fetchEnquiries(token);
    else setLoading(false);
  }, [token]);

  if (!token) return <LoginPage onLogin={(t) => setToken(t)} />;

  const filtered = enquiries.filter((e) => {
    const matchStatus = filterStatus === "all" || e.Status === filterStatus;
    const matchSearch = search === "" ||
      e.Name.toLowerCase().includes(search.toLowerCase()) ||
      e.Phone.includes(search) ||
      e.Grade.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total:     enquiries.length,
    new:       enquiries.filter((e) => e.Status === "new").length,
    contacted: enquiries.filter((e) => e.Status === "contacted").length,
    closed:    enquiries.filter((e) => e.Status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar / Top nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-violet-200" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>SRK</div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-tight">Admin Panel</div>
              <div className="text-xs text-gray-400 leading-tight hidden sm:block">S.R.K. Public School</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => token && fetchEnquiries(token)}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-violet-700 px-3 py-2 rounded-lg hover:bg-violet-50 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage and respond to admission enquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total"     value={stats.total}     color="bg-violet-500" />
          <StatCard label="New"       value={stats.new}       color="bg-blue-500"   />
          <StatCard label="Contacted" value={stats.contacted} color="bg-amber-500"  />
          <StatCard label="Closed"    value={stats.closed}    color="bg-green-500"  />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search by name, phone, grade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "contacted", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filterStatus === s
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <svg className="animate-spin w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Phone</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Grade</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Message</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-gray-300">
                        <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        <div className="text-sm font-medium">No enquiries found</div>
                      </td>
                    </tr>
                  )}
                  {filtered.map((e) => {
                    const cfg = STATUS_CONFIG[e.Status] ?? STATUS_CONFIG.new;
                    return (
                      <tr key={e.Id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-gray-900">{e.Name}</td>
                        <td className="px-5 py-4 text-gray-500">{e.Phone}</td>
                        <td className="px-5 py-4">
                          <span className="bg-violet-50 text-violet-700 text-xs px-2.5 py-1 rounded-full font-medium">{e.Grade}</span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 max-w-xs truncate">{e.Message || "—"}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                            <select
                              value={e.Status}
                              onChange={(ev) => updateStatus(e.Id, ev.target.value)}
                              className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-violet-400 bg-transparent"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{new Date(e.SubmittedAt).toLocaleDateString("en-IN")}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => deleteEnquiry(e.Id)} className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col gap-3">
              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-300">
                  <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  <div className="text-sm font-medium">No enquiries found</div>
                </div>
              )}
              {filtered.map((e) => (
                <EnquiryCard key={e.Id} e={e} onStatusChange={updateStatus} onDelete={deleteEnquiry} />
              ))}
            </div>

            {filtered.length > 0 && (
              <p className="text-xs text-gray-400 mt-4 text-right">Showing {filtered.length} of {enquiries.length} enquiries</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}