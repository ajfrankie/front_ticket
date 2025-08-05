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
      .get("http://127.0.0.1:8000/api/admin/ticket/index", {
        withCredentials: true,
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

  return (
    <>
      <Nav />
      <div className="navbar-space"></div>

      <main className="home-container">
        <h1>Welcome to the Ticket System</h1>
        <div className="button-group">
          <button className="create-ticket-btn" onClick={() => navigate("/ticket")}>
            Create Ticket
          </button>

          <button className="create-ticket-btn" onClick={() => navigate("/viewticket")}>
            View Tickets
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
