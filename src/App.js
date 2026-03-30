import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReceptionistLogin from './pages/ReceptionistLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/receptionist-login" element={<ReceptionistLogin />} />
      </Routes>
    </Router>
  );
}

export default App;