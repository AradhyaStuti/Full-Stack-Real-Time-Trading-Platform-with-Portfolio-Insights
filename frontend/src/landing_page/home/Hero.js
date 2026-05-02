import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-5 mb-4">
      <div className="row text-center justify-content-center">
        <img
          src="media/homeHero.png"
          alt="Hero Image"
          className="mb-4"
          style={{ maxWidth: "900px", width: "100%" }}
        />
        <h1 className="mt-4 fw-bold" style={{ fontSize: "2.4rem", color: "#1a1a2e" }}>
          Invest in everything
        </h1>
        <p className="text-muted mt-2 mb-4" style={{ fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs, and more
        </p>
        <div className="mt-3">
          <Link
            to="/signup"
            className="btn btn-primary px-5 py-2 fs-5 fw-semibold"
            style={{ borderRadius: "6px", backgroundColor: "#387ed1", border: "none" }}
          >
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
