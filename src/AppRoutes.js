import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Some from './components/some';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/some" element={
        <div className="min-h-screen bg-gray-900 text-white">
            <Some />
        </div>
      }/>
    </Routes>
  </Router>
);

export default AppRoutes;

