import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppHeader from '../components/AppHeader';

export default function Dashboard() {
  const { user, loading, aiStats, logout } = useAuth();
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(0);
  const [usagePercent, setUsagePercent] = useState(0);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (aiStats) {
      const rem = aiStats.limit - aiStats.used;
      setRemaining(rem);
      setUsagePercent((aiStats.used / aiStats.limit) * 100);
    }
  }, [aiStats]);

  const getPlanName = () => {
    if (!aiStats?.plan) return 'Free Member';
    const names = {
      'free-trial': 'Free Trial',
      standard: 'Standard',
      premium: 'Premium',
      enterprise: 'Enterprise',
    };
    return names[aiStats.plan] || 'Member';
  };

  const getExpiryText = () => {
    if (!aiStats?.expiresAt) return null;
    const date = new Date(aiStats.expiresAt);
    if (date < new Date()) return 'Plan Expired';
    return `Expires: ${date.toLocaleDateString()}`;
  };

  const planColor = {
    'free-trial': 'blue',
    standard: 'emerald',
    premium: 'purple',
    enterprise: 'amber',
  }[aiStats?.plan] || 'blue';

  if (loading) {
    return (
      <div className="h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500/30 border-t-blue-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#020617] text-slate-100 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <AppHeader />

        <main className="p-6 md:p-10 max-w-[1400px] mx-auto">
          {/* Welcome Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  {getPlanName()} Dashboard
                </span>
                {getExpiryText() && (
                  <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {getExpiryText()}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  {user.name || user.email.split('@')[0]}
                </span>
              </h1>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 transition-all rounded-2xl font-black text-white border border-white/10 flex items-center gap-2 active:scale-95"
              >
                🎨 Portfolio Builder
              </button>
              <button
                onClick={() => navigate('/editor')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 transition-all rounded-2xl font-black text-white shadow-xl shadow-blue-600/20 flex items-center gap-2 active:scale-95"
              >
                🚀 Resume Studio
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel */}
            <div className="lg:col-span-4 space-y-6">
              {/* User Card */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-18 h-18 w-[72px] h-[72px] rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/30">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white">{user.name || 'Member'}</h2>
                    <p className="text-slate-400 text-sm font-bold truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Plan</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">{getPlanName()}</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />
                    </div>
                  </div>
                  {aiStats?.expiresAt && (
                    <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Valid Until</p>
                      <span className="text-sm font-bold text-slate-200">
                        {new Date(aiStats.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subscription Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-600/10">
                <h3 className="text-xl font-black mb-4">Subscription 💎</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6 font-medium">
                  You are on the <strong className="text-white">{getPlanName()}</strong> plan.{' '}
                  {aiStats?.plan === 'free-trial'
                    ? 'Contact admin to upgrade for more daily AI exports.'
                    : 'Enjoy your high-limit studio access.'}
                </p>
                <button
                  onClick={() => navigate('/editor')}
                  className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-black text-sm transition-all"
                >
                  Open Resume Studio →
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-8 space-y-6">
              {/* AI Credits Card */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-white">AI Studio Credits</h2>
                  <div className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
                    {getPlanName()} Quota
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-8">
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Daily Usage</span>
                      <span className="text-2xl font-black text-white">
                        {aiStats?.used || 0}
                        <span className="text-slate-500 text-sm"> / {aiStats?.limit || 3}</span>
                      </span>
                    </div>
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm font-bold">Remaining Today</span>
                      <span className="text-lg font-black text-blue-400">{remaining}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm font-bold">Next Reset</span>
                      <span className="text-sm font-black text-slate-200">
                        {aiStats?.resetAt
                          ? new Date(aiStats.resetAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() => navigate('/editor')}
                  className="bg-white/5 hover:bg-white/[0.08] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-500/30 transition-all">
                    📄
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Resume Studio</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Upload your resume PDF, let AI parse it, then apply one of 40+ premium templates.
                  </p>
                  <span className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    Launch <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>

                <div
                  onClick={() => navigate('/')}
                  className="bg-white/5 hover:bg-white/[0.08] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-500/30 transition-all">
                    🌐
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Portfolio Builder</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Create a stunning 3D interactive portfolio website with 23+ animated templates.
                  </p>
                  <span className="text-purple-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    Build Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
