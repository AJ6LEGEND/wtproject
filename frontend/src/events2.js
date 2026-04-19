import React, { useState } from 'react';
import './WT6.css';

const Events = () => {
  const [filter, setFilter] = useState('All');

  const cityEvents = [
    { title: "Mumbai Midnight Marathon", date: "May 05, 2026", type: "Sports", location: "Bandra-Worli Sea Link", target: "All" },
    { title: "Sanjay Gandhi Park Yoga", date: "Every Sunday", type: "Health", location: "Borivali East", target: "Seniors" },
    { title: "Juhu Beach Cleanup Drive", date: "May 12, 2026", type: "Community", location: "Juhu Beach", target: "All" },
    { title: "Tech City Hackathon", date: "June 15, 2026", type: "Technology", location: "Andheri East", target: "Youth" },
    { title: "Senior Citizen Walking Club", date: "Daily 6 AM", type: "Sports", location: "Joggers Park, Borivali", target: "Seniors" }
  ];

  const filteredEvents = cityEvents.filter(ev => filter === 'All' || ev.type === filter);

  return (
    <div className="events-page container">
      <header className="page-header">
        <h1>📅 City Events</h1>
        <p>What's happening in Mumbai today?</p>
      </header>

      <div className="filter-group">
        {['All', 'Sports', 'Health', 'Community', 'Technology'].map(type => (
          <button 
            key={type} 
            className={filter === type ? 'active-btn' : 'plain-btn'}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map((ev, index) => (
          <div key={index} className="event-card">
            <span className="type-label">{ev.type}</span>
            <h3>{ev.title}</h3>
            <p className="event-detail">🕒 {ev.date}</p>
            <p className="event-detail">📍 {ev.location}</p>
            <div className="target-tag">For: {ev.target}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;