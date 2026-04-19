import React, { useState } from 'react';
import './WT5.css';

const Education = () => {
  const [filter, setFilter] = useState({ board: 'All', type: 'All' });

  const institutions = [
    { name: "Ryan International", type: "School", board: "ICSE", area: "Borivali (E)", rating: "4.5", address: "Gokulanand, IC Colony" },
    { name: "St. Francis D'Assisi", type: "School", board: "SSC", area: "Borivali (W)", rating: "4.7", address: "Mt. Poinsur, Laxman Mhatre Rd" },
    { name: "Don Bosco High School", type: "School", board: "SSC", area: "Borivali (W)", rating: "4.6", address: "L.T. Road, Borivali West" },
    { name: "MPSTME, NMIMS", type: "College", board: "University", area: "Vile Parle", rating: "4.8", address: "Bhakti Vedant Swami Marg" },
    { name: "Poddar International", type: "School", board: "CBSE", area: "Powai", rating: "4.4", address: "Near Hiranandani Hospital" }
  ];

  const filteredData = institutions.filter(item => {
    return (filter.board === 'All' || item.board === filter.board) &&
           (filter.type === 'All' || item.type === filter.type);
  });

  return (
    <div className="education-hub container">
      <header className="page-header">
        <h1>🎓 Education Hub</h1>
        <p>Finding the best schools and colleges in Mumbai.</p>
      </header>

      {/* Filters Section */}
      <div className="filter-bar">
        <select onChange={(e) => setFilter({...filter, board: e.target.value})}>
          <option value="All">All Boards</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="SSC">SSC</option>
        </select>

        <select onChange={(e) => setFilter({...filter, type: e.target.value})}>
          <option value="All">All Types</option>
          <option value="School">School</option>
          <option value="College">College</option>
        </select>
      </div>

      {/* Grid of Cards */}
      <div className="card-grid">
        {filteredData.map((inst, index) => (
          <div key={index} className="edu-card">
            <div className="rating-badge">⭐ {inst.rating}</div>
            <h3>{inst.name}</h3>
            <p><strong>Type:</strong> {inst.type} ({inst.board})</p>
            <p><strong>Area:</strong> {inst.area}</p>
            <p className="address">📍 {inst.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;