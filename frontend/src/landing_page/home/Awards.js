import React from "react";

function Awards() {
  return (
    <div className="container my-5 py-3">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img src="media/largestBroker.svg" alt="Largest broker in India" style={{ maxWidth: "100%" }} />
        </div>
        <div className="col-md-6 ps-md-5">
          <h2 className="fw-bold mb-3" style={{ color: "#1a1a2e" }}>Largest stock broker in India</h2>
          <p className="text-muted mb-4">
            2+ million clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul className="list-unstyled">
                {["Futures and Options", "Commodity derivatives", "Currency derivatives"].map((item) => (
                  <li key={item} className="mb-2 d-flex align-items-center">
                    <span style={{ color: "#387ed1", marginRight: "8px", fontWeight: "bold" }}>✓</span>
                    <span className="text-muted" style={{ fontSize: "0.95rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                {["Stocks & IPOs", "Direct mutual funds", "Bonds and Govt. Securities"].map((item) => (
                  <li key={item} className="mb-2 d-flex align-items-center">
                    <span style={{ color: "#387ed1", marginRight: "8px", fontWeight: "bold" }}>✓</span>
                    <span className="text-muted" style={{ fontSize: "0.95rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <img src="media/pressLogos.png" alt="Press logos" style={{ width: "85%", marginTop: "16px" }} />
        </div>
      </div>
    </div>
  );
}

export default Awards;
