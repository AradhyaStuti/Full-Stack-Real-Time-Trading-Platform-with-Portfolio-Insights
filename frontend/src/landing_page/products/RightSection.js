import React from "react";

function RightSection({ imageURL, productName, productDescription, learnMore }) {
  return (
    <div className="container my-5 py-3" style={{ backgroundColor: "#f8f9ff", borderRadius: "16px" }}>
      <div className="row align-items-center px-3">
        <div className="col-md-6 pe-md-5 mb-4 mb-md-0">
          <h2 className="fw-bold mb-3" style={{ color: "#1a1a2e" }}>{productName}</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1rem", lineHeight: "1.7" }}>{productDescription}</p>
          {learnMore && (
            <a href={learnMore} style={{ textDecoration: "none", color: "#387ed1", fontWeight: "500" }}>
              Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          )}
        </div>
        <div className="col-md-6 text-center">
          <img src={imageURL} alt={productName} style={{ maxWidth: "100%", maxHeight: "340px", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
