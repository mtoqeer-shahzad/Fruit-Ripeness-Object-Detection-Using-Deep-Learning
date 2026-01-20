import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
      });

      const { message, role, token } = response.data;

      if (response.status === 200) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);

        setSuccessMessage(message);
        setTimeout(() => {
          navigate(role === "admin" ? "/dashboard" : "/home");
        }, 2000);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.message || "Invalid credentials.");
      } else {
        setError("Server error. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow fixed-top">
        <div className="container">
          <h1 className="navbar-brand fw-bold text-white ">Fruits Ripeness Predictions</h1>
        </div>
      </header>

      {/* Login Section */}
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center py-5 bg-success text-white">
        <h2 className="display-4 fw-bold mb-3">Welcome Back!</h2>
        <p className="lead w-50">Log in to analyze fruit ripeness with AI-powered precision.</p>

        <div className="bg-dark p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
          <h3 className="text-success text-center fw-bold">Login</h3>
          <hr />

          {/* Success & Error Messages */}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-semibold shadow-sm" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div className="text-center mt-3">
              <p>New user? <a href="/signup" className="text-success fw-semibold text-decoration-none">Sign up</a></p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} Fruits Ripeness Predictions. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LoginForm;
