import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#fafafa", borderTop: "1px solid #e8eaf0" }}>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-md-3 mb-4 mb-md-0">
            <img src="media/logo.svg" alt="Logo" style={{ width: "130px", marginBottom: "12px" }} />
            <p className="text-muted" style={{ fontSize: "13px" }}>
              &copy; 2010 - 2024, Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <p className="fw-semibold mb-3" style={{ fontSize: "14px", color: "#333" }}>Company</p>
            {[
              { label: "About", to: "/about" },
              { label: "Products", to: "/product" },
              { label: "Pricing", to: "/pricing" },
              { label: "Referral programme", to: "/" },
              { label: "Careers", to: "/" },
              { label: "Press & media", to: "/" },
            ].map(({ label, to }) => (
              <div key={label} className="mb-2">
                <Link to={to} style={{ textDecoration: "none", color: "#555", fontSize: "13px" }}
                  onMouseEnter={(e) => (e.target.style.color = "#387ed1")}
                  onMouseLeave={(e) => (e.target.style.color = "#555")}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <p className="fw-semibold mb-3" style={{ fontSize: "14px", color: "#333" }}>Support</p>
            {[
              { label: "Contact", to: "/support" },
              { label: "Support portal", to: "/support" },
              { label: "List of charges", to: "/pricing" },
              { label: "Downloads & resources", to: "/" },
            ].map(({ label, to }) => (
              <div key={label} className="mb-2">
                <Link to={to} style={{ textDecoration: "none", color: "#555", fontSize: "13px" }}
                  onMouseEnter={(e) => (e.target.style.color = "#387ed1")}
                  onMouseLeave={(e) => (e.target.style.color = "#555")}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
          <div className="col-md-3">
            <p className="fw-semibold mb-3" style={{ fontSize: "14px", color: "#333" }}>Account</p>
            {[
              { label: "Open an account", to: "/signup" },
              { label: "Fund transfer", to: "/" },
              { label: "60 day challenge", to: "/" },
            ].map(({ label, to }) => (
              <div key={label} className="mb-2">
                <Link to={to} style={{ textDecoration: "none", color: "#555", fontSize: "13px" }}
                  onMouseEnter={(e) => (e.target.style.color = "#387ed1")}
                  onMouseLeave={(e) => (e.target.style.color = "#555")}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="border-top pt-4 text-muted" style={{ fontSize: "12px", lineHeight: "1.8" }}>
          <p>
            Broking Ltd.: Member of NSE &amp; BSE – SEBI Registration no.: INZ000033. CDSL: Depository services through
            Securities Pvt. Ltd. – SEBI Registration no.: IN-DP-10-215. Commodity Trading through Broking.Ltd Commodities
            Pvt. Ltd. MCX: 465 – SEBI Registration no.: INZ0000238. Registered Address: #13/14, 4th Cross, N.P Nagar
            4th Phase, Bengaluru - 560094, Karnataka, India. For complaints pertaining to securities broking please
            write to complaints@broking.com, for DP related to dp@broking.com. Please ensure you carefully read the
            Risk Disclosure Document as prescribed by SEBI.
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully
            before investing.
          </p>
          <p>
            "Prevent unauthorized transactions in your account. Update your mobile numbers/email IDs with your stock
            brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of
            the day. KYC is one time exercise while dealing in securities markets — once KYC is done through a SEBI
            registered intermediary, you need not undergo the same process again when you approach another
            intermediary."
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
