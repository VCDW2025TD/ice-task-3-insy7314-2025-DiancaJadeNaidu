// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import API from "../services/api";
import DOMPurify from "dompurify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!email || !password) {
      setFeedback({ type: "error", text: "Provide email & password" });
      return;
    }

    try {
      const payload = {
        email: DOMPurify.sanitize(email),
        password: DOMPurify.sanitize(password),
      };
      const res = await API.post("/auth/register", payload);
      login(res.data.token);
      setFeedback({ type: "success", text: "Registered — redirecting..." });
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err?.response?.data || err);
      const message = err?.response?.data?.message || "Registration failed";
      setFeedback({ type: "error", text: message });
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Register</h2>
      {feedback && <div style={{ color: feedback.type === "error" ? "red" : "green" }}>{feedback.text}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
