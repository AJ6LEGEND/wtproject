import React from 'react';
import { NavLink } from 'react-router-dom';
import './WT5.css'; 

const PublicSafety = () => {
  return (
    <div className="page-wrapper">


      <div className="container">
        <h2>Public Safety Dashboard</h2>
        <p style={{ color: '#888', marginBottom: '2rem' }}>Your safety is our priority.</p>
        
        {/* Smaller Map Placeholder */}
        <div className="map-placeholder map-small">
          <h1>📍</h1>
          <h3>Live Safety Map Coming Soon</h3>
          <p>Will show nearest police stations, fire stations, and emergency routes.</p>
        </div>

        {/* Safety Information Section */}
        <div className="safety-content">
          
          {/* Top 5 Safest Areas */}
          <div className="safety-card">
            <h3>🛡️ Top 5 Safest Areas in Mumbai</h3>
            <ol className="styled-list">
              <li><strong>Borivali (West)</strong> - Excellent community policing and active residential societies.</li>
              <li><strong>Vile Parle</strong> - Well-lit streets and strong student/residential presence.</li>
              <li><strong>Powai</strong> - High-tech surveillance and private township security.</li>
              <li><strong>Malabar Hill</strong> - VVIP security zones and constant patrolling.</li>
              <li><strong>Dadar (Hindu Colony)</strong> - Peaceful, well-connected, and tight-knit community.</li>
            </ol>
          </div>

          {/* Key Emergency Hubs */}
          <div className="safety-card">
            <h3>🚒 Key Emergency Hubs</h3>
            <ul className="styled-list">
              <li><strong>Borivali Police Station:</strong> Located near the Railway Station, handling R/Central ward.</li>
              <li><strong>Mumbai Fire Brigade (Borivali Command):</strong> Main hub on S.V. Road for rapid response.</li>
              <li><strong>BMC Disaster Management Cell:</strong> City-wide coordination center for monsoons and crises.</li>
              <li><strong>Bhagwati Hospital:</strong> Primary trauma and emergency center for North Mumbai.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PublicSafety;