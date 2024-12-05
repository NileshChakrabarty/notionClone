// SignupForm.js
import React, { useState } from 'react';

const SignupForm = ({ handleSignup, closeModal, darkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://notion-clone-srever.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSignup();
        alert('Signup completed successfully!');
        closeModal();
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Error connecting to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full bg-white dark:bg-gray-800 rounded-lg shadow sm:max-w-md xl:p-0 ${darkMode ? 'dark' : ''}`}>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border rounded-lg p-2.5 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border rounded-lg p-2.5 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border rounded-lg p-2.5 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-50 border rounded-lg p-2.5 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2.5 rounded-lg ${isLoading ? 'cursor-not-allowed bg-blue-300' : 'hover:bg-blue-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create an account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
