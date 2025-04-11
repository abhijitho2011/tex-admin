import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackCouriers = () => {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourierId, setSelectedCourierId] = useState(null);
  const [logs, setLogs] = useState([]);

  const fetchCouriers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/couriers/all');
      setCouriers(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch couriers');
    }
  };

  const fetchLogs = async (courierId) => {
    setSelectedCourierId(courierId);
    try {
      const res = await axios.get(`http://localhost:5000/api/track/${courierId}`);
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch logs');
    }
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">All Courier Movements</h2>

      {couriers.length === 0 ? (
        <p>No courier records found.</p>
      ) : (
        <div className="space-y-4">
          {couriers.map((c) => (
            <div
              key={c.id}
              className="border p-4 rounded shadow bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg mb-1">Courier ID: {c.id}</h3>
                  <p className="text-sm">Type: {c.type} | Vehicle: {c.vehicle}</p>
                  <p className="text-sm">Status: <span className="font-semibold">{c.current_status}</span></p>
                  <p className="text-sm">From: {c.pickup_address}</p>
                  <p className="text-sm">To: {c.delivery_address}</p>
                </div>

                <button
                  onClick={() => fetchLogs(c.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View Logs
                </button>
              </div>

              {selectedCourierId === c.id && logs.length > 0 && (
                <div className="mt-4 p-4 border rounded bg-white">
                  <h4 className="font-semibold text-md mb-2">Tracking Logs:</h4>
                  <ul className="space-y-2 text-sm">
                    {logs.map((log, idx) => (
                      <li key={idx} className="border-b pb-2">
                        <p><strong>Location:</strong> {log.location}</p>
                        <p><strong>Status:</strong> {log.status}</p>
                        <p className="text-gray-500"><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackCouriers;
