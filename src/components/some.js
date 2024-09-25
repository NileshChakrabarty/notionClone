import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaEllipsisH } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import RichTextEditor from './RichTextEditor';

const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

const Some = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameInput, setRenameInput] = useState("");

  const newNoteInputRef = useRef(null);
  const noteContentRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const user = {
    firstName: "Hi!",
    lastName: "User",
  };
  
  const initials = getInitials(user.firstName, user.lastName);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNewNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        title: newNoteTitle,
        content: "",
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setIsAddingNote(false);
      setSelectedNoteIndex(notes.length);
      setNoteContent("");
    }
  };

  const openNote = (index) => {
    setSelectedNoteIndex(index);
    setNoteContent(notes[index].content);
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
      noteContentRef.current.getEditor().focus(); // Ensure the Quill editor gets focus
    }
  }, [selectedNoteIndex]);

  const cancelAddNote = () => {
    setNewNoteTitle("");
    setIsAddingNote(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 flex flex-col shadow-md">
        {/* User Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
              <span className="text-lg font-bold">{initials}</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">
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
          onClick={() => navigate('/')} // Navigate to Home page
        >
          Home
        </button>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <div
                key={index}
                className="relative flex justify-between items-center p-3 rounded-md hover:bg-gray-200 cursor-pointer"
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
                      if (e.key === "Enter") {
                        handleRename(index);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-700">
                    {note.title}
                  </span>
                )}
                <button
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(index);
                  }}
                >
                  <FaEllipsisH />
                </button>

                {isMenuOpen === index && (
                  <div className="absolute right-0 mt-1 w-28 bg-white shadow-lg rounded-md z-10">
                    <button
                      className="block w-full text-left p-2 hover:bg-gray-100 text-gray-600 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        startRename(index);
                      }}
                    >
                      Rename
                    </button>
                    <button
                      className="block w-full text-left p-2 hover:bg-gray-100 text-gray-600 focus:outline-none"
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
                className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-md"
                onClick={cancelAddNote}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Notes Taking Section */}
      <div className="flex-1 p-6 bg-gray-50">
        {selectedNoteIndex !== null ? (
          <RichTextEditor
            content={noteContent}
            onChange={updateNoteContent}
            ref={noteContentRef}
          />
        ) : (
          <p className="text-sm text-gray-600">
            Select a note to start editing.
          </p>
        )}
      </div>
    </div>
  );
};

export default Some;



// import React, { useState, useRef, useEffect } from "react";
// import { FaPlus, FaEllipsisH } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import RichTextEditor from './RichTextEditor';

// const getInitials = (firstName, lastName) => {
//   return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
// };

// const Some = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNoteTitle, setNewNoteTitle] = useState("");
//   const [isAddingNote, setIsAddingNote] = useState(false);
//   const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [noteContent, setNoteContent] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(null);
//   const [isRenaming, setIsRenaming] = useState(null);
//   const [renameInput, setRenameInput] = useState("");

//   const newNoteInputRef = useRef(null);
//   const noteContentRef = useRef(null);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const user = {
//     firstName: "Nilesh",
//     lastName: "Chakrabarty",
//   };
  
//   const initials = getInitials(user.firstName, user.lastName);

//   useEffect(() => {
//     const storedNotes = JSON.parse(localStorage.getItem("notes"));
//     if (storedNotes) {
//       setNotes(storedNotes);
//     }
//   }, []);

//   useEffect(() => {
//     if (notes.length > 0) {
//       localStorage.setItem("notes", JSON.stringify(notes));
//     }
//   }, [notes]);

//   const filteredNotes = notes.filter((note) =>
//     note.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const addNewNote = () => {
//     if (newNoteTitle.trim()) {
//       const newNote = {
//         title: newNoteTitle,
//         content: "",
//       };
//       setNotes([...notes, newNote]);
//       setNewNoteTitle("");
//       setIsAddingNote(false);
//       setSelectedNoteIndex(notes.length); // Update to the index of the newly added note
//       setNoteContent("");
//     }
//   };

//   const openNote = (index) => {
//     setSelectedNoteIndex(index);
//     setNoteContent(notes[index].content);
//   };

//   const updateNoteContent = (content) => {
//     const updatedNotes = [...notes];
//     updatedNotes[selectedNoteIndex].content = content;
//     setNotes(updatedNotes);
//     setNoteContent(content);
//   };

//   const handleRename = (index) => {
//     const updatedNotes = [...notes];
//     updatedNotes[index].title = renameInput;
//     setNotes(updatedNotes);
//     setIsRenaming(null);
//     setIsMenuOpen(null);
//   };

//   const deleteNote = (index) => {
//     const updatedNotes = notes.filter((_, i) => i !== index);
//     setNotes(updatedNotes);
//     setSelectedNoteIndex(null);
//     setIsMenuOpen(null);
//   };

//   const startRename = (index) => {
//     setRenameInput(notes[index].title);
//     setIsRenaming(index);
//     setIsMenuOpen(null);
//   };

//   useEffect(() => {
//     if (isAddingNote && newNoteInputRef.current) {
//       newNoteInputRef.current.focus();
//     }
//   }, [isAddingNote]);

//   useEffect(() => {
//     if (selectedNoteIndex !== null && noteContentRef.current) {
//       noteContentRef.current.getEditor().focus(); // Ensure the Quill editor gets focus
//     }
//   }, [selectedNoteIndex]);

//   const cancelAddNote = () => {
//     setNewNoteTitle("");
//     setIsAddingNote(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white p-4 flex flex-col shadow-md">
//         {/* User Info */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
//               <span className="text-lg font-bold">{initials}</span>
//             </div>
//             <span className="text-sm font-semibold text-gray-700">
//               {user.firstName} {user.lastName}
//             </span>
//           </div>
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:outline-none"
//             onClick={() => setIsAddingNote((prev) => !prev)}
//           >
//             <FaPlus />
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search notes..."
//             className="w-full p-2 rounded-md bg-gray-200 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Home Button */}
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mb-4"
//           onClick={() => navigate('/')} // Navigate to Home page
//         >
//           Home
//         </button>

//         {/* Notes List */}
//         <div className="flex-1 overflow-y-auto space-y-2">
//           {filteredNotes.length > 0 ? (
//             filteredNotes.map((note, index) => (
//               <div
//                 key={index}
//                 className={`relative flex justify-between items-center p-3 rounded-md hover:bg-gray-200 cursor-pointer ${
//                   selectedNoteIndex === index ? 'bg-blue-100' : ''
//                 }`}
//                 onClick={() => openNote(index)}
//               >
//                 {isRenaming === index ? (
//                   <input
//                     type="text"
//                     className="p-2 w-full rounded-md text-black bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     value={renameInput}
//                     onChange={(e) => setRenameInput(e.target.value)}
//                     onBlur={() => handleRename(index)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         handleRename(index);
//                       }
//                     }}
//                     autoFocus
//                   />
//                 ) : (
//                   <span className="text-sm font-medium text-gray-700">
//                     {note.title}
//                   </span>
//                 )}
//                 <button
//                   className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md focus:outline-none"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setIsMenuOpen(index);
//                   }}
//                 >
//                   <FaEllipsisH />
//                 </button>

//                 {isMenuOpen === index && (
//                   <div className="absolute right-0 mt-1 w-28 bg-white shadow-lg rounded-md z-10">
//                     <button
//                       className="block w-full text-left p-2 hover:bg-gray-100 text-gray-600 focus:outline-none"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         startRename(index);
//                       }}
//                     >
//                       Rename
//                     </button>
//                     <button
//                       className="block w-full text-left p-2 hover:bg-gray-100 text-gray-600 focus:outline-none"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         deleteNote(index);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No notes found.</p>
//           )}
//         </div>

//         {/* Add New Note */}
//         {isAddingNote && (
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Enter note title..."
//               className="w-full p-2 rounded-md bg-gray-200 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               value={newNoteTitle}
//               onChange={(e) => setNewNoteTitle(e.target.value)}
//               ref={newNoteInputRef}
//             />
//             <div className="flex space-x-2 mt-2">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md"
//                 onClick={addNewNote}
//               >
//                 Add Note
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-md"
//                 onClick={cancelAddNote}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Notes Taking Area */}
//       <div className="flex-1 p-4">
//         {selectedNoteIndex !== null && (
//           <div className="h-full">
//             <RichTextEditor
//               value={noteContent}
//               onChange={updateNoteContent}
//               ref={noteContentRef}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Some;

