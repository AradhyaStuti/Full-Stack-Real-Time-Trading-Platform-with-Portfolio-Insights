import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-4">
      <div className="text-center py-4 py-md-5 px-3">
        <h1 className="fw-bold" style={{ color: "#1a1a2e" }}>Technology</h1>
        <h3 className="text-muted mt-3 fs-5">
          Sleek, modern and intuitive trading platforms
        </h3>
        <p className="mt-3 mb-4">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none", color: "#387ed1" }}>
            investment offerings{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
