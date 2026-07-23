import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user, loading: authLoading, refreshUserData } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400/30 border-t-blue-400 mx-auto mb-4"></div>
          <p className="text-purple-200 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const response = await apiFetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');

        localStorage.setItem('userEmail', email);
        await refreshUserData();
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        const response = await apiFetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Registration failed');

        setSuccess('OTP sent to your email!');
        setStep('otp');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiFetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Verification failed');

      localStorage.setItem('userEmail', email);
      await refreshUserData();
      setSuccess('Success! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center py-8 md:py-16 px-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10 my-auto shrink-0">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8 animate-slideDown">
            {/* Robot Logo */}
            <div className="flex justify-center mb-4">
              <svg width="72" height="72" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Antenna */}
                <circle cx="100" cy="18" r="8" fill="#6C63FF"/>
                <rect x="96" y="26" width="8" height="22" rx="4" fill="#6C63FF"/>
                {/* Chat bubble body */}
                <path d="M20 55 Q20 35 40 35 H160 Q180 35 180 55 V130 Q180 150 160 150 H120 L95 175 Q93 178 90 175 L80 155 H40 Q20 155 20 135 Z" fill="#6C63FF"/>
                {/* Eyes */}
                <rect x="65" y="75" width="28" height="38" rx="14" fill="white"/>
                <rect x="107" y="75" width="28" height="38" rx="14" fill="white"/>
                {/* Dot below bubble */}
                <circle cx="55" cy="170" r="9" fill="#6C63FF"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-2">
              AI Resume Editor
            </h1>
            <p className="text-purple-200 text-lg">{isLogin ? 'Welcome back!' : 'Join us today!'}</p>
          </div>

          {/* Toggle between Login and Register */}
          {step !== 'otp' && (
            <div className="flex gap-4 mb-8 animate-slideDown animation-delay-100">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setStep('email');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-3 text-center rounded-xl font-bold transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setStep('email');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-3 text-center rounded-xl font-bold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm backdrop-blur-sm animate-slideDown">
              <p className="font-semibold flex items-center gap-2">
                <span>❌</span> {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 text-green-200 rounded-xl text-sm backdrop-blur-sm animate-slideDown">
              <p className="font-semibold flex items-center gap-2">
                <span>✅</span> {success}
              </p>
            </div>
          )}

          {/* Email/Register Form */}
          {step === 'email' ? (
            <form onSubmit={handleSubmit} className="space-y-4 animate-slideDown w-full">
              {!isLogin && (
                <div className="w-full">
                  <label className="block text-purple-200 font-semibold mb-3 text-left">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                  />
                </div>
              )}

              <div className="w-full">
                <label className="block text-purple-200 font-semibold mb-3 text-left">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <div className="w-full">
                <label className="block text-purple-200 font-semibold mb-3 text-left">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚡</span> {isLogin ? 'Logging in...' : 'Sending OTP...'}
                  </span>
                ) : (
                  isLogin ? 'Login' : 'Send OTP'
                )}
              </button>
            </form>
          ) : null}

          {/* OTP Form */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4 animate-slideDown w-full">
              <p className="text-purple-200 text-center mb-6">
                Enter the 6-digit code sent to<br />
                <strong className="text-white text-lg">{email}</strong>
              </p>

              <div className="w-full">
                <label className="block text-purple-200 font-semibold mb-3 text-left">Verification Code</label>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-4 text-center text-4xl tracking-widest border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all font-mono backdrop-blur-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all duration-300 shadow-lg shadow-green-500/50 hover:shadow-green-500/75 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Verifying...
                  </span>
                ) : (
                  '✓ Verify OTP'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                }}
                className="w-full py-3 bg-white/10 text-purple-200 rounded-xl hover:bg-white/20 border border-white/20 hover:border-white/40 font-semibold transition-all backdrop-blur-sm"
              >
                Change Email
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-purple-200">
            <p>{isLogin ? '✨ Secure password login' : '✨ Secure OTP verification'}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center text-white text-sm animate-slideDown animation-delay-300">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
            <div className="text-3xl mb-2">🔐</div>
            <p className="font-semibold">Secure</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30">
            <div className="text-3xl mb-2">⚡</div>
            <p className="font-semibold">Fast</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-pink-400/50 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30">
            <div className="text-3xl mb-2">✨</div>
            <p className="font-semibold">AI Powered</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 text-sm hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
