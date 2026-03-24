import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="py-5" style={{ backgroundColor: "#f8f9ff", borderTop: "1px solid #e8eaf0" }}>
      <div className="container text-center py-4">
        <h2 className="fw-bold mb-3" style={{ color: "#1a1a2e" }}>Open a free account today</h2>
        <p className="text-muted mb-4" style={{ fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
          Modern platforms, ₹0 equity investments, and flat ₹20 intraday &amp; F&amp;O trades.
        </p>
        <Link
          to="/signup"
          className="btn btn-primary px-5 py-2 fs-5 fw-semibold"
          style={{ borderRadius: "6px", backgroundColor: "#387ed1", border: "none" }}
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
}

export default OpenAccount;
