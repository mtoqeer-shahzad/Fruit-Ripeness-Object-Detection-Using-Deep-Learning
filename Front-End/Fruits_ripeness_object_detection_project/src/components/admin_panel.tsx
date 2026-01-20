import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Badge, Image, Alert, Spinner, Card } from "react-bootstrap";
import { Trash, TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const ManageRecords: React.FC = () => {
  const [savedRecords, setSavedRecords] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedRecords();
  }, []);

  const fetchSavedRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/perdiction/predictions_get_all/`);
      setSavedRecords(response.data.predictions || []);
    } catch (err) {
      setError("Couldn't load saved records.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/perdiction/predictions/${id}/delete/`);
      fetchSavedRecords();
    } catch {
      setError("Delete failed.");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${BASE_URL}/perdiction/predictions/delete_all/`);
      fetchSavedRecords();
    } catch {
      setError("Couldn't delete all records.");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "undefined") return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleString(); // e.g. 4/29/2025, 11:45 AM
  };

  const formatConfidence = (confidence: string) => {
    const num = parseFloat(confidence.replace("%", ""));
    return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`;
  };

  return (
    <Card className="shadow-lg p-5 mt-4  text-light rounded-4 border-0 bg-success" >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">
          📄 Saved Predictions <Badge bg="info" className="ms-2">{savedRecords.length}</Badge>
        </h3>
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" className="px-3 fw-bold shadow-sm" onClick={() => navigate("/uploading-images")}>
            🔍 Make a Prediction
          </Button>
          {savedRecords.length > 0 && (
            <Button variant="outline-danger" size="sm" onClick={handleDeleteAll}>
              <TrashFill className="me-2" /> Delete All
            </Button>
          )}
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="info" />
        </div>
      ) : savedRecords.length === 0 ? (
        <Alert variant="info" className="text-center">No records found.</Alert>
      ) : (
        <Table responsive hover variant="dark" className="rounded overflow-hidden shadow-sm" style={{background:"#006A4E"}}>
          <thead className="text-green" style={{background:"#006A4E"}}>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Category</th>
              <th>Confidence</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedRecords.map((rec, index) => (
              <tr key={rec.id} className="align-middle">
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={rec.image_url}
                    alt="Fruit"
                    width={100}
                    height={100}
                    rounded
                    className="border border-2 shadow-sm"
                  />
                </td>
                <td className="text-capitalize fw-semibold">{rec.classification}</td>
                <td>
                  <Badge
                    bg={parseFloat(rec.confidence.replace("%", "")) >= 90 ? "success" : "warning"}
                    className="px-3 py-2 rounded-pill"
                  >
                    {formatConfidence(rec.confidence)}
                  </Badge>
                </td>
                <td className="text-white-50 small">{formatDate(rec.date)}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(rec.id)}>
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default ManageRecords;
