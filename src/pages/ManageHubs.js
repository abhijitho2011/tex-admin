import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageHubs = () => {
  const [hubs, setHubs] = useState([]);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [isStateHub, setIsStateHub] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchHubs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/hubs');
      setHubs(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Error fetching hubs');
    }
    setLoading(false);
  };

  const addHub = async () => {
    if (!name || !district || !state) return alert('Please fill all fields');

    try {
      await axios.post('http://localhost:5000/api/hubs', {
        name,
        district,
        state,
        is_state_hub: isStateHub,
      });

      setName('');
      setDistrict('');
      setState('');
      setIsStateHub(false);
      fetchHubs();
    } catch (err) {
      console.error(err);
      alert('Error adding hub');
    }
  };

  const deleteHub = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hub?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/hubs/${id}`);
      fetchHubs();
    } catch (err) {
      console.error(err);
      alert('Error deleting hub');
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Manage Hubs</h2>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Hub Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isStateHub}
            onChange={() => setIsStateHub(!isStateHub)}
          />
          <span>Mark as State Hub</span>
        </label>
      </div>

      <button
        onClick={addHub}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Hub
      </button>

      <hr className="my-6" />

      {loading ? (
        <p>Loading hubs...</p>
      ) : (
        <div className="space-y-4">
          {hubs.map((hub) => (
            <div key={hub.id} className="border p-4 rounded shadow-sm bg-gray-50 flex justify-between">
              <div>
                <h3 className="font-bold text-lg">{hub.name}</h3>
                <p className="text-sm text-gray-600">
                  {hub.district}, {hub.state} {hub.is_state_hub ? '(State Hub)' : ''}
                </p>
              </div>
              <button
                onClick={() => deleteHub(hub.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageHubs;
