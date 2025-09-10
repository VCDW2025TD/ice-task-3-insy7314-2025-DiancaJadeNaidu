// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    API.get("/protected")
      .then((res) => {
        if (!mounted) return;
        setServerMsg(res.data.message || "No message");
      })
      .catch((err) => {
        console.error("Protected error:", err?.response || err);
        setServerMsg("Failed to fetch protected data.");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>User ID: {user?.id}</p>
      {loading ? <p>Loading...</p> : <div>{serverMsg}</div>}
    </div>
  );
}
