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

const triagePending = [
  { name: "Gondwe, Mercy",   age: "34y, F", score: 88, level: "critical", symptom: "Severe Abdominal Pain",        time: "Requested 09:30 AM", init: "GM", color: "#fca5a5", textColor: "#991b1b" },
  { name: "Phiri, Tiwonge",  age: "28y, F", score: 75, level: "urgent",   symptom: "High Fever (103°F)",            time: "Requested 10:30 AM", init: "PT", color: "#bfdbfe", textColor: "#1e40af" },
];

const overrideItems = [
  { name: "Gondwe, Mercy",  score: 88 },
  { name: "Phiri, Tiwonge", score: 75 },
  { name: "Tembo, K.",      score: 45 },
  { name: "Sakala, P.",     score: 94 },
];

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

function UrgencyBadge({ level }) {
  if (level === "critical") return <span className="badge-critical">Critical</span>;
  if (level === "urgent")   return <span className="badge-urgent">Urgent</span>;
  return <span className="badge-routine">Routine</span>;
}

// ── Icons (inline SVG) ─────────────────────────────────────────────────────────
const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M2 7h12" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1 13c0-2.21 2.24-4 5-4s5 1.79 5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M14 13c0-1.66-1.34-3-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconActivity = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 8h2l2-5 3 9 2-6 1 2h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="#16a34a" strokeWidth="1.5"/>
    <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconWarn = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M8 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="8" cy="11.5" r=".75" fill="currentColor"/>
  </svg>
);

const IconChevronUp = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 7l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 3l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Sidebar Right Panel (for Dashboard view) ──────────────────────────────────
function DashboardSidebar({ onNewBooking }) {
  const [qrForm, setQrForm] = useState({ name: "", symptom: "", age: "" });
  const [priorities, setPriorities] = useState(overrideItems);

  const moveUp   = (i) => { if (i === 0) return; const a = [...priorities]; [a[i-1], a[i]] = [a[i], a[i-1]]; setPriorities(a); };
  const moveDown = (i) => { if (i === priorities.length-1) return; const a = [...priorities]; [a[i], a[i+1]] = [a[i+1], a[i]]; setPriorities(a); };

  return (
    <>
      {/* Quick Register */}
      <div className="quick-register">
        <div className="quick-register-header">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#2563eb" strokeWidth="1.3"/><path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#2563eb" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span className="quick-register-title">Quick Register (Walk-In)</span>
        </div>
        <div className="quick-register-body">
          <input className="form-input" placeholder="Patient Name" value={qrForm.name} onChange={e => setQrForm(f => ({...f, name: e.target.value}))} />
          <input className="form-input" placeholder="Primary Symptom" value={qrForm.symptom} onChange={e => setQrForm(f => ({...f, symptom: e.target.value}))} />
          <input className="form-input" placeholder="Age" value={qrForm.age} onChange={e => setQrForm(f => ({...f, age: e.target.value}))} />
          <button className="btn btn-primary" style={{ width: "100%", padding: "9px", fontSize: 13 }}
            onClick={() => { setQrForm({ name: "", symptom: "", age: "" }); }}>
            Register
          </button>
        </div>
      </div>

      {/* AI Priority Overrides */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 4h4l-3.5 2.5 1.5 4L7 9 3.5 11.5l1.5-4L1 5h4z" stroke="#d97706" strokeWidth="1.2" fill="#fcd34d" strokeLinejoin="round"/></svg>
            AI Priority Overrides
          </span>
        </div>
        <div style={{ padding: "6px 0 4px", fontSize: 11, color: "var(--color-text-tertiary)", padding: "8px 18px 6px" }}>Manual adjustments to queue order</div>
        <div className="override-list">
          {priorities.map((p, i) => (
            <div className="override-item" key={i}>
              <div className="triage-avatar" style={{ width: 28, height: 28, fontSize: 10, background: "#e0e7ff", color: "#4338ca", fontWeight: 600 }}>
                {p.name.split(",")[0][0]}{p.name.split(" ").pop()[0]}
              </div>
              <div className="override-item-info">
                <div className="override-item-name">{p.name}</div>
                <div className="override-item-score">Score: {p.score}</div>
              </div>
              <div className="override-arrows">
                <button className="arrow-btn" onClick={() => moveUp(i)}><IconChevronUp /></button>
                <button className="arrow-btn" onClick={() => moveDown(i)}><IconChevronDown /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Status */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Resource Status</span>
        </div>
        {[
          { name: "Dr. Banda (General)", sub: "Next Available: 11:00 AM · In Session: Mwale, C." },
          { name: "Dr. Chirwa (Internal Med)", sub: "Available now" },
          { name: "Triage Room A", sub: "Occupied — Est. free: 09:45 AM" },
        ].map((r, i) => (
          <div className="resource-item" key={i}>
            <div>
              <div className="resource-name">{r.name}</div>
              <div className="resource-sub">{r.sub}</div>
            </div>
            <IconChevronDown />
          </div>
        ))}
      </div>

      {/* System Alert */}
      <div className="system-alert">
        <div className="system-alert-icon"><IconWarn /></div>
        <div>
          <div className="system-alert-title">System Alert</div>
          <div className="system-alert-text">High volume of respiratory cases detected in last 2 hours. AI adjusting baseline priorities.</div>
        </div>
      </div>
    </>
  );
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

  const total      = rows.length;
  const pending    = rows.filter(r => r.status === "pending").length;
  const approved   = rows.filter(r => r.status === "approved").length;
  const overridden = rows.filter(r => r.status === "rejected").length;

  return (
    <>
      {/* Stat cards */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-card-left">
            <div className="stat-label">Total Appointments</div>
            <div className="stat-val">{total}</div>
          </div>
          <div className="stat-icon stat-icon-blue"><IconCalendar /></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-left">
            <div className="stat-label">Pending Review</div>
            <div className="stat-val" style={{ color: "var(--color-orange)" }}>{pending}</div>
          </div>
          <div className="stat-icon stat-icon-orange"><IconClock /></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-left">
            <div className="stat-label">Approved</div>
            <div className="stat-val" style={{ color: "var(--color-green)" }}>{approved}</div>
          </div>
          <div className="stat-icon stat-icon-green"><IconCheck /></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-left">
            <div className="stat-label">Overridden</div>
            <div className="stat-val" style={{ color: "var(--color-blue)" }}>{overridden}</div>
          </div>
          <div className="stat-icon stat-icon-gray"><IconActivity /></div>
        </div>
      </div>

      {/* FR15 + FR16 */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">
              AI-generated schedule
              <span className="badge badge-ai" style={{ fontSize: 10 }}>AI Draft</span>
            </div>
            <div className="panel-subtitle">Sunday, 29 March 2026 · {total} appointments</div>
          </div>
          <button className="btn btn-approve" onClick={approveAll}>Approve all pending</button>
        </div>
        <table className="sched-table">
          <thead>
            <tr>
              <th>Time</th><th>Patient</th><th>Doctor</th><th>Type</th>
              <th>AI Confidence</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12 }}>{r.time}</td>
                <td style={{ fontWeight: 500 }}>{r.patient}</td>
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
          <div>
            <div className="panel-title">
              Override AI Decision
              <span className="badge badge-gray" style={{ fontSize: 10 }}>FR17</span>
            </div>
            <div className="panel-subtitle">Manual adjustments to AI scheduling conflicts</div>
          </div>
        </div>
        <div className="panel-body">
          <div className="conflict-banner">
            <IconWarn />
            AI flagged 2 scheduling conflicts that may require manual review.
          </div>

          {[
            { key: "conflict1", label: "Dr. Banda — double-booked at 10:30", sub: "AI assigned Mwale, C. and Phiri, T. to the same slot. Suggested fix: move Phiri, T. to 11:00." },
            { key: "conflict2", label: "Urgent patient — priority not assigned", sub: "Tembo, K. marked urgent but placed in afternoon slot. Override to next available morning slot?" },
          ].map(({ key, label, sub }) => (
            <div className="override-row" key={key}>
              <div className="override-info">
                <div className="override-label">{label}</div>
                <div className="override-sub">{sub}</div>
              </div>
              <div className="action-btns">
                <button
                  className="btn btn-approve"
                  onClick={() => applyFix(key)}
                  disabled={overrideFixes[key] === "fixed"}
                >
                  {overrideFixes[key] === "fixed" ? "Fixed ✓" : overrideFixes[key] === "editing" ? "Editing…" : "Apply fix"}
                </button>
                {overrideFixes[key] !== "fixed" && (
                  <button className="btn" onClick={() => manualOverride(key)}>Set manually</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Walk-in Page (FR18) ────────────────────────────────────────────────────────
function WalkinPage() {
  const [activeTab, setActiveTab] = useState("new");
  const [confirmed, setConfirmed] = useState(false);
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
          <div>
            <div className="panel-title">
              Register Walk-in Patient
              <span className="badge badge-gray" style={{ fontSize: 10 }}>FR18</span>
            </div>
            <div className="panel-subtitle">Register a new or existing patient for immediate care</div>
          </div>
        </div>

        <div className="tabs">
          <div className={`tab${activeTab === "new" ? " active" : ""}`} onClick={() => setActiveTab("new")}>New patient</div>
          <div className={`tab${activeTab === "existing" ? " active" : ""}`} onClick={() => setActiveTab("existing")}>Existing patient</div>
        </div>

        <div className="panel-body">
          {activeTab === "new" && (
            <>
              <div className="form-grid" style={{ marginBottom: 16 }}>
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
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
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
            <IconCheck />
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
  const [search, setSearch]           = useState("");
  const [showResults, setShowResults] = useState(false);
  const [confirmed, setConfirmed]     = useState(false);
  const [newDate, setNewDate]         = useState("");
  const [newTime, setNewTime]         = useState("11:00");
  const [newDoctor, setNewDoctor]     = useState("Dr. Banda (same)");
  const [reason, setReason]           = useState("Patient request");

  const confirmReschedule = () => {
    setShowResults(false);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 4000);
  };

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">
              Reschedule Appointment
              <span className="badge badge-gray" style={{ fontSize: 10 }}>FR19</span>
            </div>
            <div className="panel-subtitle">Find and move an existing appointment</div>
          </div>
        </div>
        <div className="panel-body">
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
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
              <div className="form-grid" style={{ marginBottom: 14 }}>
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
            <IconCheck />
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

// ── Dashboard Home Page ────────────────────────────────────────────────────────
function DashboardPage({ setActivePage }) {
  const [rows, setRows] = useState(initialRows);
  const approveRow = (i) => setRows(r => r.map((row, idx) => idx === i ? { ...row, status: "approved" } : row));
  const rejectRow  = (i) => setRows(r => r.map((row, idx) => idx === i ? { ...row, status: "rejected" } : row));

  const total   = rows.length;
  const pending = rows.filter(r => r.status === "pending").length;

  return (
    <div className="dashboard-grid">
      <div className="dashboard-left">
        {/* Pending Triage Approvals */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Pending AI Triage Approvals</div>
              <div className="panel-subtitle">{triagePending.length} cases awaiting review</div>
            </div>
            <span className="view-all" onClick={() => setActivePage("schedule")}>
              View All ({pending}) <IconChevronRight />
            </span>
          </div>
          <div className="triage-cards">
            {triagePending.map((p, i) => (
              <div className="triage-card" key={i}>
                <div className="triage-avatar" style={{ background: p.color, color: p.textColor }}>
                  {p.init}
                </div>
                <div className="triage-info">
                  <div className="triage-name">
                    {p.name}
                    <UrgencyBadge level={p.level} />
                    <span style={{ background: p.level === "critical" ? "#fef2f2" : "#eff6ff", color: p.level === "critical" ? "#dc2626" : "#2563eb", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>
                      {p.score}
                    </span>
                  </div>
                  <div className="triage-meta">
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <IconClock />
                      {p.time} · {p.symptom}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Daily Schedule</div>
              <div className="panel-subtitle">Live status of confirmed patient visits</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" style={{ fontSize: 12 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: 4 }}><path d="M1 3h10M3 6h6M5 9h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Filter
              </button>
              <button className="btn badge-ai" style={{ fontSize: 12, border: "1px solid var(--color-blue-mid)" }}>Today</button>
            </div>
          </div>
          <table className="sched-table">
            <thead>
              <tr>
                <th>Patient</th><th>Time</th><th>Doctor</th><th>AI Priority</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{r.patient}</div>
                    <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{r.type}</div>
                  </td>
                  <td style={{ fontWeight: 500, fontSize: 12 }}>{r.time}</td>
                  <td>
                    <div className="doctor-col">
                      <div className={`avatar ${r.docColor}`}>{r.docInit}</div>
                      Dr. {r.doc}
                    </div>
                  </td>
                  <td><ConfBadge conf={r.conf} /></td>
                  <td>
                    {r.status === "approved" ? <span className="badge-routine" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #86efac", borderRadius: 99, padding: "3px 10px", fontSize: 11 }}>Confirmed</span>
                    : r.status === "rejected" ? <span className="badge-routine">Rejected</span>
                    : <span className="badge-urgent" style={{ fontSize: 11 }}>Walk-In</span>}
                  </td>
                  <td>
                    {r.status === "pending" ? (
                      <div className="action-btns">
                        <button className="btn btn-approve" onClick={() => approveRow(i)}>Approve</button>
                        <button className="btn btn-reject"  onClick={() => rejectRow(i)}>Reject</button>
                      </div>
                    ) : (
                      <button className="btn" style={{ fontSize: 11 }}>···</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "10px 18px", fontSize: 12, color: "var(--color-text-tertiary)", borderTop: "1px solid var(--color-border)" }}>
            Showing {rows.length} of {total} patients · Completed: {rows.filter(r => r.status === "approved").length} / {total}
          </div>
        </div>
      </div>

      <div className="dashboard-right">
        <DashboardSidebar />
      </div>
    </div>
  );
}

// ── Main Receptionist Dashboard ────────────────────────────────────────────────
export default function ReceptionistDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const navItems = [
    { key: "dashboard",   label: "Receptionist Dashboard", section: "Overview",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg> },
    { key: "schedule",    label: "AI Schedule (FR15–17)", section: "Schedule",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { key: "walkin",      label: "Walk-in Registration", section: "Patients",
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 13c0-2.21 2.24-4 5-4s5 1.79 5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 7v4M10 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { key: "reschedule",  label: "Reschedule Appointment", section: null,
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];

  const topbarMeta = {
    dashboard:  { title: "Receptionist Dashboard", meta: "Sunday, 29 March 2026 — Managing clinic flow and AI-assisted triage queue." },
    schedule:   { title: "AI-Generated Schedule",  meta: "Sunday, 29 March 2026 — 47 appointments generated" },
    walkin:     { title: "Walk-in Registration",    meta: "Register a new or existing patient" },
    reschedule: { title: "Reschedule Appointment",  meta: "Find and move an appointment" },
  };

  const current = topbarMeta[activePage];

  // Group navItems by section
  const sections = ["Overview", "Schedule", "Patients"];

  return (
    <div className="rd-shell">

      {/* Sidebar */}
      <div className="rd-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9h3l2-6 3 12 2-6 2 3h2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="sys-name">CareConnect</div>
            <div className="sys-sub">Receptionist portal</div>
          </div>
        </div>

        {sections.map(section => {
          const items = navItems.filter(n => n.section === section || (section === "Patients" && n.section === null));
          if (!items.length) return null;
          return (
            <React.Fragment key={section}>
              <div className="nav-section">{section}</div>
              {items.map(item => (
                <div
                  key={item.key}
                  className={`nav-item${activePage === item.key ? " active" : ""}`}
                  onClick={() => setActivePage(item.key)}
                >
                  <div className="nav-icon">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </React.Fragment>
          );
        })}

        <div style={{ flex: 1 }} />

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">SP</div>
          <div>
            <div className="sidebar-user-name">Sandra Phiri</div>
            <div className="sidebar-user-role">Receptionist</div>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="rd-main">

        {/* Topbar */}
        <div className="rd-topbar">
          <div className="topbar-left">
            <div>
              <div className="topbar-title">{current.title}</div>
              <div className="topbar-meta">{current.meta}</div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-stat">
              <IconUsers />
              <div>
                <div className="topbar-stat-val">24</div>
              </div>
              <div className="topbar-stat-label">Total Active</div>
            </div>
            <div className="topbar-stat">
              <IconClock />
              <div>
                <div className="topbar-stat-val">18m</div>
              </div>
              <div className="topbar-stat-label">Avg. Wait</div>
            </div>
            <button className="btn-new-booking" onClick={() => setActivePage("walkin")}>
              <IconPlus /> New Booking
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="rd-content">
          {activePage === "dashboard"   && <DashboardPage setActivePage={setActivePage} />}
          {activePage === "schedule"    && <SchedulePage />}
          {activePage === "walkin"      && <WalkinPage />}
          {activePage === "reschedule"  && <ReschedulePage />}
        </div>
      </div>
    </div>
  );
}
