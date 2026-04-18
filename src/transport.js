import React, { useState } from 'react';
import './WT6.css';

const Transport = () => {
  const [tab, setTab] = useState('Bus');

  return (
    <div className="transport-page container">
      <header className="page-header">
        <h1>🚆 Transport Info</h1>
        <p>Real-time schedules for Borivali & Kandivali</p>
      </header>

      <div className="tab-container">
        <button className={tab === 'Bus' ? 'tab active' : 'tab'} onClick={() => setTab('Bus')}>🚌 BEST Bus</button>
        <button className={tab === 'Train' ? 'tab active' : 'tab'} onClick={() => setTab('Train')}>🚆 Western Railway</button>
        <button className={tab === 'Metro' ? 'tab active' : 'tab'} onClick={() => setTab('Metro')}>🚇 Metro</button>
      </div>

      <div className="schedule-content">
        {tab === 'Bus' && (
          <table className="transport-table">
            <thead>
              <tr><th>Route No.</th><th>Destination</th><th>Frequency</th></tr>
            </thead>
            <tbody>
              <tr><td>202</td><td>Mahim Bus Station</td><td>Every 15 mins</td></tr>
              <tr><td>210</td><td>Dahisar Check Naka</td><td>Every 10 mins</td></tr>
              <tr><td>203</td><td>Andheri Station</td><td>Every 20 mins</td></tr>
            </tbody>
          </table>
        )}

        {tab === 'Train' && (
          <div className="railway-info">
            <h3>🚉 Borivali Station Timetable</h3>
            <div className="train-section">
              <h4>Fast Trains (Southbound)</h4>
              <p>First Fast: 04:05 AM | Last Fast: 11:45 PM</p>
            </div>
            <div className="train-section">
              <h4>Slow Trains (Southbound)</h4>
              <p>First Slow: 03:50 AM | Last Slow: 12:15 AM</p>
            </div>
          </div>
        )}

        {tab === 'Metro' && (
          <div className="metro-info">
            <h3>🚇 Line 2A & Line 7</h3>
            <div className="metro-station">
              <strong>Borivali West (Shimpoli):</strong> Every 8 mins
            </div>
            <div className="metro-station">
              <strong>Kandivali West (Dahanukarwadi):</strong> Every 8 mins
            </div>
            <p className="note">*Service starts at 06:00 AM from both terminals.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transport;