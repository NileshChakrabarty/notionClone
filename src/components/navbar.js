import React from 'react';

const Navbar = ({ darkMode, toggleDarkMode, isLoggedIn, handleLogout, openModal }) => {
  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-5">
      <div className="text-xl md:text-2xl font-bold">YourNote</div>
      <div className="flex gap-2 md:gap-4 items-center">
        {isLoggedIn ? (
          <button
            className="bg-white text-black dark:bg-black dark:text-white px-3 md:px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            onClick={handleLogout}
          >
            Log out
          </button>
        ) : (
          <button
            className="bg-white text-black dark:bg-black dark:text-white px-3 md:px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            onClick={() => openModal('signup')}
          >
            Sign Up
          </button>
        )}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <span role="img" aria-label="Sun">
              🌞
            </span>
          ) : (
            <span role="img" aria-label="Moon">
              🌙
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
