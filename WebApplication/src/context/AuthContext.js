import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
});

/**
 * AuthProvider - Provides authentication state to the app.
 * Stores token in localStorage and fetches current profile.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(false);

  // Fetch current user profile if token exists
  useEffect(() => {
    async function loadProfile() {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch (e) {
        // Token invalid/expired
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
      }
    }
    loadProfile();
  }, [token]);

  // PUBLIC_INTERFACE
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const t = res.data?.access_token || res.data?.token;
      if (t) {
        localStorage.setItem('auth_token', t);
        setToken(t);
        // fetch profile
        const me = await api.get('/auth/me');
        setUser(me.data);
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data || e.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // PUBLIC_INTERFACE
  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password, emailRedirectTo: process.env.REACT_APP_SITE_URL });
      // Auto-login if backend supports returning token, otherwise prompt user to login
      try {
        const res = await api.post('/auth/login', { email, password });
        const t = res.data?.access_token || res.data?.token;
        if (t) {
          localStorage.setItem('auth_token', t);
          setToken(t);
          const me = await api.get('/auth/me');
          setUser(me.data);
        }
      } catch (_) {
        // ignore, user can login manually
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data || e.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, token, login, register, logout, loading }), [user, token, login, register, logout, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
