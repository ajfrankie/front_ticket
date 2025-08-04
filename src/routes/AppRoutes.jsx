import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Home from "../pages/home/home";
import Ticket from "../pages/home/ticket";
import Track from "../pages/home/track";
import ViewTicket from "../pages/home/viewticket";
import UpdateTicket from "../pages/home/updateticket";
import EditTicket from "../pages/home/editticket";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/viewticket" element={<ViewTicket />} />
      <Route path="/updateticket" element={<UpdateTicket />} />
      <Route path="/ticket/edit/:ticketId" element={<EditTicket />} />

      <Route path="/track/:id" element={<Track />} />
    </Routes>
  );
};

export default AppRoutes;
