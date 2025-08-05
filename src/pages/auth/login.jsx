import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/nav";
import "./auth.css";

// Optional: You can uncomment this if you want axios to use a base URL
// axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      console.log(response, "response from login API");

      const { token, user_id, role } = response.data;

      // Save token
      localStorage.setItem("token", token);

      // Save user info for role-based Nav
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user_id,
          role: role,
        })
      );

      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Nav />
      <div className="wrapper">
        <div className="title">
          <span>Login Form</span>
        </div>
        <form onSubmit={handleLogin}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="row button">
            <input type="submit" value="Login" />
          </div>

          <div className="signup-link">
            Not a member? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
