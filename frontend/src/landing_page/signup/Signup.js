import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.error ||
        "Signup failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <img
                    src="media/logo.svg"
                    alt="Logo"
                    style={{ width: "120px", marginBottom: "16px" }}
                  />
                  <h4 className="fw-bold text-dark">Create your account</h4>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    Start your trading journey today
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2" style={{ fontSize: "14px" }}>
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success py-2" style={{ fontSize: "14px" }}>
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="johndoe123"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 text-white fw-semibold"
                    style={{ backgroundColor: "#387ed1", padding: "10px" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <p className="text-center mt-4 mb-0" style={{ fontSize: "14px" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#387ed1", textDecoration: "none" }}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
