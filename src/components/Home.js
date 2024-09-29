

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image1.png';
import LoginForm from './LoginForm'; 
import SignupForm from './SignupForm'; 
import Some from './some';
import Navbar from './navbar';
const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const openModal = (formType) => {
    setIsLogin(formType === 'login');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Save status to localStorage
    setIsLoggedIn(true);
    navigate('/some'); // Redirect to Some component
    closeModal(); // Close the modal
  };

  const handleSignup = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Save status to localStorage
    setIsLoggedIn(true);
    navigate('/some'); // Redirect to Some component after signup
    closeModal(); // Close the modal
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to Home component
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Pass state handlers and values as props to Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openModal={openModal}
      />

      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt="Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Your Plans Unified.
            <br />
            Welcome to <span className="underline">YourNote</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            NotesMaker is the connected workspace where better, faster work happens.
          </p>
          <button
            className="bg-white text-black dark:bg-black dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            onClick={() => openModal('signup')}
          >
            Sign Up For Free →
          </button>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              {isLogin ? 'Log In' : 'Sign Up'}
            </h2>
            {isLogin ? (
              <LoginForm darkMode={darkMode} onLogin={handleLogin} /> 
            ) : (
              <SignupForm darkMode={darkMode} onSignup={handleSignup} />
            )}
            <p className="mt-4 text-sm text-center text-white">
              {isLogin ? "" : "Already have an account?"}{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

