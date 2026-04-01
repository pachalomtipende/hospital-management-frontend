import React, { useState } from "react";
import "./ReceptionistDashboard.css";

// ── Data ───────────────────────────────────────────────────────────────────────
const initialRows = [
  { time: "08:00", patient: "Mwale, Chisomo",   doc: "Banda",  docInit: "KB", docColor: "av-blue",   type: "Consultation", conf: 94, status: "approved" },
  { time: "08:30", patient: "Tembo, Kondwani",  doc: "Chirwa", docInit: "AC", docColor: "av-teal",   type: "Follow-up",    conf: 87, status: "pending"  },
  { time: "09:00", patient: "Dube, Alinafe",    doc: "Mbewe",  docInit: "PM", docColor: "av-purple", type: "Lab review",   conf: 91, status: "approved" },
  { time: "09:30", patient: "Gondwe, Mercy",    doc: "Banda",  docInit: "KB", docColor: "av-blue",   type: "New patient",  conf: 78, status: "pending"  },
  { time: "10:00", patient: "Sakala, Peter",    doc: "Chirwa", docInit: "AC", docColor: "av-teal",   type: "Consultation", conf: 95, status: "approved" },
  { time: "10:30", patient: "Phiri, Tiwonge",   doc: "Banda",  docInit: "KB", docColor: "av-blue",   type: "Consultation", conf: 62, status: "pending"  },
  { time: "11:00", patient: "Kachingwe, Ruth",  doc: "Nkosi",  docInit: "LN", docColor: "av-coral",  type: "Follow-up",    conf: 88, status: "rejected" },
];

const pageMeta = {
  schedule:   { title: "AI-generated schedule",       meta: "Sunday, 29 March 2026 — 47 appointments generated", badge: "AI draft" },
  walkin:     { title: "Walk-in registration",         meta: "Register a new or existing patient",                badge: "FR18"     },
  reschedule: { title: "Reschedule appointment",       meta: "Find and move an appointment",                      badge: "FR19"     },
};

// ── Badge helpers ──────────────────────────────────────────────────────────────
function ConfBadge({ conf }) {
  if (conf >= 90) return <span className="badge badge-success">{conf}%</span>;
  if (conf >= 75) return <span className="badge badge-warning">{conf}%</span>;
  return <span className="badge badge-danger">{conf}%</span>;
}

function StatusBadge({ status }) {
  if (status === "approved") return <span className="badge badge-success">Approved</span>;
  if (status === "rejected") return <span className="badge badge-danger">Rejected</span>;
  return <span className="badge badge-warning">Pending</span>;
}

// ── Schedule Page (FR15, FR16, FR17) ──────────────────────────────────────────
function SchedulePage() {
  const [rows, setRows] = useState(initialRows);
  const [overrideFixes, setOverrideFixes] = useState({ conflict1: null, conflict2: null });

  const approve    = (i) => setRows(r => r.map((row, idx) => idx === i ? { ...row, status: "approved" } : row));
  const reject     = (i) => setRows(r => r.map((row, idx) => idx === i ? { ...row, status: "rejected" } : row));
  const override   = (i) => setRows(r => r.map((row, idx) => idx === i ? { ...row, status: "pending"  } : row));
  const approveAll = ()  => setRows(r => r.map(row => row.status === "pending" ? { ...row, status: "approved" } : row));

  const applyFix = (key) => setOverrideFixes(f => ({ ...f, [key]: "fixed" }));
  const manualOverride = (key) => setOverrideFixes(f => ({ ...f, [key]: "editing" }));

  const total    = rows.length;
  const pending  = rows.filter(r => r.status === "pending").length;
  const approved = rows.filter(r => r.status === "approved").length;
  const overridden = rows.filter(r => r.status === "rejected").length;

  return (
    <>
      {/* Stat cards */}
      <div className="stat-row">
        <div className="stat-card"><div className="stat-label">Total appointments</div><div className="stat-val">{total}</div></div>
        <div className="stat-card"><div className="stat-label">Pending review</div><div className="stat-val" style={{ color: "#854F0B" }}>{pending}</div></div>
        <div className="stat-card"><div className="stat-label">Approved</div><div className="stat-val" style={{ color: "#3B6D11" }}>{approved}</div></div>
        <div className="stat-card"><div className="stat-label">Overridden</div><div className="stat-val" style={{ color: "#185FA5" }}>{overridden}</div></div>
      </div>

      {/* FR15 + FR16 — View & Approve/Reject */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            AI-generated schedule
            <span className="badge badge-ai" style={{ marginLeft: 6, fontSize: 10 }}></span>
          </div>
          <button className="btn btn-approve" onClick={approveAll}>Approve all pending</button>
        </div>
        <table className="sched-table">
          <thead>
            <tr>
              <th>Time</th><th>Patient</th><th>Doctor</th><th>Type</th>
              <th>AI confidence</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{r.time}</td>
                <td>{r.patient}</td>
                <td>
                  <div className="doctor-col">
                    <div className={`avatar ${r.docColor}`}>{r.docInit}</div>
                    Dr. {r.doc}
                  </div>
                </td>
                <td><span className="badge badge-gray">{r.type}</span></td>
                <td><ConfBadge conf={r.conf} /></td>
                <td><StatusBadge status={r.status} /></td>
                <td>
                  {r.status === "pending" ? (
                    <div className="action-btns">
                      <button className="btn btn-approve" onClick={() => approve(i)}>Approve</button>
                      <button className="btn btn-reject"  onClick={() => reject(i)}>Reject</button>
                    </div>
                  ) : (
                    <div className="action-btns">
                      <button className="btn" onClick={() => override(i)}>Override</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FR17 — Override AI decisions */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Override AI decision
            <span className="badge badge-gray" style={{ marginLeft: 6, fontSize: 10 }}>FR17</span>
          </div>
        </div>
        <div className="panel-body">
          <div className="conflict-banner">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#EF9F27" strokeWidth="1.5"/>
              <path d="M8 5v4" stroke="#EF9F27" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="11.5" r=".75" fill="#EF9F27"/>
            </svg>
            AI flagged 2 scheduling conflicts that may require manual review.
          </div>

          <div className="override-row">
            <div className="override-info">
              <div className="override-label">Dr. Banda — double-booked at 10:30</div>
              <div className="override-sub">AI assigned Mwale, C. and Phiri, T. to the same slot. Suggested fix: move Phiri, T. to 11:00.</div>
            </div>
            <div className="action-btns">
              <button
                className="btn btn-approve"
                onClick={() => applyFix("conflict1")}
                disabled={overrideFixes.conflict1 === "fixed"}
                style={overrideFixes.conflict1 === "fixed" ? { opacity: 0.5 } : {}}
              >
                {overrideFixes.conflict1 === "fixed" ? "Fixed" : overrideFixes.conflict1 === "editing" ? "Editing..." : "Apply fix"}
              </button>
              {overrideFixes.conflict1 !== "fixed" && (
                <button className="btn" onClick={() => manualOverride("conflict1")}>Set manually</button>
              )}
            </div>
          </div>

          <div className="override-row">
            <div className="override-info">
              <div className="override-label">Urgent patient — priority not assigned</div>
              <div className="override-sub">Tembo, K. marked urgent but placed in afternoon slot. Override to next available morning slot?</div>
            </div>
            <div className="action-btns">
              <button
                className="btn btn-approve"
                onClick={() => applyFix("conflict2")}
                disabled={overrideFixes.conflict2 === "fixed"}
                style={overrideFixes.conflict2 === "fixed" ? { opacity: 0.5 } : {}}
              >
                {overrideFixes.conflict2 === "fixed" ? "Fixed" : overrideFixes.conflict2 === "editing" ? "Editing..." : "Apply fix"}
              </button>
              {overrideFixes.conflict2 !== "fixed" && (
                <button className="btn" onClick={() => manualOverride("conflict2")}>Set manually</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Walk-in Page (FR18) ────────────────────────────────────────────────────────
function WalkinPage() {
  const [activeTab, setActiveTab]   = useState("new");
  const [confirmed, setConfirmed]   = useState(false);
  const [form, setForm] = useState({
    firstName: "", surname: "", dob: "", gender: "", phone: "", nationalId: "",
    reason: "", priority: "Routine", doctor: "Auto-assign (AI)", timeSlot: "Next available",
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const registerWalkin = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 4000);
  };

  const clearForm = () => setForm({
    firstName: "", surname: "", dob: "", gender: "", phone: "", nationalId: "",
    reason: "", priority: "Routine", doctor: "Auto-assign (AI)", timeSlot: "Next available",
  });

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Register walk-in patient
            <span className="badge badge-gray" style={{ marginLeft: 6, fontSize: 10 }}>FR18</span>
          </div>
        </div>

        <div className="tabs">
          <div className={`tab${activeTab === "new" ? " active" : ""}`} onClick={() => setActiveTab("new")}>New patient</div>
          <div className={`tab${activeTab === "existing" ? " active" : ""}`} onClick={() => setActiveTab("existing")}>Existing patient</div>
        </div>

        <div className="panel-body">
          {activeTab === "new" && (
            <>
              <div className="form-grid" style={{ marginBottom: 12 }}>
                <div className="form-field"><div className="form-label">First name</div><input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="e.g. Chisomo" /></div>
                <div className="form-field"><div className="form-label">Surname</div><input className="form-input" name="surname" value={form.surname} onChange={handleChange} placeholder="e.g. Mwale" /></div>
                <div className="form-field"><div className="form-label">Date of birth</div><input className="form-input" type="date" name="dob" value={form.dob} onChange={handleChange} /></div>
                <div className="form-field">
                  <div className="form-label">Gender</div>
                  <select className="form-input" name="gender" value={form.gender} onChange={handleChange}>
                    <option>Select...</option><option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="form-field"><div className="form-label">Phone number</div><input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+265 XXX XXX XXX" /></div>
                <div className="form-field"><div className="form-label">ID / national reg. no.</div><input className="form-input" name="nationalId" value={form.nationalId} onChange={handleChange} placeholder="Optional" /></div>
              </div>

              <div className="appt-section">
                <div className="appt-section-label">Appointment details</div>
                <div className="form-grid">
                  <div className="form-field"><div className="form-label">Reason for visit</div><input className="form-input" name="reason" value={form.reason} onChange={handleChange} placeholder="e.g. Fever, follow-up" /></div>
                  <div className="form-field">
                    <div className="form-label">Priority</div>
                    <select className="form-input" name="priority" value={form.priority} onChange={handleChange}>
                      <option>Routine</option><option>Urgent</option><option>Emergency</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <div className="form-label">Assign to doctor</div>
                    <select className="form-input" name="doctor" value={form.doctor} onChange={handleChange}>
                      <option>Auto-assign (AI)</option><option>Dr. Banda</option><option>Dr. Chirwa</option><option>Dr. Mbewe</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <div className="form-label">Preferred time slot</div>
                    <select className="form-input" name="timeSlot" value={form.timeSlot} onChange={handleChange}>
                      <option>Next available</option><option>Morning (08:00–12:00)</option><option>Afternoon (12:00–17:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn" onClick={clearForm}>Clear</button>
                <button className="btn btn-primary" onClick={registerWalkin}>Register patient</button>
              </div>
            </>
          )}

          {activeTab === "existing" && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <input className="form-input" style={{ flex: 1 }} placeholder="Search by name or patient ID..." />
                <button className="btn btn-primary">Search</button>
              </div>
              <div className="empty-state">Enter a name or ID to search existing patients</div>
            </>
          )}
        </div>
      </div>

      {confirmed && (
        <div className="panel">
          <div className="panel-body confirm-row">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="#3B6D11" strokeWidth="1.5"/>
              <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="confirm-title">Walk-in registered</div>
              <div className="confirm-sub">Patient added to today's queue — slot 14:00 with Dr. Banda (auto-assigned)</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Reschedule Page (FR19) ─────────────────────────────────────────────────────
function ReschedulePage() {
  const [search, setSearch]       = useState("");
  const [showResults, setShowResults] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [newDate, setNewDate]     = useState("");
  const [newTime, setNewTime]     = useState("11:00");
  const [newDoctor, setNewDoctor] = useState("Dr. Banda (same)");
  const [reason, setReason]       = useState("Patient request");

  const confirmReschedule = () => {
    setShowResults(false);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 4000);
  };

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">
            Reschedule appointment
            <span className="badge badge-gray" style={{ marginLeft: 6, fontSize: 10 }}>FR19</span>
          </div>
        </div>
        <div className="panel-body">
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Search patient by name or appointment ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => setShowResults(true)}>Find</button>
          </div>

          {showResults && (
            <>
              <div className="current-appt">
                <div className="current-appt-label">Current appointment</div>
                <div className="current-appt-grid">
                  <div><div className="appt-field-label">Patient</div><div className="appt-field-val">Phiri, Tiwonge</div></div>
                  <div><div className="appt-field-label">Date &amp; time</div><div className="appt-field-val">29 Mar · 10:30</div></div>
                  <div><div className="appt-field-label">Doctor</div><div className="appt-field-val">Dr. Banda</div></div>
                  <div><div className="appt-field-label">Type</div><div className="appt-field-val">Consultation</div></div>
                </div>
              </div>

              <div className="section-label">New appointment details</div>
              <div className="form-grid" style={{ marginBottom: 12 }}>
                <div className="form-field"><div className="form-label">New date</div><input className="form-input" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} /></div>
                <div className="form-field">
                  <div className="form-label">New time slot</div>
                  <select className="form-input" value={newTime} onChange={e => setNewTime(e.target.value)}>
                    <option>09:00</option><option>09:30</option><option>10:00</option>
                    <option>11:00</option><option>11:30</option><option>14:00</option>
                  </select>
                </div>
                <div className="form-field">
                  <div className="form-label">Doctor</div>
                  <select className="form-input" value={newDoctor} onChange={e => setNewDoctor(e.target.value)}>
                    <option>Dr. Banda (same)</option><option>Dr. Chirwa</option><option>Dr. Mbewe</option>
                  </select>
                </div>
                <div className="form-field">
                  <div className="form-label">Reason for change</div>
                  <select className="form-input" value={reason} onChange={e => setReason(e.target.value)}>
                    <option>Patient request</option><option>Doctor unavailable</option>
                    <option>Schedule conflict</option><option>Emergency</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn" onClick={() => setShowResults(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={confirmReschedule}>Confirm reschedule</button>
              </div>
            </>
          )}
        </div>
      </div>

      {confirmed && (
        <div className="panel">
          <div className="panel-body confirm-row">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="#3B6D11" strokeWidth="1.5"/>
              <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="confirm-title">Appointment rescheduled</div>
              <div className="confirm-sub">Phiri, Tiwonge moved to 29 Mar at {newTime} with {newDoctor}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Main Receptionist Dashboard ────────────────────────────────────────────────
export default function ReceptionistDashboard() {
  const [activePage, setActivePage] = useState("schedule");
  const current = pageMeta[activePage];

  return (
    <div className="rd-shell">

      {/* Sidebar */}
      <div className="rd-sidebar">
        <div className="sidebar-logo">
          <div className="sys-name">MedFlow</div>
          <div className="sys-sub">Receptionist portal</div>
        </div>

        <div className="nav-section">Schedule</div>
        <div className={`nav-item${activePage === "schedule" ? " active" : ""}`} onClick={() => setActivePage("schedule")}>
          <div className="nav-dot"></div>AI schedule (FR15–17)
        </div>

        <div className="nav-section">Patients</div>
        <div className={`nav-item${activePage === "walkin" ? " active" : ""}`} onClick={() => setActivePage("walkin")}>
          <div className="nav-dot"></div>Walk-in registration 
        </div>
        <div className={`nav-item${activePage === "reschedule" ? " active" : ""}`} onClick={() => setActivePage("reschedule")}>
          <div className="nav-dot"></div>Reschedule appointment 
        </div>

        <div style={{ flex: 1 }} />
        <div className="sidebar-user">
          <div className="sidebar-user-name">Sandra Phiri</div>
          <div className="sidebar-user-role">Receptionist</div>
        </div>
      </div>

      {/* Main area */}
      <div className="rd-main">
        <div className="rd-topbar">
          <div>
            <div className="topbar-title">{current.title}</div>
            <div className="topbar-meta">{current.meta}</div>
          </div>
          <span className="badge badge-ai">{current.badge}</span>
        </div>

        <div className="rd-content">
          {activePage === "schedule"   && <SchedulePage />}
          {activePage === "walkin"     && <WalkinPage />}
          {activePage === "reschedule" && <ReschedulePage />}
        </div>
      </div>
    </div>
  );
}
