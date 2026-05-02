import React from "react";

function LeftSection({ imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
  return (
    <div className="container my-5 py-3">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img src={imageURL} alt={productName} style={{ maxWidth: "100%", maxHeight: "340px", objectFit: "contain" }} />
        </div>
        <div className="col-md-6 ps-md-5">
          <h2 className="fw-bold mb-3" style={{ color: "#1a1a2e" }}>{productName}</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1rem", lineHeight: "1.7" }}>{productDescription}</p>
          <div className="d-flex gap-3 mb-4">
            {tryDemo && (
              <a href={tryDemo} style={{ textDecoration: "none", color: "#387ed1", fontWeight: "500" }}>
                Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            )}
            {learnMore && (
              <a href={learnMore} style={{ textDecoration: "none", color: "#387ed1", fontWeight: "500" }}>
                Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            )}
          </div>
          {(googlePlay || appStore) && (
            <div className="d-flex gap-3 align-items-center">
              {googlePlay && (
                <a href={googlePlay}>
                  <img src="media/googlePlayBadge.svg" alt="Get it on Google Play" style={{ height: "40px" }} />
                </a>
              )}
              {appStore && (
                <a href={appStore}>
                  <img src="media/appstoreBadge.svg" alt="Download on App Store" style={{ height: "40px" }} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
