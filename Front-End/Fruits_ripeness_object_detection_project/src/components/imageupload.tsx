import React, { useState } from "react";
import axios from "axios";
import { Spinner, Alert, Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/perdiction";

const ImageUploadAndClassify: React.FC = () => {
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
    navigate("/admin_panel");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #40916c 0%, #2d6a4f 100%)", minHeight: "100vh", padding: "20px 0" }}>
      {/* Enhanced Header Section */}
      <div style={{
        background: "rgba(45, 106, 79, 0.9)",
        padding: "15px 0",
        marginBottom: "40px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        borderBottom: "3px solid rgba(255,255,255,0.1)"
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={4}>
              <div
                onClick={handleHome}
                style={{
                  color: "#fff",
                  fontSize: "24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span style={{
                  background: "#52b788",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                }}>
                  🍎
                </span>
                FruitVision
              </div>
            </Col>
            <Col md={8} className="d-flex justify-content-end">
              <div style={{
                display: "flex",
                gap: "20px",
                alignItems: "center"
              }}>
                <Button
                  variant="outline-light"
                  onClick={handleHome}
                  style={{
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "600",
                    borderWidth: "2px",
                    transition: "all 0.3s"
                  }}
                  className="hover-effect"
                >
                  Home
                </Button>
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  style={{
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "600",
                    borderWidth: "2px",
                    transition: "all 0.3s"
                  }}
                  className="hover-effect"
                >
                  Logout
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={6}>
            <Card className="shadow-lg border-0 p-4" style={{
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255,255,255,0.95)"
            }}>
              <h2 className="text-center mb-4" style={{
                color: "#2d6a4f",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
              }}>
                🍇 Fruit Ripeness Prediction 🍌
              </h2>

              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: "600", color: "#555" }}>
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
                    transition: "all 0.3s"
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
                  background: "linear-gradient(135deg, #52b788 0%, #40916c 100%)",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s"
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
                <Alert variant="danger" className="rounded-pill text-center fw-semibold">
                  {error}
                </Alert>
              )}

              {predictionMade && (
                <div className="mt-4 p-4 text-center rounded-4" style={{
                  background: "linear-gradient(135deg, #e3fcef 0%, #d8f3dc 100%)",
                  border: "2px solid #95d5b2",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
                }}>
                  <h5 className="mb-3" style={{ color: "#40916c" }}>
                    ✅ <strong>Prediction Result</strong>
                  </h5>
                  <p><strong>🍎 Fruit:</strong> <span style={{ color: "#1b4332" }}>{fruitName}</span></p>
                  <p><strong>🟢 Ripeness Stage:</strong> <span style={{ color: "#2d6a4f" }}>{ripenessStage}</span></p>
                  <p><strong>📊 Confidence:</strong> <span style={{ color: "#40916c" }}>{confidence}</span></p>
                  <Button
                    variant="outline-success"
                    onClick={handleShowRecord}
                    className="mt-3 rounded-pill px-4 py-2"
                    style={{
                      borderWidth: "2px",
                      fontWeight: "600",
                      transition: "all 0.3s"
                    }}
                  >
                    Manage All Records
                  </Button>
                </div>
              )}
            </Card>
          </Col>

          {/* Side Section for Image Preview */}
          
        </Row>
      </Container>
    </div>
  );
};

export default ImageUploadAndClassify;
