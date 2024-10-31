// import React, { useState } from 'react';

// const LoginForm = ({ handleLogin, closeModal }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make API request to backend
//       const response = await fetch('http://localhost:5001/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         handleLogin(); // Call the function to handle successful login
//         alert("Login successful!"); // Or use a more user-friendly notification
//         closeModal(); // Close the modal after login
//       } else {
//         setError(data.message || 'Invalid email or password.');
//       }
//     } catch (err) {
//       setError('Error connecting to the server. Please try again later.');
//     }
//   };

//   return (
//     <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//           Login to your account
//         </h1>
//         {error && <p className="text-red-500">{error}</p>}
//         <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//               required
//             />
//           </div>
//           <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ handleLogin, closeModal, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        handleLogin();
        alert("Login successful!");
        closeModal();
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch {
      setError('Error connecting to the server. Please try again later.');
    }
  };

  return (
    <div className={`w-full bg-white dark:bg-gray-800 rounded-lg shadow sm:max-w-md xl:p-0 ${darkMode ? 'dark' : ''}`}>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login to your account
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
