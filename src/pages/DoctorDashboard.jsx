import React from 'react';
import { 
  Activity, 
  Bell, 
  Calendar, 
  FileText, 
  HeartPulse, 
  LogOut, 
  Search, 
  Stethoscope, 
  Thermometer, 
  Wind,
  CheckCircle,
  FileSignature
} from 'lucide-react';
import '../styles/DoctorDashboard.css';

const DoctorDashboard = () => {
  const schedule = [
    { id: 1, name: 'Sarah Jenkins', time: '09:00 AM', reason: 'Severe Abdominal Pain', status: 'Urgent', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah1', active: true },
    { id: 2, name: 'Michael Chen', time: '09:30 AM', reason: 'Chest Tightness & Shortness of Breath', status: 'Critical', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', active: false },
    { id: 3, name: 'Eleanor Vance', time: '10:15 AM', reason: 'Post-Op Follow-up (Knee Replacement)', status: 'Routine', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor', active: false },
  ];

  return (
    <div className="doctor-dashboard">
      <aside className="sidebar">
        <div className="brand-logo-sidebar">
          <Activity className="brand-icon" size={24} />
          CareConnect
        </div>
        
        <nav className="nav-menu">
          <a href="#" className="nav-item">
            <Activity size={20} /> Priority Queue
          </a>
          <a href="#" className="nav-item active">
            <Stethoscope size={20} /> Doctor Hub
          </a>
          <a href="#" className="nav-item">
            <Calendar size={20} /> Reception/Schedule
          </a>
          <a href="#" className="nav-item">
            <FileText size={20} /> Patient Intake
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="signout-btn">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="top-header">
          <div className="header-left">
            <span className="emergency-info">Emergency Info</span>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search patients..." />
            </div>
            <button className="icon-btn"><Bell size={20} /><span className="notif-dot"></span></button>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrJane" alt="Dr Profile" className="dr-profile-img" />
          </div>
        </header>

        <div className="dashboard-content">
          <div className="schedule-column card">
            <div className="schedule-header">
              <h2><Calendar size={20} /> Today's Schedule</h2>
              <span className="date-badge">Mar 15, 2024</span>
            </div>
            
            <div className="search-bar-solid">
              <Search size={16} />
              <input type="text" placeholder="Filter patients..." />
            </div>

            <div className="timeline-list">
              {schedule.map((patient, index) => (
                <div key={patient.id} className={`timeline-item ${patient.active ? 'active' : ''}`}>
                  <div className="timeline-time">
                    <ClockIcon /> <span>{patient.time}</span>
                  </div>
                  <div className="timeline-card">
                    <img src={patient.image} alt={patient.name} />
                    <div className="tl-info">
                      <h4>{patient.name}</h4>
                      <p>{patient.reason}</p>
                    </div>
                    <div className="tl-status">
                      <span className={`status-badge badge-${patient.status.toLowerCase()}`}>{patient.status}</span>
                      {patient.status === 'Critical' && <span className="timer-icon"><ClockIcon size={14}/></span>}
                      {patient.active && <Activity size={16} className="pulse-icon" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="schedule-footer">
               <span>Completed: 8 / 24</span>
               <div className="progress-bar"><div className="progress" style={{width: '33%'}}></div></div>
            </div>
          </div>

          <div className="details-area">
            <div className="patient-hero-card card">
              <div className="hero-left">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah1" alt="Sarah Jenkins" className="hero-avatar" />
                <div className="hero-info">
                  <h2>Sarah Jenkins</h2>
                  <p>42 Years • Female</p>
                  <p className="hero-reason"><Activity size={14}/> Severe Abdominal Pain</p>
                </div>
              </div>
              <div className="hero-right">
                <div className="status-buttons">
                  <button className="status-btn">Arrived</button>
                  <button className="status-btn active">In Progress</button>
                  <button className="status-btn"><CheckCircle size={14}/> Complete</button>
                </div>
                <div className="vitals-row">
                  <div className="vital">
                    <span className="vital-label"><HeartPulse size={12}/> HEART RATE</span>
                    <span className="vital-val">88<small>bpm</small></span>
                  </div>
                  <div className="vital">
                    <span className="vital-label"><Thermometer size={12}/> TEMP</span>
                    <span className="vital-val">99.1<small>°F</small></span>
                  </div>
                  <div className="vital">
                    <span className="vital-label"><Wind size={12}/> O2 SAT</span>
                    <span className="vital-val">98<small>%</small></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-grid">
              <div className="details-main-col">
                <div className="intake-report-card card">
                  <h3 className="section-title"><FileText size={18}/> SYMPTOM INTAKE REPORT</h3>
                  <div className="intake-grid">
                    <div className="intake-field">
                      <label>ONSET</label>
                      <div className="field-val">4 hours ago</div>
                    </div>
                    <div className="intake-field">
                      <label>SEVERITY</label>
                      <div className="field-val">8/10</div>
                    </div>
                    <div className="intake-field">
                      <label>TYPE</label>
                      <div className="field-val">Sharp, intermittent</div>
                    </div>
                    <div className="intake-field">
                      <label>NAUSEA</label>
                      <div className="field-val">Yes</div>
                    </div>
                  </div>
                </div>

                <div className="medical-history-card">
                  <h3 className="section-title"><ClockIcon size={18}/> PATIENT MEDICAL HISTORY</h3>
                  <div className="history-list">
                    <div className="history-item card">
                      <FileText size={18} className="hist-icon" />
                      <div className="hist-info">
                        <span className="hist-date">2023-11-12</span>
                        <span className="hist-desc">Mild Gastritis</span>
                      </div>
                      <a href="#" className="view-notes-link">View Notes →</a>
                    </div>
                    <div className="history-item card">
                      <FileText size={18} className="hist-icon" />
                      <div className="hist-info">
                        <span className="hist-date">2022-05-20</span>
                        <span className="hist-desc">Annual Checkup - Healthy</span>
                      </div>
                      <a href="#" className="view-notes-link">View Notes →</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-side-col">
                <div className="ai-analysis-card card">
                  <h3 className="section-title"><Activity size={18}/> AI Priority Analysis</h3>
                  <div className="score-row">
                     <span className="score-lg">8.4</span>
                     <span className="score-rank">Score Rank #2</span>
                  </div>
                  <div className="ai-note">
                    "Priority elevated based on reported sharp abdominal pain duration and history of gastritis. Recommend immediate vitals check and abdominal ultrasound."
                  </div>
                </div>

                <div className="clinical-utilities">
                  <h3 className="section-title">CLINICAL UTILITIES</h3>
                  <button className="utility-btn card"><CheckCircle size={18} className="util-icon blue" /> Request Lab Tests</button>
                  <button className="utility-btn card"><Activity size={18} className="util-icon blue" /> Order Imaging</button>
                  <button className="utility-btn card"><FileText size={18} className="util-icon blue" /> Refer to Specialist</button>
                </div>
              </div>
            </div>

            <div className="notes-area card">
               <div className="notes-input-wrapper">
                 <FileSignature size={20} className="notes-icon" />
                 <textarea placeholder="Enter diagnosis notes, treatment plans, and prescriptions here..."></textarea>
               </div>
               <div className="notes-actions">
                 <button className="clear-btn">Clear</button>
                 <button className="save-btn btn-primary">Save Notes</button>
                 <button className="finalize-btn"><CheckCircle size={18}/> Finalize Encounter</button>
               </div>
               <div className="print-action">
                 <a href="#" className="print-link">Print Discharge Papers</a>
               </div>
            </div>

          </div>
        </div>
        <footer className="footer-simple">
          <span>© 2024 CareConnect Systems. All rights reserved.</span>
          <div className="footer-links-simple">
             <a href="#">Privacy Policy</a>
             <a href="#">Support Center</a>
             <a href="#">System Status</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

// simple wrapper as icon
const ClockIcon = ({size=14}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default DoctorDashboard;
