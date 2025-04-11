import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defaultPricing = [
  { mode: 'express', vehicle: 'bike', rate: 15 },
  { mode: 'express', vehicle: 'mini_truck', rate: 22.5 },
  { mode: 'express', vehicle: 'truck', rate: 30 },
  { mode: 'standard', vehicle: 'bike', rate: 10 },
  { mode: 'standard', vehicle: 'mini_truck', rate: 15 },
  { mode: 'standard', vehicle: 'truck', rate: 20 },
];

const ManagePricing = () => {
  const [pricing, setPricing] = useState(defaultPricing);
  const [loading, setLoading] = useState(false);

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/pricing');
      setPricing(res.data || defaultPricing);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch pricing');
    }
    setLoading(false);
  };

  const updateRate = (index, newRate) => {
    const updated = [...pricing];
    updated[index].rate = newRate;
    setPricing(updated);
  };

  const savePricing = async () => {
    try {
      await axios.put('http://localhost:5000/api/pricing', { pricing });
      alert('Pricing updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update pricing');
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Courier Pricing</h2>

      <table className="w-full table-auto border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Mode</th>
            <th className="p-2 border">Vehicle</th>
            <th className="p-2 border">Rate (₹/kg)</th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((item, idx) => (
            <tr key={idx}>
              <td className="p-2 border text-center">{item.mode}</td>
              <td className="p-2 border text-center">{item.vehicle}</td>
              <td className="p-2 border text-center">
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateRate(idx, Number(e.target.value))}
                  className="border p-1 rounded w-24 text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={savePricing}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ManagePricing;
