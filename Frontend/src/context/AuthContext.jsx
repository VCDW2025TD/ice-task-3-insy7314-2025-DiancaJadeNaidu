// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { parseJwt, getToken, isTokenExpired, setToken as storeToken, removeToken } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const payload = parseJwt(token);
      setUser(payload);
    } else {
      removeToken();
      setUser(null);
    }
  }, []);

  const login = (token) => {
    storeToken(token);
    const payload = parseJwt(token);
    setUser(payload);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
