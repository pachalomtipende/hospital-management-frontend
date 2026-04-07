import React, { useState } from 'react';
import { createAppointment } from '../api';
import './SymptomIntakeModal.css';

const SymptomIntakeModal = ({ isOpen, onClose, onSuccess }) => {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [severity, setSeverity] = useState('low');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setSymptomsInput('');
    setSeverity('low');
    setError(null);
    setAiResult(null);
    onClose();
  };

  const handleDone = () => {
    setAiResult(null);
    setSymptomsInput('');
    setSeverity('low');
    onSuccess();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!symptomsInput.trim()) {
      setError("Please describe the patient's symptoms.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createAppointment(symptomsInput, severity);
      setAiResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (level) => {
    switch (level) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getPriorityLabel = (level) => {
    switch (level) {
      case 'HIGH': return 'Critical';
      case 'MEDIUM': return 'Urgent';
      default: return 'Routine';
    }
  };

  // ── Results Phase: Show AI analysis + first aid advice ──
  if (aiResult) {
    const appointment = aiResult.appointment;
    const advice = aiResult.first_aid_advice || [];
    const priorityColor = getPriorityColor(appointment.priority_level);

    return (
      <div className="modal-overlay">
        <div className="modal-content modal-results">
          <div className="modal-header">
            <h2>✅ Patient Registered</h2>
            <button className="close-btn" onClick={handleClose}>&times;</button>
          </div>

          {/* Priority Summary */}
          <div className="result-summary" style={{ borderLeft: `4px solid ${priorityColor}` }}>
            <div className="result-priority">
              <span className="result-badge" style={{ background: priorityColor }}>
                {getPriorityLabel(appointment.priority_level)}
              </span>
              <span className="result-score">Score: {appointment.priority_score}/100</span>
            </div>
            <p className="result-symptoms">
              <strong>Detected:</strong> {(appointment.symptoms || []).join(', ')}
            </p>
          </div>

          {/* First Aid Advice */}
          {advice.length > 0 && (
            <div className="advice-section">
              <h3 className="advice-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', verticalAlign: 'middle'}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                While You Wait — First Aid Guidance
              </h3>
              <div className="advice-cards">
                {advice.map((item, idx) => (
                  <div key={idx} className="advice-card">
                    <div className="advice-symptom">{item.symptom}</div>
                    <div className="advice-text">{item.advice}</div>
                  </div>
                ))}
              </div>
              <p className="advice-disclaimer">
                ⚠️ This is general first-aid guidance only — not a medical diagnosis. Always follow your doctor's instructions.
              </p>
            </div>
          )}

          <div className="modal-actions">
            <button className="btn-primary full-width" onClick={handleDone}>
              Done — Return to Queue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Input Phase: Symptom form ──
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Walk-in Triage Intake</h2>
          <button className="close-btn" onClick={handleClose}>&times;</button>
        </div>
        
        <p className="modal-desc">
          Describe the symptoms and select the severity level. The AI Priority Engine will analyze the text for medical keywords to assign a priority score.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Symptoms Description</label>
            <textarea 
              rows="4" 
              placeholder="e.g. 'I have a sharp pain in my chest' or 'The patient has a slight fever and a cough'"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Patient-Reported Severity</label>
            <div className="severity-selector">
              <label>
                <input 
                  type="radio" 
                  value="low" 
                  checked={severity === 'low'} 
                  onChange={(e) => setSeverity(e.target.value)} 
                />
                Low
              </label>
              <label>
                <input 
                  type="radio" 
                  value="moderate" 
                  checked={severity === 'moderate'} 
                  onChange={(e) => setSeverity(e.target.value)} 
                />
                Moderate
              </label>
              <label>
                <input 
                  type="radio" 
                  value="severe" 
                  checked={severity === 'severe'} 
                  onChange={(e) => setSeverity(e.target.value)} 
                />
                Severe
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing AI Analysis...' : 'Register Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SymptomIntakeModal;
