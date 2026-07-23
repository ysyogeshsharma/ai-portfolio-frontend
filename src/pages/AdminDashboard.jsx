import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';

const PLANS = ['free-trial', 'standard', 'premium', 'enterprise'];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const adminHeader = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }
    try {
      const res = await apiFetch('/api/admin/users', { headers: adminHeader() });
      const data = await res.json();
      if (res.ok) setUsers(data.users);
      else { localStorage.removeItem('adminToken'); navigate('/admin/login'); }
    } catch (err) {
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleEdit = (user) => {
    setEditingUser(user.email);
    setEditForm({
      plan: user.plan || 'free-trial',
      aiRequestLimit: user.aiRequestLimit || 3,
      planExpiresAt: user.planExpiresAt ? new Date(user.planExpiresAt).toISOString().split('T')[0] : '',
    });
  };

  const handleSave = async (email) => {
    try {
      const res = await apiFetch('/api/admin/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeader() },
        body: JSON.stringify({
          email,
          plan: editForm.plan,
          aiRequestLimit: parseInt(editForm.aiRequestLimit, 10),
          planExpiresAt: editForm.planExpiresAt || null,
        }),
      });
      if (res.ok) {
        setEditingUser(null);
        fetchUsers();
      } else {
        const data = await res.json();
        setError(data.error || 'Update failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const planColor = {
    'free-trial': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    standard: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    premium: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    enterprise: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  const inputCls =
    'bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all';

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#020617] text-slate-100 relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Admin Header */}
        <header className="backdrop-blur-2xl bg-[#020617]/60 border-b border-white/5 sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-black bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent tracking-tighter">
                ADMIN PANEL
              </Link>
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-[10px] font-black uppercase tracking-widest">
                Restricted
              </span>
            </div>
            <button onClick={handleLogout} className="px-5 py-2 bg-white/5 text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-xl font-bold transition-all border border-white/10 text-sm active:scale-95">
              Sign Out
            </button>
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-[1400px] mx-auto">
          {/* Stats row */}
          <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: users.length },
              { label: 'Verified', value: users.filter((u) => u.verified).length },
              { label: 'Paid Plans', value: users.filter((u) => u.plan !== 'free-trial').length },
              { label: 'Free Trial', value: users.filter((u) => u.plan === 'free-trial').length },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
                <p className="text-3xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-white">All Users</h2>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email or name…"
                className={`${inputCls} w-64`}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500/30 border-t-blue-500" />
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((u) => (
                  <div
                    key={u.email}
                    className="bg-black/20 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black">
                          {(u.name || u.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-white">{u.name || '—'}</p>
                          <p className="text-slate-400 text-sm">{u.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-widest ${planColor[u.plan] || 'text-slate-400 bg-white/5 border-white/10'}`}>
                          {u.plan}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${u.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {u.verified ? '✓ Verified' : '✗ Unverified'}
                        </span>
                        <span className="text-xs text-slate-500 font-bold">
                          AI: {u.aiRequestCount || 0}/{u.aiRequestLimit || 3}
                        </span>
                        <button
                          onClick={() => handleEdit(u)}
                          className="px-4 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 rounded-xl text-blue-400 text-xs font-black transition-all active:scale-95"
                        >
                          Edit Plan
                        </button>
                      </div>
                    </div>

                    {/* Inline edit form */}
                    {editingUser === u.email && (
                      <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Plan</label>
                          <select value={editForm.plan} onChange={(e) => setEditForm((p) => ({ ...p, plan: e.target.value }))} className={`${inputCls} w-full`}>
                            {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Limit/day</label>
                          <input type="number" value={editForm.aiRequestLimit} onChange={(e) => setEditForm((p) => ({ ...p, aiRequestLimit: e.target.value }))} className={`${inputCls} w-full`} min={0} max={9999} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Plan Expires</label>
                          <input type="date" value={editForm.planExpiresAt} onChange={(e) => setEditForm((p) => ({ ...p, planExpiresAt: e.target.value }))} className={`${inputCls} w-full`} />
                        </div>
                        <div className="flex items-end gap-2">
                          <button onClick={() => handleSave(u.email)} className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-sm transition-all active:scale-95">
                            Save
                          </button>
                          <button onClick={() => setEditingUser(null)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-sm transition-all border border-white/10">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
