import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/auth';

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    cellNumber: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await register(user);
    if (success) {
      navigate('/');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Register</h2>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="cellNumber" className="block mb-1">Cell Number</label>
          <input
            type="tel"
            id="cellNumber"
            name="cellNumber"
            value={user.cellNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;