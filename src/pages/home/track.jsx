import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/nav";
import axios from "axios";
import "./track.css";

const Track = () => {
  const { id } = useParams(); // ticket_id from route
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user info (for user_id)
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .then((res) => {
        setUserId(res.data.id); // adjust if your response structure is different
      })
      .catch(() => setError("Failed to load user info."));
  }, []);

  // Fetch ticket details
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/admin/ticket/show/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setTicket(res.data.data);
        } else {
          setError("Failed to load ticket.");
        }
      })
      .catch(() => setError("Error loading ticket."));
  }, [id]);

  // Fetch chat messages
  const fetchMessages = () => {
    axios
      .post(
        "http://localhost:8000/api/admin/replay/show",
        { ticket_id: id },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          setMessages(res.data.data);
        } else {
          setError("Failed to load chat messages.");
        }
      })
      .catch(() => setError("Error loading chat messages."));
  };

  useEffect(() => {
    if (id) fetchMessages();
  }, [id]);

  // Handle sending a new reply
  const handleSend = () => {
    if (!newMessage.trim() || !userId) return;

    axios
      .post(
        "http://localhost:8000/api/admin/replay/store",
        {
          ticket_id: id,
          user_id: userId,
          message: newMessage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          setNewMessage("");
          fetchMessages();
        } else {
          setError("Failed to send message.");
        }
      })
      .catch(() => setError("Error sending message."));
  };

  return (
    <>
      <Nav />
      <div className="navbar-space"></div>

      <div className="track-container">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {ticket && (
          <div className="ticket-details">
            <h2>Ticket #{ticket.id}</h2>
            <p>
              <strong>Subject:</strong> {ticket.subject}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status}
            </p>
            <p>
              <strong>Priority:</strong> {ticket.priority}
            </p>
            <p>
              <strong>Description:</strong> {ticket.description}
            </p>
          </div>
        )}

        <div className="chat-container">
          <h3>Conversation</h3>
          <div className="message-thread">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.user_id === ticket?.user_id ? "user" : "admin"
                }`}
              >
                <div className="msg-content">
                  <strong>{msg.user?.name || "User"}:</strong> {msg.message}
                </div>
                <div className="msg-time">
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="message-form">
            <textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
