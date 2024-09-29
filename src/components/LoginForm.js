

import React, { useState } from 'react';

const LoginForm = ({ darkMode, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '';
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin(); // Call the login handler passed from Home.js
      }}
      className={`flex flex-col space-y-4 ${darkMode ? 'text-white' : 'text-black'}`}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`p-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'}`}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`p-2 rounded border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'}`}
        required
      />
      <button
        type="submit"
        disabled={!isFormValid()} // Disable button based on form validity
        className={`bg-blue-600 text-white px-4 py-2 rounded ${!isFormValid() && 'opacity-50 cursor-not-allowed'} transition duration-300`}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
