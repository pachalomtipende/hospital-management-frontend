import React, { useState } from 'react';
import './App.css';
import AIPriorityQueue from './components/AIPriorityQueue';
import SymptomIntakeModal from './components/SymptomIntakeModal';

function App() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  const handleIntakeSuccess = () => {
    setIsIntakeOpen(false);
    // Trigger queue refresh via the global exposed function (or a better way like context)
    if (window.refreshQueue) {
      window.refreshQueue();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <span className="sidebar-brand">CareConnect</span>
        </div>
        
        <div className="sidebar-nav">
          <a href="#" className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Priority Queue
          </a>
          <a href="#" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Doctor Hub
          </a>
          <a href="#" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Reception/Schedule
          </a>
          <a href="#" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Patient Intake
          </a>
        </div>

        <div className="sidebar-footer">
          <button className="nav-item" style={{width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0}}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">Emergency Info</div>
          <input type="text" className="search-bar" placeholder="Search patients..." />
          <div className="topbar-right flex items-center" style={{gap: '16px'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <div className="avatar" style={{width: '32px', height: '32px', background: '#d1d5db', cursor: 'pointer'}}>AD</div>
          </div>
        </div>

        <div className="content-area">
          <AIPriorityQueue onOpenIntake={() => setIsIntakeOpen(true)} />
        </div>
      </div>

      <SymptomIntakeModal 
        isOpen={isIntakeOpen} 
        onClose={() => setIsIntakeOpen(false)} 
        onSuccess={handleIntakeSuccess} 
      />
    </div>
  );
}

export default App;
