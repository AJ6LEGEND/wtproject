import React from 'react';
import './WT4.css';

const aqiZones = [
  { zone: 'Sanjay Gandhi National Park', aqi: 28,  status: 'Good',      color: 'good' },
  { zone: 'Borivali West',               aqi: 62,  status: 'Moderate',  color: 'moderate' },
  { zone: 'Marine Drive',                aqi: 74,  status: 'Moderate',  color: 'moderate' },
  { zone: 'Bandra',                      aqi: 88,  status: 'Moderate',  color: 'moderate' },
  { zone: 'Kandivali East',              aqi: 134, status: 'Poor',      color: 'poor' },
  { zone: 'Malad West',                  aqi: 141, status: 'Poor',      color: 'poor' },
  { zone: 'Dharavi',                     aqi: 167, status: 'Poor',      color: 'poor' },
  { zone: 'Andheri East (MIDC)',         aqi: 156, status: 'Poor',      color: 'poor' },
];

const getOverallAqi = () => 112;

const getAqiLabel = (aqi) => {
  if (aqi <= 50)  return { label: 'Good',      color: 'good' };
  if (aqi <= 100) return { label: 'Moderate',  color: 'moderate' };
  if (aqi <= 200) return { label: 'Poor',      color: 'poor' };
  return               { label: 'Hazardous',  color: 'hazardous' };
};

const Environment = () => {
  const overall = getOverallAqi();
  const overallLabel = getAqiLabel(overall);

  return (
    <div className="env-wrapper">


      <div className="container">
        <h2>🌿 Air Quality & Environment</h2>
        <p className="env-subtitle">Live AQI readings across Mumbai zones.</p>

        {/* ── Big AQI Display ── */}
        <div className={`env-aqi-hero aqi-bg-${overallLabel.color}`}>
          <p className="env-aqi-city">Mumbai Overall AQI</p>
          <h1 className="env-aqi-number">{overall}</h1>
          <span className={`env-aqi-label aqi-label-${overallLabel.color}`}>
            {overallLabel.label}
          </span>
          <p className="env-aqi-tip">
            {overallLabel.color === 'good'     && 'Air quality is satisfactory. Enjoy outdoor activities.'}
            {overallLabel.color === 'moderate' && 'Acceptable air quality. Sensitive groups should limit prolonged outdoor exertion.'}
            {overallLabel.color === 'poor'     && 'Everyone may begin to experience health effects. Limit outdoor activity.'}
          </p>
        </div>

        {/* ── Map Placeholder ── */}
        <div className="env-map-placeholder">
          <span className="map-icon">🗺️</span>
          <p>An interactive AQI zone map would appear here.</p>
          <span className="map-note">Zones colour-coded by air quality level</span>
        </div>

        {/* ── Zone Readings ── */}
        <h3 className="env-section-title">📍 Zone-wise AQI Readings</h3>
        <div className="env-zone-grid">
          {aqiZones.map((z) => (
            <div className={`env-zone-card zone-${z.color}`} key={z.zone}>
              <p className="zone-name">{z.zone}</p>
              <h3 className="zone-aqi">{z.aqi}</h3>
              <span className={`zone-badge badge-${z.color}`}>{z.status}</span>
            </div>
          ))}
        </div>

        {/* ── SGNP Info Cards ── */}
        <h3 className="env-section-title">🌳 Sanjay Gandhi National Park & Air Quality</h3>
        <div className="env-sgnp-grid">
          <div className="env-sgnp-card">
            <span className="sgnp-icon">🌲</span>
            <h4>104 sq km Green Cover</h4>
            <p>SGNP acts as the lungs of Mumbai, absorbing CO₂ and releasing oxygen for the northern suburbs.</p>
          </div>
          <div className="env-sgnp-card">
            <span className="sgnp-icon">💨</span>
            <h4>AQI Buffer Zone</h4>
            <p>Areas bordering SGNP like Borivali and Kandivali West consistently record lower AQI than eastern industrial zones.</p>
          </div>
          <div className="env-sgnp-card">
            <span className="sgnp-icon">🌡️</span>
            <h4>Temperature Regulation</h4>
            <p>The park reduces urban heat island effect by up to 3°C in surrounding neighbourhoods.</p>
          </div>
          <div className="env-sgnp-card">
            <span className="sgnp-icon">⚠️</span>
            <h4>Encroachment Threat</h4>
            <p>Over 50,000 families live on the park's boundary. Encroachment remains the biggest threat to its air quality benefits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Environment;