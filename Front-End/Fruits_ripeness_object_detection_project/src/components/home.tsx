import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Get token from correct localStorage key
    const userToken = localStorage.getItem("userToken"); 
    const storedUsername = localStorage.getItem("username"); 

    if (userToken) {
      setUsername(storedUsername);
      navigate("/prediction"); // Redirect logged-in users
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow fixed-top">
        <div className="container">
          <h1 className="navbar-brand fw-bold text-dark">Fruits Ripeness Predictions</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              
            
              <li className="nav-item"><Link to="/records" className="nav-link text-white fw-semibold">View Records</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-link text-white fw-semibold">About</Link></li>
              <li className="nav-item"><Link to="/signup" className="nav-link text-white fw-semibold">Registration</Link></li>
              <li className="nav-item"><Link to="/login" className="nav-link text-white fw-semibold">Logout</Link></li>
            </ul>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 d-flex flex-column align-items-center text-center py-5 bg-success text-white">
        <h2 className="display-4 fw-bold mb-3">
          Welcome to {username ? username : "Fruits Ripeness Predictions"}
        </h2>
        <p className="lead w-50">
          Upload fruit images and let our AI detect their ripeness stage with high accuracy.
        </p>
        <Link to="/prediction" className="btn btn-warning btn-lg mt-3 px-5 py-3 fw-semibold shadow">
          Try Prediction Now
        </Link>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} Fruits Ripeness Predictions. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
