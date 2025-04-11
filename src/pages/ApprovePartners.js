import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovePartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/partners/pending');
      setPartners(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch pending partners');
    }
    setLoading(false);
  };

  const handleDecision = async (id, decision) => {
    try {
      await axios.put(`http://localhost:5000/api/partners/${id}/decision`, {
        approve: decision === 'approve',
      });
      alert(`Partner ${decision}d`);
      fetchPartners(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Error updating partner status');
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Pending Pickup Partner Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : partners.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {partners.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg mb-1">{p.name} ({p.phone})</h3>
              <p className="text-sm text-gray-600 mb-2">Status: {p.status}</p>

              <div className="grid grid-cols-2 gap-4 text-sm text-blue-700 mb-4">
                <a href={p.aadhar} target="_blank" rel="noreferrer">Aadhar</a>
                <a href={p.driving_license} target="_blank" rel="noreferrer">Driving License</a>
                <a href={p.vehicle_rc} target="_blank" rel="noreferrer">RC</a>
                <a href={p.insurance} target="_blank" rel="noreferrer">Insurance</a>
                <a href={p.police_clearance} target="_blank" rel="noreferrer">Police Clearance</a>
                <a href={p.photo} target="_blank" rel="noreferrer">Photo</a>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleDecision(p.id, 'approve')}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(p.id, 'reject')}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovePartners;
