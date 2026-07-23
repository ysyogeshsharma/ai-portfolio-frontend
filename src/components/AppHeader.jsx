import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppHeader() {
  const { user, aiStats, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const remaining = aiStats ? aiStats.limit - aiStats.used : 0;

  const getPlanName = () => {
    if (!aiStats?.plan) return 'Member';
    const names = {
      'free-trial': 'Free Trial',
      standard: 'Standard',
      premium: 'Premium',
      enterprise: 'Enterprise',
    };
    return names[aiStats.plan] || 'Member';
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const linkClass = (path) =>
    `px-5 py-2 text-sm font-bold transition-all rounded-xl border ${
      isActive(path)
        ? 'text-white bg-blue-600 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
        : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
    }`;

  return (
    <header className="backdrop-blur-2xl bg-[#020617]/60 border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/">
            <span className="text-xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer tracking-tighter">
              AI PORTFOLIO & RESUME
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <Link to="/" className={linkClass('/')}>Home</Link>
            {user && (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
                <Link to="/editor" className={linkClass('/editor')}>Resume Studio</Link>
              </>
            )}
          </nav>

          {user && aiStats && (
            <div className="hidden lg:flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full pl-2 pr-4 py-1 backdrop-blur-md">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-blue-500/40">
                {remaining}
              </div>
              <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">
                AI Credits
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-black text-white">
                  {user.name || user.email.split('@')[0]}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {getPlanName()} Plan
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-white/5 text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-xl font-bold transition-all border border-white/10 text-xs active:scale-95"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 font-black transition-all shadow-xl shadow-blue-600/20 text-sm active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
