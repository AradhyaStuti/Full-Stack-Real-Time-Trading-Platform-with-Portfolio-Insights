import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import api from "./utils/api";

const AuthGuard = () => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api
      .get("/auth/user")
      .then(() => setChecking(false))
      .catch(() => {
        const frontendUrl =
          process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
        window.location.href = `${frontendUrl}/login`;
      });
  }, []);

  if (checking) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#555" }}>
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthGuard />
  </React.StrictMode>
);
