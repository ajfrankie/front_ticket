import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav";
import "./ticket.css";
import axios from "axios";

axios.defaults.withCredentials = true; // send cookies with requests

const Ticket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    status: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    try {
      // Fetch CSRF cookie before sending POST request
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Now send the actual POST request with authenticated session
      await axios.post("http://127.0.0.1:8000/api/admin/ticket/store", {
        subject: formData.subject,
        priority: formData.priority,
        status: formData.status,
        description: formData.description,
      });

      setSuccess("Ticket created successfully!");
      // Optional: navigate("/tickets");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ticket creation failed. Please try again."
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
        <h2 className="ticket-title">Create Ticket</h2>

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
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
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
              ></textarea>
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          {loading && <div className="loading-msg">Submitting...</div>}

          <div className="button-row">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Ticket;
