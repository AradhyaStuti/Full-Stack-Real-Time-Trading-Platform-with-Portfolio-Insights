import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  const points = [
    {
      title: "Customer-first always",
      desc: "That's why 1.3+ crore customers trust us with ₹3.5+ lakh crores worth of equity investments.",
    },
    {
      title: "No spam or gimmicks",
      desc: 'No gimmicks, spam, "gamification", or annoying push notifications. High quality apps at your pace.',
    },
    {
      title: "The Broking.Ltd universe",
      desc: "Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer tailored services.",
    },
    {
      title: "Do better with money",
      desc: "With initiatives like Nudge and Kill Switch, we actively help you do better with your money.",
    },
  ];

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 pe-md-5 mb-5 mb-md-0">
          <h2 className="fw-bold mb-4" style={{ color: "#1a1a2e" }}>Trust with confidence</h2>
          {points.map((p) => (
            <div key={p.title} className="mb-4">
              <h6 className="fw-semibold mb-1" style={{ color: "#333" }}>{p.title}</h6>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="col-md-6 text-center">
          <img src="media/ecosystem.png" alt="Ecosystem" style={{ width: "90%", maxWidth: "480px" }} />
          <div className="mt-3 d-flex justify-content-center gap-4">
            <Link to="/product" style={{ textDecoration: "none", color: "#387ed1", fontSize: "0.95rem" }}>
              Explore products <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </Link>
            <a href="" style={{ textDecoration: "none", color: "#387ed1", fontSize: "0.95rem" }}>
              Try Kite demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
