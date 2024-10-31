import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './RichTextEditor';
import { FaPlus, FaEllipsisH, FaBars } from 'react-icons/fa';
import Navbar from './Navbar';
import SignupForm from './SignupForm'; // Import your SignupForm component
import LoginForm from './LoginForm'; // Import your LoginForm component
const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

export default function Some() {
  const [darkMode, setDarkMode] = useState(false); // Added dark mode state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added isLoggedIn state
  const [isModalOpen, setIsModalOpen] = useState(false); // Added modal state
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameInput, setRenameInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const newNoteInputRef = useRef(null);
  const noteContentRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const user = {
    firstName: 'Hi!',
    lastName: 'User',
  };

  const initials = getInitials(user.firstName, user.lastName);

  // Load dark mode preference and login status from localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);

    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNewNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        title: newNoteTitle,
        content: '',
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle('');
      setIsAddingNote(false);
      setSelectedNoteIndex(notes.length);
      setNoteContent('');
    }
  };

  const openNote = (index) => {
    setSelectedNoteIndex(index);
    setNoteContent(notes[index].content);
    setIsSidebarOpen(false);
  };

  const updateNoteContent = (content) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNoteIndex].content = content;
    setNotes(updatedNotes);
    setNoteContent(content);
  };

  const handleRename = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].title = renameInput;
    setNotes(updatedNotes);
    setIsRenaming(null);
    setIsMenuOpen(null);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setSelectedNoteIndex(null);
    setIsMenuOpen(null);
  };

  const startRename = (index) => {
    setRenameInput(notes[index].title);
    setIsRenaming(index);
    setIsMenuOpen(null);
  };

  useEffect(() => {
    if (isAddingNote && newNoteInputRef.current) {
      newNoteInputRef.current.focus();
    }
  }, [isAddingNote]);

  useEffect(() => {
    if (selectedNoteIndex !== null && noteContentRef.current) {
      noteContentRef.current.getEditor().focus();
    }
  }, [selectedNoteIndex]);

  const cancelAddNote = () => {
    setNewNoteTitle('');
    setIsAddingNote(false);
  };

  // Navbar handlers
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const openModal = (formType) => {
    setIsModalOpen(true);
    console.log(`Opening ${formType} modal`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home or login page
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

  


  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        openModal={openModal}
      />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Hamburger Menu */}
        <button
          className="lg:hidden fixed top-4 left-4 z-20 bg-blue-500 text-white p-2 rounded-md"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <FaBars />
        </button>

        {/* Sidebar */}
        <div
          className={`lg:w-64 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-4 flex flex-col shadow-md fixed inset-y-0 left-0 z-10 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          {/* User Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                <span className="text-lg font-bold">{initials}</span>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:outline-none"
              onClick={() => setIsAddingNote((prev) => !prev)}
            >
              <FaPlus />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full p-2 rounded-md bg-gray-200 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Home Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mb-4 focus:outline-none"
            onClick={() => navigate('/')}
          >
            Home
          </button>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <div
                  key={index}
                  className={`relative flex justify-between items-center p-3 rounded-md cursor-pointer ${
                    selectedNoteIndex === index
                      ? darkMode
                        ? 'bg-gray-700'
                        : 'bg-blue-200'
                      : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => openNote(index)}
                >
                  {isRenaming === index ? (
                    <input
                      type="text"
                      className="p-2 w-full rounded-md text-black bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      onBlur={() => handleRename(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleRename(index);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {note.title}
                    </span>
                  )}
                  <button
                    className={`p-2 rounded-md ${
                      darkMode
                        ? 'bg-gray-600 hover:bg-gray-500'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } focus:outline-none`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(index);
                    }}
                  >
                    <FaEllipsisH />
                  </button>

                  {isMenuOpen === index && (
                    <div
                      className={`absolute right-0 mt-1 w-28 ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      } shadow-lg rounded-md z-10`}
                    >
                      <button
                        className={`block w-full text-left p-2 ${
                          darkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        } focus:outline-none`}
                        onClick={(e) => {
                          e.stopPropagation();
                          startRename(index);
                        }}
                      >
                        Rename
                      </button>
                      <button
                        className={`block w-full text-left p-2 ${
                          darkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        } focus:outline-none`}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notes found.</p>
            )}
          </div>

          {/* Add New Note */}
          {isAddingNote && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter note title..."
                className="w-full p-2 rounded-md bg-gray-200 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                ref={newNoteInputRef}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md"
                  onClick={addNewNote}
                >
                  Add Note
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black w-full py-2 rounded-md"
                  onClick={cancelAddNote}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div
          className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? '' : 'ml-0 lg:ml-60'
          }`}
        >
          {selectedNoteIndex !== null ? (
            <RichTextEditor
              initialContent={noteContent}
              onContentChange={updateNoteContent}
              ref={noteContentRef}
            />
          ) : (
            <p
              className={`text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Select a note to start editing.
            </p>
          )}
        </div>
        {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              {isLogin ? 'Log In' : 'Sign Up'}
            </h2>
            {isLogin ? (
              <LoginForm darkMode={darkMode} onLogin={handleLogin} />
            ) : (
              <SignupForm darkMode={darkMode} onSignup={handleSignup} />
            )}
            <p className="mt-4 text-sm text-center text-black dark:text-white">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
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
    </div>
  );
}