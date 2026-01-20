import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import {
  Form,
  Button,
  InputGroup,
  Alert
} from "react-bootstrap";
import axios from "axios";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  // Clear form fields on page mount
  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError(null);
    setSuccessMessage(null);
    setRedirecting(false);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage("Signup successful! Redirecting...");
        setRedirecting(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow fixed-top">
        <div className="container">
          <h1 className="navbar-brand fw-bold text-white">Fruits Ripeness Predictions</h1>
        </div>
      </header>

      {/* Signup Section */}
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center py-5 bg-success text-white">
        <h2 className="display-4 fw-bold mb-3">Join Us!</h2>
        <p className="lead w-50">Create an account to start predicting fruit ripeness like a pro.</p>

        <div className="bg-dark p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
          <h3 className="text-success text-center fw-bold">Sign Up</h3>
          <hr />

          {/* Alerts */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Signup Form */}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3 text-start">
              <Form.Label className="fw-semibold text-white">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label className="fw-semibold text-white">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label className="fw-semibold text-white">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow-sm"
                />
                <Button variant="outline-light" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button
              variant="success"
              className="w-100 fw-semibold shadow-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <div className="text-center mt-3">
              <p>Already have an account?{" "}
                <a href="/login" className="text-success fw-semibold text-decoration-none">
                  Login here
                </a>
              </p>
            </div>
            {redirecting && (
              <div className="text-success mt-2">Redirecting to login...</div>
            )}
          </Form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} Fruits Ripeness Predictions. All Rights Reserved.
      </footer>
    </div>
  );
};

export default SignupPage;
