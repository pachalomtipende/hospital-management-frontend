import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReceptionistLogin from './pages/ReceptionistLogin';
import ReceptionistDashboard from './pages/ReceptionistDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/receptionist-login" element={<ReceptionistLogin />} />
        <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;