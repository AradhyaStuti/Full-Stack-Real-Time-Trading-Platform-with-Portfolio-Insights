import React from "react";

function Education() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img src="media/education.svg" alt="Education" style={{ width: "70%", maxWidth: "340px" }} />
        </div>
        <div className="col-md-6 ps-md-5">
          <h2 className="fw-bold mb-4" style={{ color: "#1a1a2e" }}>Free and open market education</h2>

          <div className="mb-4 p-4" style={{ border: "1px solid #e8eaf0", borderRadius: "10px" }}>
            <h5 className="fw-semibold mb-2">Varsity</h5>
            <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
              The largest online stock market education book in the world, covering everything from basics to advanced trading.
            </p>
            <a href="" style={{ textDecoration: "none", color: "#387ed1", fontSize: "0.9rem" }}>
              Explore Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

          <div className="p-4" style={{ border: "1px solid #e8eaf0", borderRadius: "10px" }}>
            <h5 className="fw-semibold mb-2">TradingQ&amp;A</h5>
            <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
              The most active trading and investment community in India for all your market related queries.
            </p>
            <a href="" style={{ textDecoration: "none", color: "#387ed1", fontSize: "0.9rem" }}>
              Visit TradingQ&amp;A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
