import React, { useState } from 'react';
import { createAppointment } from '../api';
import './PatientPortal.css';

import DoctorPortrait from '../assets/images/doctor_2.jpg';
import TeamLab from '../assets/images/team_1.jpg';

const SYMPTOM_CATEGORIES = [
  {
    id: 'chest',
    icon: '❤️',
    title: 'Chest & Breathing',
    urgency: 'High Urgency',
    urgencyClass: 'urgency-high',
    description: 'Chest pain, shortness of breath, or sudden difficulty breathing that worsens rapidly or comes with dizziness.',
    bullets: [
      'Sudden pressure or tightness in chest',
      'Gasping or unable to complete sentences',
      'Bluish tinge to lips or fingertips',
      'Accompanied by arm pain or sweating',
    ],
    keywords: 'chest pain difficulty breathing',
  },
  {
    id: 'fever',
    icon: '🌡️',
    title: 'Fever & Infection',
    urgency: 'Medium Urgency',
    urgencyClass: 'urgency-medium',
    description: 'Persistent high fever (over 103°F / 39°C), severe chills, or suspected spreading infection.',
    bullets: [
      'Fever above 103°F that won\'t break',
      'Shaking chills with sweating',
      'Hot, red, swollen area on skin',
      'Please start your symptom intake below.',
    ],
    keywords: 'fever',
  },
  {
    id: 'neuro',
    icon: '🧠',
    title: 'Neurological',
    urgency: 'High Urgency',
    urgencyClass: 'urgency-high',
    description: 'Sudden confusion, slurred speech, facial drooping, or intense severe headaches.',
    bullets: [
      'Drooping face, arm/leg weakness',
      'Slurred or absent speech (think FAST)',
      'Sudden disorientation or memory loss',
      'Worst headache of your life',
    ],
    keywords: 'stroke confusion severe head injury',
  },
  {
    id: 'burns',
    icon: '🔥',
    title: 'Burns & Skin',
    urgency: 'Medium Urgency',
    urgencyClass: 'urgency-medium',
    description: 'Burns covering large areas, chemical exposure, or wounds needing immediate attention.',
    bullets: [
      'Burns larger than 3 inches or on face/hands',
      'Electrical or chemical burn exposure',
      'Deep wound with uncontrolled bleeding',
      'Burns with white or charred skin',
    ],
    keywords: 'burning severe bleeding deep cut',
  },
  {
    id: 'allergy',
    icon: '⚠️',
    title: 'Allergic Reactions',
    urgency: 'High Urgency',
    urgencyClass: 'urgency-high',
    description: 'Swelling of throat/tongue, hives spreading rapidly, or exposure to a known severe allergen.',
    bullets: [
      'Throat tightening or swallowing difficulty',
      'Hives spreading rapidly across body',
      'Exposure to bee sting or peanuts (if allergic)',
      'Use EpiPen if available and call for help',
    ],
    keywords: 'allergic reaction',
  },
  {
    id: 'general',
    icon: '🩺',
    title: 'General Malaise',
    urgency: 'Low Urgency',
    urgencyClass: 'urgency-low',
    description: 'Tiredness, non-specific discomfort, muscle aches, nausea, or common cold/flu symptoms.',
    bullets: [
      'Whole-body tiredness or weakness',
      'Nausea, vomiting, or stomach upset',
      'Minor aches, pains, or joint stiffness',
      'Cold/flu symptoms without severe distress',
    ],
    keywords: 'fatigue nausea muscle ache',
  },
];

const FAQS = [
  {
    q: 'How long does the AI intake take?',
    a: 'Most patients complete the form in under 2 minutes. Your data is instantly sent to our priority queue.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. CareConnect is fully HIPAA-compliant. Your medical data is encrypted and only accessible by authorised staff.',
  },
  {
    q: 'What happens after I submit?',
    a: 'You\'ll receive an immediate priority score. A coordinator or doctor will review your case and reach out via the app or phone.',
  },
];

const PatientPortal = () => {
  const [showIntake, setShowIntake] = useState(false);
  const [prefillSymptoms, setPrefillSymptoms] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [severity, setSeverity] = useState('low');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleCategoryClick = (keywords) => {
    setPrefillSymptoms(keywords);
    setSymptomsInput(keywords);
    setShowIntake(true);
    setTimeout(() => {
      document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStartIntake = () => {
    setSymptomsInput(prefillSymptoms);
    setShowIntake(true);
    setTimeout(() => {
      document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptomsInput.trim()) {
      setError("Please describe your symptoms before submitting.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await createAppointment(symptomsInput, severity);
      setResult(res);
      setShowIntake(false);
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
      case 'HIGH': return '🚨 Critical — You will be seen immediately.';
      case 'MEDIUM': return '⚠️ Urgent — You are in the priority queue.';
      default: return '✅ Routine — You\'re registered and in the queue.';
    }
  };

  // ── RESULTS SCREEN ──
  if (result) {
    const appt = result.appointment;
    const advice = result.first_aid_advice || [];
    const color = getPriorityColor(appt.priority_level);

    return (
      <div className="patient-portal">
        <div className="portal-result-page">
          <div className="result-hero" style={{ borderColor: color }}>
            <div className="result-icon" style={{ background: color }}>
              {appt.priority_level === 'HIGH' ? '🚨' : appt.priority_level === 'MEDIUM' ? '⚠️' : '✅'}
            </div>
            <div>
              <h1 className="result-heading">{getPriorityLabel(appt.priority_level)}</h1>
              <p className="result-sub">Detected: {(appt.symptoms || []).join(', ')}</p>

            </div>
          </div>

          {advice.length > 0 && (
            <div className="result-advice-section">
              <h2 className="result-advice-heading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                First Aid Guidance While You Wait
              </h2>
              <div className="result-advice-grid">
                {advice.map((item, idx) => (
                  <div key={idx} className="result-advice-card">
                    <div className="result-advice-symptom">{item.symptom}</div>
                    <div className="result-advice-text">{item.advice}</div>
                  </div>
                ))}
              </div>
              <p className="result-disclaimer">⚠️ This is general first-aid guidance only — not a medical diagnosis. Always follow your doctor's instructions.</p>
            </div>
          )}

          <button className="btn-portal-primary" onClick={() => { setResult(null); setShowIntake(false); setSymptomsInput(''); setSeverity('low'); }}>
            ← Back to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-portal">

      {/* ── HERO BANNER ── */}
      <div className="portal-hero">
        <div className="portal-hero-text">
          <div className="portal-emergency-bar">
            🚨 LIFE-THREATENING EMERGENCY? CALL 911 OR YOUR LOCAL EMERGENCY SERVICES IMMEDIATELY.
          </div>
          <h1 className="portal-hero-heading">
            Immediate Help<br />
            <span className="portal-hero-accent">When You Need It Most.</span>
          </h1>
          <p className="portal-hero-sub">
            Not sure if your symptoms require an ER visit? Use our AI-powered triage to get immediate guidance and prioritise your care within the CareConnect network.
          </p>
          <div className="portal-hero-buttons">
            <button className="btn-portal-primary" onClick={handleStartIntake}>
              ▶ Start Symptom Intake
            </button>
            <button className="btn-portal-outline">
              📞 Emergency Contacts
            </button>
          </div>
          <div className="portal-hero-meta">
            ⏱ Avg. response: 2 mins &nbsp;·&nbsp; 🔒 Secure & Confidential
          </div>
        </div>
        
        {/* Updated Hero Imagery Section */}
        <div className="portal-hero-images-container">
          <img src={TeamLab} alt="Medical Team" className="hero-img-main" />
          <img src={DoctorPortrait} alt="Friendly Doctor" className="hero-img-float" />
          
          <div className="portal-hero-card-inner overlay-card">
            <div className="live-dot"></div>
            <div>
              <div className="portal-hero-card-title">Live System Status</div>
              <div className="portal-hero-card-sub">All emergency departments operating at normal capacity.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SYMPTOM TRIAGE LIBRARY ── */}
      <div className="portal-section">
        <div className="portal-section-header">
          <div>
            <h2 className="portal-section-title">Symptom Triage Library</h2>
            <p className="portal-section-sub">Immediate instructions for common medical situations. Select a category below to understand your priority level and next steps.</p>
          </div>
          <span className="portal-info-tag">ℹ Information for guidance only</span>
        </div>

        <div className="category-grid">
          {SYMPTOM_CATEGORIES.map((cat) => (
            <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.keywords)}>
              <div className="category-card-top">
                <span className="category-icon">{cat.icon}</span>
                <span className={`category-urgency-tag ${cat.urgencyClass}`}>{cat.urgency}</span>
              </div>
              <h3 className="category-title">{cat.title}</h3>
              <p className="category-desc">{cat.description}</p>
              <ul className="category-bullets">
                {cat.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="category-cta">Start Intake →</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SYMPTOM INTAKE FORM ── */}
      {showIntake && (
        <div className="portal-section" id="intake-form">
          <div className="portal-intake-box">
            <h2 className="portal-section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Ready to provide more details?
            </h2>
            <p className="portal-section-sub">Our Intelligent Intake Form analyses your symptoms using AI to provide a priority score and direct you to the right department.</p>

            <form onSubmit={handleSubmit} className="portal-intake-form">
              <div className="portal-form-group">
                <label>Describe your symptoms in your own words</label>
                <textarea
                  rows="4"
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder="e.g. 'I have had a sharp chest pain since this morning and I feel short of breath'"
                />
              </div>

              <div className="portal-form-group">
                <label>How severe do you feel your condition is?</label>
                <div className="portal-severity-grid">
                  {['low', 'moderate', 'severe'].map((s) => (
                    <label key={s} className={`portal-severity-option ${severity === s ? 'selected' : ''}`}>
                      <input type="radio" value={s} checked={severity === s} onChange={() => setSeverity(s)} />
                      <div className="severity-option-content">
                        <span className="severity-option-icon">
                          {s === 'low' ? '😌' : s === 'moderate' ? '😟' : '😰'}
                        </span>
                        <span className="severity-option-label">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {error && <div className="portal-error">{error}</div>}

              <div className="portal-form-actions">
                <button type="button" className="btn-portal-outline" onClick={() => setShowIntake(false)}>Cancel</button>
                <button type="submit" className="btn-portal-primary" disabled={isLoading}>
                  {isLoading ? '⏳ Analysing with AI...' : '▶ Submit for AI Analysis'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CTA BANNER ── */}
      {!showIntake && (
        <div className="portal-cta-banner">
          <div className="portal-cta-icon">📋</div>
          <h2 className="portal-cta-title">Ready to provide more details?</h2>
          <p className="portal-cta-sub">Our Intelligent Intake Form analyses your symptoms using AI to provide a priority score and direct you to the right department, saving you time at the clinic.</p>
          <div className="portal-cta-buttons">
            <button className="btn-portal-primary" onClick={handleStartIntake}>▶ Go to Symptom Intake</button>
            <button className="btn-portal-outline">View My Appointments</button>
          </div>
          <p className="portal-cta-meta">🟢 Triage Engine is currently online and processing in real-time</p>
        </div>
      )}

      {/* ── CONTACT + FAQ ── */}
      <div className="portal-bottom-grid">
        <div className="portal-contact-box">
          <h3>Need Immediate Contact?</h3>
          <p>If you cannot use the digital triage portal or wish to speak with a coordinator directly, our 24/7 hotline is available for immediate assistance.</p>
          <div className="portal-contact-item">
            <span className="portal-contact-icon">📞</span>
            <div>
              <div className="portal-contact-label">MAIN EMERGENCY LINE</div>
              <div className="portal-contact-number">1-800-999-CARE</div>
            </div>
          </div>
          <div className="portal-contact-item">
            <span className="portal-contact-icon">🏥</span>
            <div>
              <div className="portal-contact-label">NATIONAL TRIAGE HOTLINE</div>
              <div className="portal-contact-number">1-800-555-1Triage</div>
            </div>
          </div>
        </div>

        <div className="portal-faq-box">
          <h3>Frequently Asked Questions</h3>
          {FAQS.map((faq, idx) => (
            <div key={idx} className="faq-item" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <div className="faq-question">
                {faq.q}
                <span className="faq-toggle">{openFaq === idx ? '▲' : '▼'}</span>
              </div>
              {openFaq === idx && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="portal-footer">
        © 2024 CareConnect Systems. All rights reserved.
        <span>Privacy Policy · Support Center · System Status</span>
      </div>
    </div>
  );
};

export default PatientPortal;
