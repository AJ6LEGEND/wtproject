import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Combined these
import './WT1.css'; 

const Home = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata'
      };
      setTime(now.toLocaleString('en-IN', options) + ' IST');
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="home-wrapper">

      <header className="hero">
        <h1>MumbaiConnect</h1>
        <p>The beating heart of the city, now at your fingertips.</p>
        <p id="live-clock" style={{ fontSize: '1rem', marginTop: '0.5rem', opacity: '0.85' }}>
          {time}
        </p>
      </header>

      <section className="stats-bar">
        <div className="stat-item">
          <h3>21.3M</h3>
          <p>Population</p>
        </div>
        <div className="stat-item">
          <h3>112</h3>
          <p>AQI Today</p>
        </div>
        <div className="stat-item">
          <h3>430</h3>
          <p>Active Complaints</p>
        </div>
        <div className="stat-item">
          <h3>45</h3>
          <p>Events This Week</p>
        </div>
      </section>

      <section className="shortcuts">
        {}
        <Link to="/map" className="tile">🗺️ City Map</Link>
        <Link to="/weather" className="tile">🌤️ Weather</Link>
        <Link to="/digidocs" className="tile">📄 DigiDocs</Link>
        <Link to="/games" className="tile">🎮 Games</Link>
        <Link to="/healthcare" className="tile">🏥 Healthcare</Link>
      </section>
    </div>
  );
};

export default Home;