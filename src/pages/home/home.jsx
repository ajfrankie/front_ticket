import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  // Mock ticket list — replace with actual API call
  useEffect(() => {
    const mockTickets = [
      {
        id: 1,
        subject: "Login issue",
        priority: "High",
        status: "Open",
        description: "Can't login to dashboard",
      },
      {
        id: 2,
        subject: "Page crash",
        priority: "Medium",
        status: "In Progress",
        description: "Settings page crashes",
      },
    ];
    setTickets(mockTickets);
  }, []);

  const goToTrackPage = (id) => {
    navigate(`/track/${id}`);
  };

  return (
    <>
      <Nav />
      {/* Space to prevent content hiding behind fixed navbar */}
      <div className="navbar-space"></div>

      <main className="home-container">
        <h1>Welcome to the Ticket System</h1>
        <button className="create-ticket-btn" onClick={() => navigate("/ticket")}>
          Create Ticket
        </button>

        <div className="ticket-card-container">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.subject}</h3>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p className="description">{ticket.description}</p>
              <button className="track-btn" onClick={() => goToTrackPage(ticket.id)}>
                Track
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
