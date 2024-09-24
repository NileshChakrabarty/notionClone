import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Some from './components/some';
import SignIn from './components/Sign'; // Import SignIn component
import SignUp from './components/SignUp'; // Import SignUp component

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/some" element={
        <div className="min-h-screen bg-gray-900 text-white">
          <Some />
        </div>
      }/>
      <Route path="/sign-in" element={<SignIn />} /> {/* Sign In Route */}
      <Route path="/sign-up" element={<SignUp />} /> {/* Sign Up Route */}
    </Routes>
  </Router>
);

export default AppRoutes;
