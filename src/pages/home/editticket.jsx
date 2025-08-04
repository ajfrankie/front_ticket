import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/nav";
import "./ticket.css";
import axios from "axios";

// Helper to read cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const EditTicket = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    status: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load ticket data on mount if ticketId exists
  useEffect(() => {
    if (ticketId) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/admin/ticket/show/${ticketId}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            const data = res.data.data;
            setFormData({
              subject: data.subject || "",
              priority: data.priority || "",
              status: data.status || "",
              description: data.description || "",
            });
            setError("");
          } else {
            setError("Failed to load ticket details.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load ticket details.");
          setLoading(false);
        });
    }
  }, [ticketId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const userId = getCookie("user_id");
    if (!userId) {
      setError("User not logged in or session expired.");
      setLoading(false);
      return;
    }

    try {
      // Get CSRF token for Laravel Sanctum if needed
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Update ticket via PUT request
      await axios.put(
        `http://localhost:8000/api/admin/ticket/update/${ticketId}`,
        { ...formData, user_id: userId },
        { withCredentials: true }
      );

      setSuccess("Ticket updated successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Operation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="navbar-space"></div>

      <div className="ticket-wrapper">
        <h2 className="ticket-title">Edit Ticket</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter description"
                required
                disabled={loading}
              />
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          {loading && <div className="loading-msg">Submitting...</div>}

          <div className="button-row">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/home")}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTicket;
