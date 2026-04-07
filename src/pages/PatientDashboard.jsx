import React from 'react';
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  Clock, 
  FileText, 
  History, 
  Plus, 
  User, 
  Activity,
  Pill,
  ShieldCheck,
  FlaskConical,
  Stethoscope,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/PatientDashboard.css';

const PatientDashboard = () => {
  const alerts = [
    { id: 1, title: 'Refill Prescription', desc: 'Your Lisinopril 10mg is ready for pickup at CVS Pharmacy.', time: '2h ago', icon: Pill },
    { id: 2, title: 'Booking Confirmed', desc: 'Appointment with Dr. Sarah Chen is confirmed for tomorrow.', time: '5h ago', icon: ShieldCheck },
    { id: 3, title: 'Vaccination Reminder', desc: 'You are eligible for your seasonal Flu Shot. Book now.', time: '1d ago', icon: AlertCircle },
    { id: 4, title: 'Lab Results Ready', desc: 'Your Blood Work results are now available in the portal.', time: '2d ago', icon: FlaskConical },
  ];

  const appointments = [
    { id: 1, doctor: 'Dr. Sarah Chen', specialty: 'Cardiologist', date: 'Oct 24, 2023', time: '10:30 AM', status: 'Upcoming' },
    { id: 2, doctor: 'Dr. Mark Reynolds', specialty: 'Dermatologist', date: 'Nov 02, 2023', time: '02:00 PM', status: 'Upcoming' },
  ];

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  return (
    <div className="patient-dashboard">
      <div className="top-nav">
        <div className="nav-left">
          <div className="brand-logo">
            <Activity className="brand-icon" size={24} />
            CareConnect
          </div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#" className="active">Dashboard</a>
          </div>
        </div>
        <div className="nav-right">
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notif-badge">2</span>
          </button>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="nav-avatar" />
          <button className="signout-btn">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="main-content-area">
        <header className="dashboard-header">
          <div className="welcome-wrapper">
            <div className="welcome-section">
              <h1>Welcome back, Alexander</h1>
              <p>You have 2 appointments scheduled for this week.</p>
            </div>
            <div className="header-stats">
              <div className="stat-pill">
                <div className="stat-icon-wrap blue"><History size={16} /></div>
                <div className="stat-text">
                  <span className="stat-label">PAST VISITS</span>
                  <span className="stat-val">14</span>
                </div>
              </div>
              <div className="stat-pill">
                <div className="stat-icon-wrap green"><Plus size={16} /></div>
                <div className="stat-text">
                  <span className="stat-label">REPORTS</span>
                  <span className="stat-val">3 New</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="main-column">
            
            {/* Replaced Symptom Input with Patient Intake Link */}
            <div className="intake-prompt-card card">
              <div className="intake-header">
                <FileText className="intake-icon" size={24} />
                <h2>Symptom Intake Report</h2>
              </div>
              <p className="intake-desc">
                Your care team requires an updated symptom intake report before your next visit. Please complete it now.
              </p>
              <div className="intake-actions">
                <div className="last-entry">
                  <Clock size={16} /> Last entry: 2 days ago
                </div>
                <Link to="/intake" className="btn-primary">
                  Go to Intake Form
                </Link>
              </div>
            </div>

            <div className="appointments-section">
              <div className="section-header">
                <h2>My Appointments</h2>
                <div className="segmented-control">
                  <button className="active">Upcoming</button>
                  <button>Past</button>
                </div>
              </div>
              <div className="appointments-list">
                {appointments.map((appt) => (
                  <div key={appt.id} className="appointment-card">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appt.doctor.replace(/\s+/g, '')}`} alt={appt.doctor} className="dr-avatar" />
                    <div className="appointment-info">
                      <h4>{appt.doctor}</h4>
                      <p>{appt.specialty}</p>
                      <div className="appt-meta">
                        <span><Calendar size={14} /> {appt.date}</span>
                        <span><Clock size={14} /> {appt.time}</span>
                      </div>
                    </div>
                    <div className="appt-status-col">
                      <span className="status-badge">{appt.status}</span>
                      <ChevronRight size={20} className="chevron" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="manage-all-btn">Manage All Appointments</button>
            </div>
          </div>

          <div className="side-column">
            <div className="quick-book-card card">
              <div className="section-header">
                <h2>Quick Book</h2>
                <a href="#" className="link-text">View Full Calendar</a>
              </div>
              <div className="calendar-strip">
                {['MON 22', 'TUE 23', 'WED 24', 'THU 25', 'FRI 26', 'SAT 27'].map((day, ix) => (
                  <div key={ix} className={`day-card ${ix === 1 ? 'active' : ''}`}>
                    <span className="day-name">{day.split(' ')[0]}</span>
                    <span className="day-num">{day.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
              <div className="available-times">
                <h4>AVAILABLE TIMES</h4>
                <div className="time-slots">
                  {timeSlots.map((slot, ix) => (
                    <button key={ix} className={`slot-btn ${ix === 1 ? 'selected' : ''}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn-primary full-width">Confirm Booking</button>
            </div>
          </div>
          
          <div className="alerts-column">
             <div className="alerts-header">
               <h3><Bell size={20} /> Recent Alerts</h3>
               <span className="count-badge">4 NEW</span>
             </div>
             <div className="alerts-list">
               {alerts.map((alert) => (
                 <div key={alert.id} className="alert-item card">
                   <div className="alert-icon-wrap">
                     <alert.icon size={20} />
                   </div>
                   <div className="alert-content">
                     <h4>{alert.title}</h4>
                     <p>{alert.desc}</p>
                     <span className="alert-time">{alert.time}</span>
                   </div>
                 </div>
               ))}
             </div>
             <button className="clear-alerts link-text">Clear All Notifications</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-brand">
            <div className="brand-logo">
              <Activity className="brand-icon" size={24} />
              CareConnect
            </div>
            <p>Revolutionizing healthcare access with technology. Connect with care anytime, anywhere.</p>
          </div>
          <div className="footer-links">
            <h4>PATIENTS</h4>
            <a href="#">Register</a>
            <a href="#">Login</a>
            <a href="#">My Dashboard</a>
          </div>
          <div className="footer-links">
            <h4>SUPPORT</h4>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="footer-links">
            <h4>STAFF</h4>
            <a href="#">Admin Sign In</a>
            <a href="#">System Status</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 CareConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PatientDashboard;

