import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="text-center py-5 border-bottom">
        <h1 className="fw-bold" style={{ color: "#1a1a2e" }}>Pricing</h1>
        <p className="text-muted mt-2" style={{ fontSize: "1.1rem" }}>
          Free equity investments and flat ₹20 intraday and F&amp;O trades
        </p>
      </div>

      <div className="row py-5 text-center g-4">
        <div className="col-md-4">
          <div className="p-4 h-100" style={{ border: "1px solid #e8eaf0", borderRadius: "12px" }}>
            <img src="media/pricingEquity.svg" alt="Free equity" className="mb-3" style={{ height: "80px" }} />
            <h4 className="fw-semibold">Free equity delivery</h4>
            <p className="text-muted mt-2">
              All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 h-100" style={{ border: "1px solid #e8eaf0", borderRadius: "12px" }}>
            <img src="media/intradayTrades.svg" alt="Intraday trades" className="mb-3" style={{ height: "80px" }} />
            <h4 className="fw-semibold">Intraday and F&amp;O trades</h4>
            <p className="text-muted mt-2">
              Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 h-100" style={{ border: "1px solid #e8eaf0", borderRadius: "12px" }}>
            <img src="media/pricingEquity.svg" alt="Free direct MF" className="mb-3" style={{ height: "80px" }} />
            <h4 className="fw-semibold">Free direct MF</h4>
            <p className="text-muted mt-2">
              All direct mutual fund investments are absolutely free — ₹0 commissions &amp; DP charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
