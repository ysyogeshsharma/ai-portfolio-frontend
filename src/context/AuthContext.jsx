import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiStats, setAiStats] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      fetchUserData(email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await apiFetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${email}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setAiStats(data.aiRequests);
      } else {
        localStorage.removeItem('userEmail');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
    setAiStats(null);
  };

  const refreshUserData = async () => {
    const email = localStorage.getItem('userEmail');
    if (email) await fetchUserData(email);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, aiStats, isAuthenticated: !!user, logout, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
