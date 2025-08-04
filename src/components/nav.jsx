import { Link } from "react-router-dom";
import React from "react";
import "./nav.css";

const Nav = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Optional: Call Laravel logout endpoint if needed
    localStorage.removeItem("user");
    window.location.href = "/home";
  };

  return (
    <>
      <nav>
        <div className="navbar">
          <ul className="menu">
            <li>
              <Link to="/home">Home</Link>
            </li>

            <li>
              <Link to="/updateticket">Update Ticket</Link>
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
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}

            <li>
              <Link to="/">Logout</Link>
            </li>
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
