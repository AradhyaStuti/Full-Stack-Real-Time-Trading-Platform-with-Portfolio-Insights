import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      const dashboardUrl =
        process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
      window.location.href = dashboardUrl;
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.error ||
        "Invalid username or password.";
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
                  <h4 className="fw-bold text-dark">Welcome back</h4>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    Login to access your portfolio
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2" style={{ fontSize: "14px" }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted" style={{ fontSize: "13px" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
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
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <p className="text-center mt-4 mb-0" style={{ fontSize: "14px" }}>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "#387ed1", textDecoration: "none" }}>
                    Sign up
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

export default Login;
