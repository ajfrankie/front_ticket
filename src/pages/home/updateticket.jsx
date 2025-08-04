import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("admin/ticket/index", {
        withCredentials: true, // Important for Sanctum cookies
      })
      .then((res) => {
        if (res.data.success) {
          setTickets(res.data.data);
        } else {
          console.warn("Unexpected response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goToTrackPage = (id) => {
    navigate(`/track/${id}`);
  };

  const goToUpdatePage = (id) => {
    navigate(`/ticket/edit/${id}`);
  };

  return (
    <>
      <Nav />
      <div className="navbar-space"></div>

      <main className="home-container">
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="ticket-card-container">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <h3>{ticket.subject}</h3>
                <p><strong>Priority:</strong> {ticket.priority}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p className="description">{ticket.description}</p>

                <button
                  className="track-btn"
                  onClick={() => goToTrackPage(ticket.id)}
                >
                  Track
                </button>

                <button
                  className="update-btn"
                  onClick={() => goToUpdatePage(ticket.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
