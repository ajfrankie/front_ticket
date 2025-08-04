import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/nav";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      //   withCredentials: true,
      // });

      // Step 2: Send registration request
      await axios.post(
        "register",
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          dob,
        },
      )
      .then(response => {
        console.log('Response:', response.data);
        // Handle successful response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });;


      // need to put this inside the if function
      // setSuccess("Registration successful!");
      // setName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
      // setDob("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="wrapper">
        <div className="title">
          <span>Register</span>
        </div>
        <form onSubmit={handleRegister}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="row">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="row">
            <i className="fas fa-calendar-alt"></i>
            <input
              type="date"
              name="dob"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: "red", fontSize: "15px", marginTop: "10px" }}>
              {error}
            </div>
          )}

          {success && (
            <div
              style={{ color: "green", fontSize: "15px", marginTop: "10px" }}
            >
              {success}
            </div>
          )}

          <div className="row button">
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="signup-link">
            Already a member? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
