import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorDashboard from './pages/DoctorDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/doctor" replace />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
