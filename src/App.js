import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Styles
import './index.css'; 

// Import all your components
import Home from './1';           // Assuming 1.js is Home
import About from './2';          // Assuming 2.js is About
import Contact from './3';        // Assuming 3.js is Contact
import Weather from './weather';
import Reports from './reports';
import Games from './games';
import Settings from './settings';
import Infrastructure from './infrastructure';
import News from './news';
import Healthcare from './healthcare'; // If you created this earlier
import ErrorPage from './error';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/1.html" element={<Home />} /> {/* For backward compatibility */}
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

          {/* Error / 404 Page */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;