import React from "react";
import { Container, Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container className="p-5 bg-success shadow-lg rounded-4">
        <h1 className="text-center text-primary display-4 fw-bold mb-4">
          🍎 About <span className="text-dark">Fruit Ripeness Detection</span>
        </h1>
        <p className="text-center text-muted fs-5 mb-5">
          Know your fruit’s freshness – instantly and effortlessly.
        </p>

        {/* Overview */}
        <Card className="mb-4 bg-gray border-0 shadow-sm rounded-4">
          <Card.Body>
            <Card.Title className="text-success h4 fw-bold mb-3">
              📌 Project Overview
            </Card.Title>
            <Card.Text className="text-muted fs-6">
              Welcome to the <strong>Fruit Ripeness Detection</strong> system – a powerful tool that utilizes cutting-edge machine learning to analyze fruit images and determine their ripeness stage.
            </Card.Text>
            <Card.Text className="text-muted fs-6">
              This application classifies fruits into <strong>Unripe, Ripe, or Overripe</strong>, gives a <strong>confidence score</strong>, and allows users to save and manage previous results.
            </Card.Text>
          </Card.Body>
        </Card>

        {/* How It Works */}
        <Card className="mb-4 border-0 shadow-sm rounded-4">
          <Card.Body>
            <Card.Title className="text-success h4 fw-bold mb-3">
              🔍 How It Works
            </Card.Title>
            <ListGroup variant="flush" className="fs-6">
              <ListGroup.Item>📷 <strong>Upload an Image</strong>: Capture or select a clear fruit image.</ListGroup.Item>
              <ListGroup.Item>⚙️ <strong>Processing</strong>: The trained model analyzes the image.</ListGroup.Item>
              <ListGroup.Item>📈 <strong>Results</strong>: View ripeness classification and confidence score.</ListGroup.Item>
              <ListGroup.Item>💾 <strong>Save Results</strong>: Store the result for future reference.</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Instructions */}
        <Card className="mb-4 border-0 shadow-sm rounded-4">
          <Card.Body>
            <Card.Title className="text-success h4 fw-bold mb-3">
              🧾 Instructions for Use
            </Card.Title>
            <ListGroup variant="flush" className="fs-6">
              <ListGroup.Item>✅ Ensure clear lighting and high image quality.</ListGroup.Item>
              <ListGroup.Item>✅ Keep the fruit centered and fully visible.</ListGroup.Item>
              <ListGroup.Item>✅ Avoid blur, glare, or obstruction.</ListGroup.Item>
              <ListGroup.Item>✅ Refer to the <strong>confidence score</strong> for decision-making.</ListGroup.Item>
              <ListGroup.Item>✅ Save results to track ripeness trends over time.</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Benefits */}
        <Card className="mb-4 border-0 shadow-sm rounded-4">
          <Card.Body>
            <Card.Title className="text-success h4 fw-bold mb-3">
              🌟 Benefits of Using This Tool
            </Card.Title>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush" className="fs-6">
                  <ListGroup.Item>🌿 <strong>Accurate Detection</strong>: High-performing ML models.</ListGroup.Item>
                  <ListGroup.Item>📊 <strong>Historical Tracking</strong>: Save and analyze records.</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush" className="fs-6">
                  <ListGroup.Item>📱 <strong>User-Friendly</strong>: Intuitive interface for all users.</ListGroup.Item>
                  <ListGroup.Item>⚡ <strong>Quick Results</strong>: Get predictions in real-time.</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-5">
          <Button
            variant="primary"
            size="lg"
            className="px-5 py-2 rounded-3 fw-semibold shadow-sm"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default About;
