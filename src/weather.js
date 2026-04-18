import React from 'react';
import { NavLink } from 'react-router-dom';
import './WT1.css';

const Weather = () => {
  const forecast = [
    { day: 'Mon', icon: '☀️', high: 33, low: 27 },
    { day: 'Tue', icon: '⛅', high: 32, low: 26 },
    { day: 'Wed', icon: '🌧️', high: 29, low: 25 },
    { day: 'Thu', icon: '🌧️', high: 28, low: 25 },
    { day: 'Fri', icon: '⛅', high: 30, low: 26 },
    { day: 'Sat', icon: '☀️', high: 31, low: 27 },
    { day: 'Sun', icon: '☀️', high: 32, low: 27 },
  ];

  return (
    <div className="weather-wrapper">
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/weather">Weather</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/infrastructure">Infrastructure</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/healthcare">Healthcare</NavLink>
        <NavLink to="/digidocs">DigiDocs</NavLink>
        <NavLink to="/environment">AQI</NavLink>
      </nav>

      <div className="container">
        <h2>Mumbai Weather</h2>

        <div className="weather-widget">
          <div className="current-weather">
            <div className="temp-block">
              <h1>32°C</h1>
              <p>🌤️ Partly Cloudy</p>
            </div>
            <div className="details-grid">
              <div><strong>Feels Like</strong><p>36°C</p></div>
              <div><strong>Humidity</strong><p>75%</p></div>
              <div><strong>Wind</strong><p>14 km/h SW</p></div>
              <div><strong>UV Index</strong><p>8 (Very High)</p></div>
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem' }}>7-Day Forecast</h3>
        <div className="forecast-strip">
          {forecast.map((item) => (
            <div className="forecast-day" key={item.day}>
              <h4>{item.day}</h4>
              <p>{item.icon}</p>
              <p>{item.high}° / {item.low}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;