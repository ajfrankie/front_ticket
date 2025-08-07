import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";
import "./ticket.css";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const Ticket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    status: "open",
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

  // console.log("Ticket form data:", formData); 
  
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
      // Get CSRF cookie for Laravel Sanctum
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // POST request to create ticket
      const payload = {
        ...formData,
        user_id: userId,
      };

      const res = await axios.post(
        "http://localhost:8000/api/admin/ticket/store",
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess("Ticket created successfully!");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setError(res.data.message || "Failed to create ticket.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket.");
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
          {}
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

          {/* Description */}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Ticket;
