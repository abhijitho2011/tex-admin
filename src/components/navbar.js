import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Tex Admin</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/couriers" className="hover:underline">Couriers</Link>
        <Link to="/partners" className="hover:underline">Partners</Link>
        <Link to="/hubs" className="hover:underline">Hubs</Link>
        <Link to="/pricing" className="hover:underline">Pricing</Link>
        <Link to="/login" className="hover:underline">Logout</Link>
      </nav>
    </div>
  );
};

export default Navbar;
