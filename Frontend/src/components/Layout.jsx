// src/components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { isLoggedIn } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif" }}>
      <nav style={navStyle}>
        <div style={{ fontWeight: 600 }}>
          <Link to="/" style={{ textDecoration: "none" }}>Secure Blog</Link>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>

      <main style={{ padding: 20 }}>{children}</main>

      <footer style={{ marginTop: 40, padding: 16, borderTop: "1px solid #eee", textAlign: "center" }}>
        <small>Secure Blog — Local Dev</small>
      </footer>
    </div>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  borderBottom: "1px solid #eee"
};
