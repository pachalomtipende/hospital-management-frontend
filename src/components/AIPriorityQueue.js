import React, { useState, useEffect } from 'react';
import { fetchQueue, deleteAppointment, clearAllAppointments } from '../api';
import './AIPriorityQueue.css';

const AIPriorityQueue = ({ onOpenIntake }) => {
  const [queue, setQueue] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadQueue = async () => {
    try {
      const data = await fetchQueue();
      setQueue(data);
      if (data.length > 0 && !selectedPatient) {
        setSelectedPatient(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, confirmFirst = false) => {
    if (confirmFirst && !window.confirm("Are you sure you want to remove this patient from the queue?")) return;
    try {
      await deleteAppointment(id);
      loadQueue();
      if (selectedPatient?.id === id) setSelectedPatient(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("WARNING: This will permanently delete ALL patients from the test queue. Are you sure?")) return;
    try {
      await clearAllAppointments();
      loadQueue();
      setSelectedPatient(null);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadQueue();
    // Poll every 10 seconds
    const interval = setInterval(loadQueue, 10000);
    return () => clearInterval(interval);
  }, []);

  // Expose loadQueue to parent so it can be refreshed after a Walk-in
  useEffect(() => {
    window.refreshQueue = loadQueue;
  }, []);

  const criticalCount = queue.filter(p => p.priority_level === 'HIGH').length;
  
  const getAvatarFallback = (name) => {
    if (!name) return 'GP';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getUrgencyBadge = (level) => {
    switch (level) {
      case 'HIGH': return <span className="badge badge-critical">Critical</span>;
      case 'MEDIUM': return <span className="badge badge-urgent">Urgent</span>;
      default: return <span className="badge badge-routine">Routine</span>;
    }
  };

  return (
    <div className="queue-container">
      <div className="queue-header">
        <div>
          <h1 className="page-title">AI Priority Queue</h1>
          <p className="page-subtitle">Real-time triage management powered by CareConnect AI.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline-danger" title="Clear All Test Patients" onClick={handleClearAll}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            Reset Queue
          </button>
          <button className="btn-primary flex items-center" onClick={onOpenIntake}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Walk-in Intake
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-title">Active Queue</div>
          <div className="stat-value">{queue.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Critical Priority</div>
          <div className="stat-value text-red flex items-center gap-2">
            {criticalCount < 10 ? `0${criticalCount}` : criticalCount}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Avg. Wait Time</div>
          <div className="stat-value">14m</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">AI Conf. Level</div>
          <div className="stat-value text-green">98%</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="queue-list-card">
          <table className="queue-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>PATIENT</th>
                <th>AI SCORE</th>
                <th>URGENCY</th>
                <th>WAIT TIME</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && queue.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4">Loading queue...</td></tr>
              ) : queue.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4">No patients in queue</td></tr>
              ) : (
                queue.map((appointment, index) => (
                  <tr 
                    key={appointment.id} 
                    className={selectedPatient?.id === appointment.id ? 'selected-row' : ''}
                    onClick={() => setSelectedPatient(appointment)}
                  >
                    <td className="rank-col">#{index + 1}</td>
                    <td>
                      <div className="patient-info">
                        <div className="avatar">{getAvatarFallback(appointment.patient?.name)}</div>
                        <div className="patient-details">
                          <div className="patient-name">{appointment.patient?.name || 'Unknown'}</div>
                          <div className="patient-meta">PT-{appointment.patient_id} • AI Triage</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={`score-ring score-${appointment.priority_level.toLowerCase()}`}>
                        {appointment.priority_score}
                      </div>
                    </td>
                    <td>{getUrgencyBadge(appointment.priority_level)}</td>
                    <td className="wait-time text-muted">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {Math.floor((new Date() - new Date(appointment.created_at)) / 60000)}m
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination">
            <span className="text-muted">Showing {Math.min(5, queue.length)} of {queue.length} patients in active queue</span>
            <div className="pagination-controls">
              <button className="btn-page">Previous</button>
              <button className="btn-page">Next Page</button>
            </div>
          </div>
        </div>

        {selectedPatient && (
          <div className="ai-reasoning-card">
            <div className="reasoning-header">
              <span className="badge badge-critical outline">Critical Analysis</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h2 className="reasoning-title">AI Reasoning</h2>
            <p className="reasoning-subtitle">Case #{selectedPatient.id} • {selectedPatient.patient?.name || 'Unknown'}</p>

            <div className="score-highlight">
              <div className={`score-ring large score-${selectedPatient.priority_level.toLowerCase()}`}>
                {selectedPatient.priority_score}
              </div>
              <div className="score-details">
                <div className="score-rank">Priority Ranking #{queue.findIndex(p => p.id === selectedPatient.id) + 1}</div>
                <div className="score-percentile">User Severity: <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{selectedPatient.severity || 'Low'}</span></div>
              </div>
            </div>

            <div className="contributing-factors">
              <h3 className="factors-title flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                Current Symptoms List
              </h3>
              
              <div className="factor-list flex-col gap-2">
                {selectedPatient.symptoms?.map((symptom, idx) => (
                  <div className="factor-item" key={idx}>
                    <span className="factor-name">{symptom}</span>
                    <span className="factor-weight text-red">+AI</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-primary full-width flex items-center justify-between" 
                style={{marginBottom: '10px'}}
                onClick={() => handleDelete(selectedPatient.id)}
              >
                Assign to Available Doctor
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button 
                className="btn-outline-danger full-width flex items-center justify-center gap-2"
                onClick={() => handleDelete(selectedPatient.id, true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                Remove Manually
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPriorityQueue;
