import React, { useState } from 'react';
import { createAppointment } from '../api';
import './SymptomIntakeModal.css';

const SymptomIntakeModal = ({ isOpen, onClose, onSuccess }) => {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Split by comma and clean up
    const symptoms = symptomsInput.split(',').map(s => s.trim()).filter(s => s !== '');

    if (symptoms.length === 0) {
      setError("Please enter at least one symptom.");
      setIsLoading(false);
      return;
    }

    try {
      await createAppointment(symptoms);
      setSymptomsInput('');
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
          Enter patient symptoms below (comma-separated). The AI Priority Engine will analyze these symptoms in real-time to assign a priority score and rank the patient in the queue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Primary Symptoms</label>
            <textarea 
              rows="4" 
              placeholder="e.g. chest pain, severe fever, headache"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Register Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SymptomIntakeModal;
