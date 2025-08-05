import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./nav.css";

const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On mount, load user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      // Call logout endpoint if implemented
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Logout failed, continuing anyway.");
    }

    // Clear localStorage and redirect
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  };

  return (
    <>
      <nav>
        <div className="navbar">
          <ul className="menu">
            <li>
              <Link to="/home">Home</Link>
            </li>

            {user?.role === "admin" && (
              <li>
                <Link to="/updateticket">Update Ticket</Link>
              </li>
            )}

            {!user ? (
              <>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li>
                <span
                  className="nav-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="button">
        <a href="#Home">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </>
  );
};

export default Nav;
