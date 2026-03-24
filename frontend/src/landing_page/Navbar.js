import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? "#387ed1" : "#555",
    fontWeight: isActive(path) ? "600" : "400",
    borderBottom: isActive(path) ? "2px solid #387ed1" : "2px solid transparent",
    paddingBottom: "2px",
    transition: "all 0.2s ease",
  });

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img src="media/logo.svg" style={{ width: "130px" }} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/signup" style={linkStyle("/signup")}>
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/login" style={linkStyle("/login")}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about" style={linkStyle("/about")}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/product" style={linkStyle("/product")}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/pricing" style={linkStyle("/pricing")}>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/support" style={linkStyle("/support")}>
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
