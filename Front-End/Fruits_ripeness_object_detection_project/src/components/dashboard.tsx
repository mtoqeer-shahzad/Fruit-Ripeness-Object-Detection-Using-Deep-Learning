import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PencilSquare, Trash, PlusCircle } from "react-bootstrap-icons";

const BASE_URL = "http://127.0.0.1:8000";
     
const AUTH_TOKEN ="f19b4b478693f9e0c07c4a7a06f47e9f7511aacd";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [predictionsCount, setPredictionsCount] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchPredictionsCount();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/?timestamp=${Date.now()}`, {
        headers: { Authorization: `Token ${AUTH_TOKEN}` }
      });
      setUsers(res.data);
    } catch {
      setError("Failed to load users.");
    }
  };

  const fetchPredictionsCount = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/perdiction/count_prediction/`, {
        headers: { Authorization: `Token ${AUTH_TOKEN}` },
      });
      setPredictionsCount(res.data.count || 0); // <-- Fix: Use 'count' key
    } catch (error) {
      console.error("Error fetching predictions count:", error);
      setError("Failed to load predictions count.");
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setFormData({ username: "", email: "", password: "" });
    setShowModal(true);
  };

  const handleEdit = (u: any) => {
    setSelectedUser(u);
    setFormData({ username: u.username, email: u.email, password: "" });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/users/delete/${id}/`, {
        headers: { Authorization: `Token ${AUTH_TOKEN}` }
      });
      fetchUsers();
    } catch {
      setError("Could not delete user.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await axios.patch(`${BASE_URL}/users/update/${selectedUser.id}/`, formData, {
          headers: { Authorization: `Token ${AUTH_TOKEN}` }
        });
      } else {
        await axios.post(`${BASE_URL}/register/`, formData, {
          headers: { Authorization: `Token ${AUTH_TOKEN}` }
        });
      }
      setShowModal(false);
      fetchUsers();
    } catch {
      setError("Failed to save.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="success" variant="success" expand="lg" className="px-4 shadow">
        <Navbar.Brand className="fw-bold">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="fw-bold">
            <Nav.Link onClick={() => navigate("/home")} className="mx-2">Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/admin_panel")} className="mx-2">My Model</Nav.Link>
            <Nav.Link onClick={handleLogout} className="mx-2">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <Container fluid style={{ background: 'radial-gradient(circle, #4caf50, #2e7d32)', minHeight: '100vh', padding: '2rem', textDecoration: 'bold' }}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Card className="p-3 text-white" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <h6>Total Users</h6>
              <h2><Badge bg="info">{users.length}</Badge></h2>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="p-3 text-white" style={{ background: 'rgba(0,0,0,0.7)' }}>
              <h6>Total Predictions</h6>
              <h2><Badge bg="success">{predictionsCount}</Badge></h2>
            </Card>
          </Col>
        </Row>

        {/* User Table */}
        <Card className="p-3 text-white" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Users</h5>
            <Button variant="light" size="sm" onClick={handleCreate}>
              <PlusCircle className="me-1" /> Create User
            </Button>
          </div>
          <Table responsive striped hover variant="dark" className="align-middle text-center">
            <thead className="table-secondary text-dark">
              <tr><th>ID</th><th>Username</th><th>Email</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td className="text-white-50">{u.username}</td>
                  <td className="text-white-50">{u.email}</td>
                  <td>{u.is_active ? <Badge bg="success">Active</Badge> : <Badge bg="warning">Inactive</Badge>}</td>
                  <td>
                    <Button variant="outline-light" size="sm" className="me-2" onClick={() => handleEdit(u)}>
                      <PencilSquare />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(u.id)}>
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Edit User' : 'Create User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            {!selectedUser && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
            )}
            <Button type="submit" variant="light" className="w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Dashboard;
