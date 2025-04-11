import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TrackCouriers from "./pages/TrackCouriers";
import ApprovePartners from "./pages/ApprovePartners";
import ManageHubs from "./pages/ManageHubs";
import ManagePricing from "./pages/ManagePricing";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = localStorage.getItem("adminToken");

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/track" element={isLoggedIn ? <TrackCouriers /> : <Navigate to="/login" />} />
        <Route path="/partners" element={isLoggedIn ? <ApprovePartners /> : <Navigate to="/login" />} />
        <Route path="/hubs" element={isLoggedIn ? <ManageHubs /> : <Navigate to="/login" />} />
        <Route path="/pricing" element={isLoggedIn ? <ManagePricing /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
