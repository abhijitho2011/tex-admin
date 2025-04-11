import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full border p-2 mb-4" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 mb-4" />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </div>
  );
};

export default Login;
