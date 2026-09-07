import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devforge_user');
    return saved ? JSON.parse(saved) : { id: 1, name: "DevForge Demo User", email: "demo@devforge.io", role: "ROLE_USER" };
  });

  const [token, setToken] = useState(() => localStorage.getItem('devforge_token') || 'demo-jwt-token-xyz');
  const [isDemoMode, setIsDemoMode] = useState(true);

  const login = (email, password) => {
    const userData = { id: 1, name: email.split('@')[0] || "Developer", email, role: "ROLE_USER" };
    const fakeToken = "jwt-bearer-token-" + Date.now();
    setUser(userData);
    setToken(fakeToken);
    localStorage.setItem('devforge_user', JSON.stringify(userData));
    localStorage.setItem('devforge_token', fakeToken);
    return true;
  };

  const register = (name, email, password) => {
    const userData = { id: Date.now(), name, email, role: "ROLE_USER" };
    const fakeToken = "jwt-bearer-token-" + Date.now();
    setUser(userData);
    setToken(fakeToken);
    localStorage.setItem('devforge_user', JSON.stringify(userData));
    localStorage.setItem('devforge_token', fakeToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('devforge_user');
    localStorage.removeItem('devforge_token');
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, register, logout, isDemoMode, toggleDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
