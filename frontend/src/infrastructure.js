import React, { useState } from 'react';
import './WT3.css';

const projects = [
  {
    id: 1,
    category: 'developed',
    badge: 'Developed',
    badgeClass: 'badge-developed',
    title: 'Bandra Kurla Complex (BKC)',
    desc: 'Premier commercial hub with smart grid integration and wide transit corridors.',
    progress: null,
  },
  {
    id: 2,
    category: 'construction',
    badge: 'Under Construction',
    badgeClass: 'badge-construction',
    title: 'Mumbai Coastal Road',
    desc: 'An 8-lane grade separated expressway along the western coastline.',
    progress: 85,
  },
  {
    id: 3,
    category: 'rehab',
    badge: 'Rehabilitation Phase 2',
    badgeClass: 'badge-rehab',
    title: 'Dharavi Redevelopment',
    desc: 'Sector 3 residential tower planning and temporary transit camp setup.',
    progress: null,
  },
  {
    id: 4,
    category: 'construction',
    badge: 'Under Construction',
    badgeClass: 'badge-construction',
    title: 'Metro Line 3 (Aqua Line)',
    desc: 'Fully underground metro corridor connecting Colaba-Bandra-SEEPZ.',
    progress: 92,
  },
  {
    id: 5,
    category: 'developed',
    badge: 'Developed',
    badgeClass: 'badge-developed',
    title: 'Eastern Freeway',
    desc: 'Controlled-access highway connecting South Mumbai with the Eastern Suburbs.',
    progress: null,
  },
];

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Developed Areas', value: 'developed' },
  { label: 'Under Construction', value: 'construction' },
  { label: 'Slum Rehabilitation', value: 'rehab' },
];

const Infrastructure = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <div className="infra-wrapper">


      <div className="container">
        <h2>🏗️ Mumbai Smart Infrastructure</h2>
        <p>Track the development, construction, and rehabilitation zones across the city.</p>

        <div className="infra-filters">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`infra-filter-btn ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="infra-grid">
          {filtered.map((project) => (
            <div className="infra-card" key={project.id}>
              <span className={`infra-badge ${project.badgeClass}`}>
                {project.badge}
              </span>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              {project.progress !== null && (
                <div className="infra-progress-wrapper">
                  <div
                    className="infra-progress-fill"
                    style={{ width: `${project.progress}%` }}
                  >
                    {project.progress}%
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;