import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReceptionistLogin from './pages/ReceptionistLogin';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import PatientDashboard from './pages/PatientDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/receptionist-login" element={<ReceptionistLogin />} />
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
        {/* New UI Redirects */}
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;