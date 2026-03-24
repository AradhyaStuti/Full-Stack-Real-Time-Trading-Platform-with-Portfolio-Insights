import React from "react";

const sections = [
  {
    title: "Account Opening",
    links: ["Online Account Opening", "Offline Account Opening", "Company, Partnership and HUF Account Opening", "NRI Account Opening", "Charges", "IDFC FIRST Bank 3-in-1 Account", "Getting Started"],
  },
  {
    title: "Your Account",
    links: ["Login Credentials", "Account Modification and Closure", "Segment Addition", "DP ID and Bank Details", "Your Profile", "Transfer and conversion of shares"],
  },
  {
    title: "Your Account (Trading)",
    links: ["Margin/leverage, Product and Order Types", "Kite Web and Mobile", "Trading FAQs", "Corporate Actions", "Sentinel", "Kite API", "Pi and other platforms", "GTT"],
  },
  {
    title: "Funds",
    links: ["Adding Funds", "Fund Withdrawal", "eMandates", "Adding Bank Account"],
  },
  {
    title: "Console",
    links: ["Reports", "Ledger", "Portfolio", "60 day Challenge", "IPO", "Referral Program"],
  },
  {
    title: "Coin",
    links: ["Understanding Mutual Funds", "About Coin", "Buying and Selling through Coin", "Starting an SIP", "Managing your Portfolio", "Coin App", "Moving to Coin", "Government Securities"],
  },
];

function CreateTicket() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-5" style={{ color: "#1a1a2e" }}>To create a ticket, select a relevant topic</h2>
      <div className="row g-4">
        {sections.map((section) => (
          <div key={section.title} className="col-md-4">
            <div className="p-4 h-100" style={{ border: "1px solid #e8eaf0", borderRadius: "10px" }}>
              <h6 className="fw-semibold mb-3" style={{ color: "#333" }}>
                <i className="fa fa-plus-circle me-2" style={{ color: "#387ed1" }} aria-hidden="true"></i>
                {section.title}
              </h6>
              <ul className="list-unstyled mb-0">
                {section.links.map((link) => (
                  <li key={link} className="mb-2">
                    <a
                      href="#"
                      style={{ textDecoration: "none", color: "#555", fontSize: "0.9rem", lineHeight: "1.6" }}
                      onMouseEnter={(e) => (e.target.style.color = "#387ed1")}
                      onMouseLeave={(e) => (e.target.style.color = "#555")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
