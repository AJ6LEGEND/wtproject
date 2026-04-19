import React, { useState } from 'react';
import './WT4.css';

const hospitals = [
  {
    id: 1,
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    area: 'Andheri West',
    specialities: ['Oncology', 'Cardiology', 'Neurology', 'Orthopaedics', 'Transplants'],
    emergency: true,
    contact: '022-30999999',
    rating: 5,
  },
  {
    id: 2,
    name: 'Lilavati Hospital & Research Centre',
    area: 'Bandra West',
    specialities: ['Cardiology', 'Neurosurgery', 'Gastroenterology', 'Nephrology'],
    emergency: true,
    contact: '022-26751000',
    rating: 5,
  },
  {
    id: 3,
    name: 'Hinduja Hospital (P.D. Hinduja)',
    area: 'Mahim',
    specialities: ['Cardiology', 'Oncology', 'Orthopaedics', 'Urology'],
    emergency: true,
    contact: '022-24447000',
    rating: 4,
  },
  {
    id: 4,
    name: 'Nanavati Max Super Speciality Hospital',
    area: 'Vile Parle West',
    specialities: ['Bariatrics', 'Cardiology', 'Neurology', 'Pulmonology'],
    emergency: true,
    contact: '022-26267500',
    rating: 4,
  },
  {
    id: 5,
    name: 'Borivali Municipal General Hospital',
    area: 'Borivali West',
    specialities: ['General Medicine', 'Gynaecology', 'Paediatrics', 'Orthopaedics'],
    emergency: false,
    contact: '022-28946100',
    rating: 3,
  },
];

const Healthcare = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="health-wrapper">


      <div className="container">
        <h2>🏥 Mumbai Healthcare Directory</h2>
        <p className="health-subtitle">
          Major hospitals ranked by facilities and specialities available.
        </p>

        {/* ── Map Placeholder ── */}
        <div className="health-map-placeholder">
          <span className="map-icon">🗺️</span>
          <p>An interactive hospital map would appear here.</p>
          <span className="map-note">Feature coming soon</span>
        </div>

        {/* ── Hospital List ── */}
        <div className="health-list">
          {hospitals.map((h, index) => (
            <div className="health-card" key={h.id}>
              <div className="health-card-top">
                <div className="health-rank">#{index + 1}</div>
                <div className="health-info">
                  <h3>{h.name}</h3>
                  <p className="health-area">📍 {h.area}</p>
                </div>
                <div className="health-emergency">
                  {h.emergency
                    ? <span className="badge-emergency">🚨 Emergency</span>
                    : <span className="badge-no-emergency">No Emergency Surgery</span>
                  }
                </div>
              </div>

              <div className="health-specialities">
                {h.specialities.map((s) => (
                  <span className="spec-tag" key={s}>{s}</span>
                ))}
              </div>

              <div className="health-card-footer">
                <span className="health-contact">📞 {h.contact}</span>
                <button
                  className="health-expand-btn"
                  onClick={() => setExpanded(expanded === h.id ? null : h.id)}
                >
                  {expanded === h.id ? 'Less Info ▲' : 'More Info ▼'}
                </button>
              </div>

              {expanded === h.id && (
                <div className="health-expanded">
                  <p><strong>Full Specialities:</strong> {h.specialities.join(', ')}</p>
                  <p><strong>Emergency Surgery:</strong> {h.emergency ? 'Yes ✅' : 'No ❌'}</p>
                  <p><strong>Contact:</strong> {h.contact}</p>
                  <p><strong>Location:</strong> {h.area}, Mumbai</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Healthcare;