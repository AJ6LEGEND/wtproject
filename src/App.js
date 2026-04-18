import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Global Styles
import './WT1.css'; 
import './index.css'; // Keeping this if you have standard React boiler plate styles here

// Import all your components
import Home from './1';           
import About from './2';          
import Contact from './3';        
import Weather from './weather';
import Reports from './reports';
import Games from './games';
import Settings from './settings';
import Infrastructure from './infrastructure';
import News from './news';
import Healthcare from './healthcare';
import DigiDocs from './digidocs'; 
import Login from './login';
import Environment from './environment';
import PublicSafety from './safety';
import CityMap from './map';
import Education from './education';
import SchoolEvents from './events';
import ErrorPage from './error';

function App() {
  return (
    <Router>
      <div className="App page-wrapper">
        
        {/* GLOBAL NAVIGATION BAR */}
        <nav className="global-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/map">City Map</NavLink>
          <NavLink to="/games">City Games</NavLink>

          {/* Services Dropdown */}
          <div className="dropdown">
            <span className="nav-label">Services ▾</span>
            <div className="dropdown-content">
              <NavLink to="/healthcare">Healthcare</NavLink>
              <NavLink to="/infrastructure">Infrastructure</NavLink>
              <NavLink to="/digidocs">DigiDocs</NavLink>
              <NavLink to="/reports">Citizen Reports</NavLink>
              <NavLink to="/education">School</NavLink>
            </div>
          </div>

          {/* Live Updates Dropdown */}
          <div className="dropdown">
            <span className="nav-label">Live Updates ▾</span>
            <div className="dropdown-content">
              <NavLink to="/weather">Weather</NavLink>
              <NavLink to="/environment">Environment (AQI)</NavLink>
              <NavLink to="/news">News & Alerts</NavLink>
              <NavLink to="/events">Educational Events</NavLink>
            </div>
          </div>

          {/* Help & Safety Dropdown */}
          <div className="dropdown">
            <span className="nav-label">Help & Safety ▾</span>
            <div className="dropdown-content">
              <NavLink to="/safety">Public Safety</NavLink>
              <NavLink to="/contact">Emergency Contact</NavLink>
            </div>
          </div>

          {/* User Account Dropdown */}
          <div className="dropdown">
            <span className="nav-label">Account ▾</span>
            <div className="dropdown-content">
              <NavLink to="/settings">Settings</NavLink>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT ROUTING */}
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/1.html" element={<Home />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Feature Pages */}
          <Route path="/weather" element={<Weather />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/games" element={<Games />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/news" element={<News />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/digidocs"       element={<DigiDocs />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/environment"  element={<Environment />} />
          <Route path="/safety" element={<PublicSafety />} />
          <Route path="/map" element={<CityMap />} />
          <Route path="/education" element={<Education />} />
          <Route path="/events" element={<SchoolEvents />} />
          
          {/* Error / 404 Page */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>

      </div>
    </Router>
  );
}

export default App;