import React, { useState } from "react";
import axios from "axios";
import {
  Spinner,
  Alert,
  Button,
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/perdiction";

const Prediction: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fruitName, setFruitName] = useState<string>("");
  const [ripenessStage, setRipenessStage] = useState<string>("");
  const [confidence, setConfidence] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPredictionMade(false);
      setFruitName("");
      setRipenessStage("");
      setConfidence("");
    }
  };

  const classifyFruitAndStage = (classification: string) => {
    const [stage, fruit] = classification.split("_");
    if (stage && fruit) {
      setRipenessStage(stage);
      setFruitName(fruit);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError("🍎 Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/predict_post/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      classifyFruitAndStage(response.data.classification);
      setConfidence(response.data.confidence);
      setPredictionMade(true);
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.error || "Image upload failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowRecord = () => {
    navigate("/records");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div style={{ background: "#40916c", minHeight: "100vh" }}>
      {/* Beautiful Header */}
      <Navbar bg="dark" variant="dark"  expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center ">
            <span
              style={{
                background: "#52b788",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
               
                marginRight: "10px",
                fontSize: "20px"
              
                
              }}
            >
              🍎
            </span>
            <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              FruitVision
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                variant="outline-light"
                onClick={handleHome}
                className="mx-2 rounded-pill"
                style={{ minWidth: "100px" }}
              >
                Home
              </Button>
              <Button
                variant="outline-light"
                onClick={handleShowRecord}
                className="mx-2 rounded-pill"
                style={{ minWidth: "100px" }}
              >
                View Records
              </Button>
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="mx-2 rounded-pill"
                style={{ minWidth: "100px" }}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container style={{ paddingTop: "30px", paddingBottom: "50px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card
              className="shadow-lg border-0 p-4"
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                marginTop: "20px",
              }}
            >
              <h2
                className="text-center mb-4"
                style={{ color: "#2d6a4f", fontWeight: "bold" }}
              >
                🍇 Fruit Ripeness Prediction 🍌
              </h2>

              <div className="mb-4">
                <label
                  className="form-label"
                  style={{ fontWeight: "600", color: "#555" }}
                >
                  Upload Fruit Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{
                    border: "2px dashed #a3cfbb",
                    borderRadius: "10px",
                    padding: "12px",
                    backgroundColor: "#f6fff8",
                    cursor: "pointer",
                  }}
                />
              </div>

              {previewUrl && (
                <div className="text-center mb-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "12px",
                      border: "3px solid #d8f3dc",
                      objectFit: "cover",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              )}

              <Button
                variant="success"
                onClick={handleUpload}
                disabled={loading}
                className="w-100 mb-3 rounded-pill fw-bold py-2"
                style={{
                  fontSize: "16px",
                  background: "linear-gradient(to right, #52b788, #40916c)",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  "🔍 Predict Ripeness"
                )}
              </Button>

              {error && (
                <Alert
                  variant="danger"
                  className="rounded-pill text-center fw-semibold"
                >
                  {error}
                </Alert>
              )}

              {predictionMade && (
                <div
                  className="mt-4 p-4 text-center rounded-4"
                  style={{
                    background: "#e3fcef",
                    border: "2px solid #95d5b2",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <h5 className="mb-3" style={{ color: "#40916c" }}>
                    ✅ <strong>Prediction Result</strong>
                  </h5>
                  <p>
                    <strong>🍎 Fruit:</strong>{" "}
                    <span style={{ color: "#1b4332" }}>{fruitName}</span>
                  </p>
                  <p>
                    <strong>🟢 Ripeness Stage:</strong>{" "}
                    <span style={{ color: "#2d6a4f" }}>{ripenessStage}</span>
                  </p>
                  <p>
                    <strong>📊 Confidence:</strong>{" "}
                    <span style={{ color: "#40916c" }}>{confidence}</span>
                  </p>
                  <Button
                    variant="outline-success"
                    onClick={handleShowRecord}
                    className="mt-3 rounded-pill px-4"
                    style={{ fontWeight: "600" }}
                  >
                    View All Records
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Prediction;