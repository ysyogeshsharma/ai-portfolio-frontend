import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid credentials'); return; }
      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all';

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#020617] flex justify-center py-8 md:py-16 px-4 relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md my-auto shrink-0">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔐</div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-2">Restricted access — authorized personnel only</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Username</label>
              <input type="text" value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))} placeholder="admin" className={inputCls} required />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="••••••••" className={inputCls} required />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black rounded-xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Authenticating…' : '🔐 Admin Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
