import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TrackCouriers from './pages/TrackCouriers';
import ApprovePartners from './pages/ApprovePartners';
import ManageHubs from './pages/ManageHubs';
import ManagePricing from './pages/ManagePricing';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/couriers" element={<TrackCouriers />} />
        <Route path="/partners" element={<ApprovePartners />} />
        <Route path="/hubs" element={<ManageHubs />} />
        <Route path="/pricing" element={<ManagePricing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
