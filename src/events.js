import React, { useState } from 'react';
import './WT5.css';

const Competitions = () => {
  const [category, setCategory] = useState('All');

  const events = [
    { title: "Mumbai Science Fair", date: "May 15, 2026", venue: "Nehru Science Centre", age: "12-18", cat: "Academic" },
    { title: "Inter-School Football Cup", date: "June 02, 2026", venue: "St. Francis Ground", age: "10-16", cat: "Sports" },
    { title: "Devayug Junior Hackathon", date: "July 10, 2026", venue: "Online / NMIMS Hub", age: "15-19", cat: "Academic" },
    { title: "Kala Ghoda Youth Fest", date: "May 20, 2026", venue: "Fort, Mumbai", age: "All Ages", cat: "Cultural" }
  ];

  const filteredEvents = events.filter(ev => category === 'All' || ev.cat === category);

  return (
    <div className="competitions-portal container">
      <header className="page-header">
        <h1>🏆 Competitions & Events</h1>
        <p>Stay updated with inter-school events and scholarship drives.</p>
      </header>

      <div className="filter-tabs">
        {['All', 'Sports', 'Academic', 'Cultural'].map(cat => (
          <button 
            key={cat} 
            className={`tab-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="event-list">
        {filteredEvents.map((ev, index) => (
          <div key={index} className="event-item">
            <div className="event-date">
              <span className="date-box">{ev.date.split(' ')[1].replace(',', '')}</span>
              <span className="month-box">{ev.date.split(' ')[0]}</span>
            </div>
            <div className="event-info">
              <h3>{ev.title} <span className="cat-tag">{ev.cat}</span></h3>
              <p>📍 {ev.venue} | 👥 Age: {ev.age}</p>
            </div>
            <button className="register-btn">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competitions;