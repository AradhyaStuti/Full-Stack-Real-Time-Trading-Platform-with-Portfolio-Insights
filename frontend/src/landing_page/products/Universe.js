import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  const partners = [
    { logo: "media/smallcaseLogo.png", name: "Smallcase", desc: "Thematic investment platform" },
    { logo: "media/streakLogo.png", name: "Streak", desc: "Algo & strategy platform" },
    { logo: "media/sensibullLogo.svg", name: "Sensibull", desc: "Options trading platform" },
    { logo: "media/fundhouse.png", name: "Broking.Ltd Fundhouse", desc: "Asset management" },
    { logo: "media/goldenpiLogo.png", name: "GoldenPi", desc: "Bonds trading platform" },
    { logo: "media/dittoLogo.png", name: "Ditto", desc: "Insurance" },
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#1a1a2e" }}>The Broking.Ltd Universe</h2>
        <p className="text-muted mt-2" style={{ maxWidth: "500px", margin: "0 auto" }}>
          Extend your trading and investment experience with our partner platforms
        </p>
      </div>

      <div className="row justify-content-center">
        {partners.map((p) => (
          <div key={p.name} className="col-6 col-md-4 p-3">
            <div
              className="text-center p-4 h-100"
              style={{
                border: "1px solid #e8eaf0",
                borderRadius: "10px",
                transition: "box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <img src={p.logo} alt={p.name} style={{ maxWidth: "130px", height: "40px", objectFit: "contain" }} />
              <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.85rem" }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link
          to="/signup"
          className="btn btn-primary px-5 py-2 fs-5 fw-semibold"
          style={{ borderRadius: "6px", backgroundColor: "#387ed1", border: "none" }}
        >
          Signup for free
        </Link>
      </div>
    </div>
  );
}

export default Universe;
