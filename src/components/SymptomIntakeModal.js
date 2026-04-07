import React, { useState } from 'react';
import { createAppointment } from '../api';
import './SymptomIntakeModal.css';

const SymptomIntakeModal = ({ isOpen, onClose, onSuccess }) => {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [severity, setSeverity] = useState('low');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

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
      // We now pass the full string and the selected severity to the AI engine
      await createAppointment(symptomsInput, severity);
      setSymptomsInput('');
      setSeverity('low');
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Walk-in Triage Intake</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
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
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
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
