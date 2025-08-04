import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/nav";
import "./track.css";

const Track = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Mock data - Replace with API calls
    setTicket({
      id,
      subject: "Unable to login",
      status: "Open",
      priority: "High",
      description: "I can't log in to the dashboard.",
    });

    setMessages([
      { id: 1, ticket_id: id, user_id: 1, message: "Hello, I need help.", created_at: "2025-07-28 10:00" },
      { id: 2, ticket_id: id, user_id: 0, message: "We are looking into it.", created_at: "2025-07-28 10:30" },
    ]);
  }, [id]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      id: messages.length + 1,
      ticket_id: id,
      user_id: 1, // Assuming 1 = current user
      message: newMessage,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");

    // TODO: Send message to backend
  };

  return (
    <>
      <Nav />
      <div className="navbar-space"></div>

      <div className="track-container">
        {ticket && (
          <div className="ticket-details">
            <h2>Ticket #{ticket.id}</h2>
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
          </div>
        )}

        <div className="chat-container">
          <h3>Conversation</h3>
          <div className="message-thread">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.user_id === 1 ? "user" : "admin"}`}
              >
                <div className="msg-content">{msg.message}</div>
                <div className="msg-time">{new Date(msg.created_at).toLocaleString()}</div>
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
