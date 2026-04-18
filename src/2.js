import React from 'react';
import { NavLink } from 'react-router-dom';
import './WT1.css'; 

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="container">
        <h2>About MumbaiConnect</h2>
        <p>
          MumbaiConnect is a smart city citizen portal dedicated to the residents of Mumbai. 
          Our aim is to bridge the gap between citizens and local administration by providing 
          real-time data, quick access to civic services, and a unified platform for community engagement.
        </p>

        <h2 style={{ marginTop: '3rem' }}>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="photo-placeholder"></div>
            <h3>Advait</h3>
          </div>
          <div className="team-card">
            <div className="photo-placeholder"></div>
            <h3>Shlok</h3>
          </div>
          <div className="team-card">
            <div className="photo-placeholder"></div>
            <h3>Ayaan</h3>
          </div>
          <div className="team-card">
            <div className="photo-placeholder"></div>
            <h3>Shubham</h3>
          </div>
        </div>

        <div className="tech-stack" style={{ marginTop: '2rem' }}>
          <h2>Tech Stack</h2>
          <p>ReactJS, HTML5, CSS3, JavaScript, NodeJS, MySQL</p>
        </div>

        <div className="timeline" style={{ marginTop: '2rem' }}>
          <h2>Project Timeline</h2>
          <ul>
            <li><strong>Phase 1:</strong> Initial Planning and Figma Wireframing</li>
            <li><strong>Phase 2:</strong> Core HTML/CSS Structure Setup</li>
            <li><strong>Phase 3:</strong> React Integration and Routing</li>
            <li><strong>Phase 4:</strong> Final Deployment for Borivali Ward</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;