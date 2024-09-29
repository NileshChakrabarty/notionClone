


import React, { useState } from 'react';
// import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const SignupForm = ({ darkMode, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const { login, register } = useKindeAuth();

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if the user already exists in local storage
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      setError('');
      setTimeout(() => {
        onSignup(); // Redirect to the login form
      }, 2000); // Redirect after 2 seconds
      return;
    }

    // Store user data in local storage
    localStorage.setItem(username, JSON.stringify({ username, password }));

    // Automatically log the user in after signup
    localStorage.setItem('isLoggedIn', 'true');

    // Call the parent component's function to redirect or close the modal
    onSignup();
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="username" className="block mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md ${
          darkMode ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;