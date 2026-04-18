import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './WT3.css';

const newsData = [
  {
    id: 1,
    tag: 'Alert',
    tagClass: 'tag-alert',
    date: 'April 18, 2026',
    title: 'High Tide Warning: Marine Drive',
    short: 'Citizens are advised to avoid the Marine Drive promenade between 2:00 PM and 5:00 PM today due to expected high tides.',
    full: 'The IMD has issued an alert for a 4.5-meter high tide expected this afternoon. The Mumbai Police and BMC lifeguards have been deployed along the Marine Drive, Worli Sea Face, and Juhu Beach areas. Please follow barricades and official instructions. Emergency response teams are on standby.',
  },
  {
    id: 2,
    tag: 'BMC Update',
    tagClass: 'tag-bmc',
    date: 'April 17, 2026',
    title: 'Water Cut in Andheri East',
    short: 'A 15% water cut will be implemented in Andheri East tomorrow due to urgent pipeline maintenance near Marol.',
    full: 'The hydraulic engineer\'s department will be replacing a main valve on the primary supply line. The water cut will be effective from 10:00 AM to 10:00 PM. Residents of Marol, MIDC, and SEEPZ areas are requested to store sufficient water. Normal supply will resume by late evening.',
  },
  {
    id: 3,
    tag: 'Event',
    tagClass: 'tag-event',
    date: 'April 15, 2026',
    title: 'Kala Ghoda Art Walk This Sunday',
    short: 'Join the local heritage committee for a free guided art walk through the Kala Ghoda precinct.',
    full: 'Starting at the Jehangir Art Gallery at 8:00 AM, this 2-hour walking tour will cover the rich architectural history of South Mumbai, including the David Sassoon Library, Elphinstone College, and various street art installations. Registration is free but mandatory via the portal.',
  },
];

const News = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = newsData.filter((item) =>
    (item.title + item.short + item.full + item.tag)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="news-wrapper">
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
        <NavLink to="/healthcare">Healthcare</NavLink>
        <NavLink to="/digidocs">DigiDocs</NavLink>
        <NavLink to="/environment">AQI</NavLink>
      </nav>

      <div className="container">
        <h2>📰 News & Announcements</h2>
        <p>Stay updated with the latest happenings in Mumbai.</p>

        <input
          type="text"
          className="news-search"
          placeholder="Search by keyword (e.g., 'water', 'festival')..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="news-grid">
          {filtered.length > 0 ? filtered.map((item) => (
            <div className="news-card" key={item.id}>
              <div className="news-header">
                <span className={`news-tag ${item.tagClass}`}>{item.tag}</span>
                <span className="news-date">{item.date}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{expanded[item.id] ? item.full : item.short}</p>
              <button
                className="news-read-btn"
                onClick={() => toggleExpand(item.id)}
              >
                {expanded[item.id] ? 'Read Less' : 'Read More'}
              </button>
            </div>
          )) : (
            <p className="news-no-results">No results found for "{search}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;