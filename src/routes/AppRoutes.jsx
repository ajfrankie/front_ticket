import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Home from "../pages/home/home";
import Ticket from "../pages/home/ticket";
import Track from "../pages/home/track";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/track" element={<Track />} />
    </Routes>
  );
};

export default AppRoutes;
