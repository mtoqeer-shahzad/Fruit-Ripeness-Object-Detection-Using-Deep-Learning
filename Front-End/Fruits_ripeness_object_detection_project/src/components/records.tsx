import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Container,
  Table,
  Image,
  Alert,
  Spinner,
  Button,
  Pagination,
  Card,
  Badge,
  Navbar,
  Nav,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const Records: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "undefined") {
      return "Unknown Date";
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleString();
  };

  const formatConfidence = (confidence: string) => {
    const confidenceNum = parseFloat(confidence.replace('%', ''));
    return isNaN(confidenceNum) ? "N/A" : confidenceNum.toFixed(2);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/perdiction/predictions_get_all/`);
        if (Array.isArray(response.data.predictions)) {
          setRecords(response.data.predictions);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        setError("Failed to fetch records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const current = records.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleHome = () => {
    navigate("/home");
  };

  const handlePrediction = () => {
    navigate("/prediction");
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #40916c 0%, #2d6a4f 100%)" }}>
      {/* Enhanced Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
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
                fontSize: "20px",
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
                onClick={handlePrediction}
                className="mx-2 rounded-pill"
                style={{ minWidth: "100px" }}
              >
                New Prediction
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
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-lg border-0 overflow-hidden">
              <Card.Header className="bg-dark text-white py-3">
                <h2 className="text-center mb-0">
                  <span className="me-2">📊</span> My Prediction History
                </h2>
              </Card.Header>
              <Card.Body className="p-0">
                {error && (
                  <Alert variant="danger" className="m-3 rounded-3">
                    {error}
                  </Alert>
                )}
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="success" />
                    <p className="mt-3 text-muted">Loading your records...</p>
                  </div>
                ) : records.length === 0 ? (
                  <div className="text-center py-5">
                    <h4 className="text-muted">No records found</h4>
                    <Button
                      variant="success"
                      onClick={handlePrediction}
                      className="mt-3 rounded-pill px-4"
                    >
                      Make Your First Prediction
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <Table hover className="mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="text-center">Image</th>
                            <th>Fruit & Ripeness</th>
                            <th className="text-center">Confidence</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {current.map((rec, idx) => (
                            <tr key={idx}>
                              <td className="text-center align-middle">
                                <Image
                                  src={rec.image_url}
                                  alt="Prediction"
                                  width={80}
                                  height={80}
                                  rounded
                                  className="border shadow-sm object-fit-cover"
                                  style={{ objectFit: "cover" }}
                                />
                              </td>
                              <td className="align-middle">
                                <div className="fw-bold text-capitalize">
                                  {rec.classification.replace("_", " ")}
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                <Badge
                                  pill
                                  bg={
                                    parseFloat(rec.confidence.replace('%', '')) > 70
                                      ? "success"
                                      : parseFloat(rec.confidence.replace('%', '')) > 40
                                      ? "warning"
                                      : "danger"
                                  }
                                  className="px-3 py-2"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  {formatConfidence(rec.confidence)}%
                                </Badge>
                              </td>
                              <td className="align-middle text-muted small">
                                {formatDate(rec.date)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
                      <div>
                        <span className="text-muted">
                          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, records.length)} of {records.length} records
                        </span>
                      </div>
                      <Pagination className="mb-0">
                        <Pagination.Prev
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, i) => (
                          <Pagination.Item
                            key={i + 1}
                            active={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <Button
                variant="outline-light"
                onClick={handlePrediction}
                className="rounded-pill px-4 py-2 fw-semibold"
              >
                ← Back to Prediction Page
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Records;