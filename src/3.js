import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './WT1.css';

const Contact = () => {
  const [toast, setToast] = useState({ show: false, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // 1. Copy to Clipboard logic
  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        setToast({ show: true, message: `📋 ${number} copied!` });
        setTimeout(() => setToast({ show: false, message: '' }), 2000);
      })
      .catch(() => {
        setToast({ show: true, message: 'Could not copy.' });
        setTimeout(() => setToast({ show: false, message: '' }), 2000);
      });
  };

  // 2. Form Submission logic with regex validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex for: Only alphabets (allowing spaces for full names)
    const nameRegex = /^[A-Za-z\s]+$/;
    
    // Regex for: @ followed by .com or .co.in at the end
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.in)$/;

    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!nameRegex.test(formData.name)) {
      alert('Name must only contain alphabets (no numbers or special characters).');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email ending in .com or .co.in (e.g., user@example.com)');
      return;
    }
    if (!formData.message.trim()) {
      alert('Please write a message.');
      return;
    }

    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace('Field', '');
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="contact-wrapper">
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
      </nav>

      {toast.show && (
        <div className="copy-toast" style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: '#333', color: '#fff', padding: '0.6rem 1.4rem', borderRadius: '20px',
          zIndex: 999, display: 'block'
        }}>
          {toast.message}
        </div>
      )}

      <div className="container">
        <h2>Emergency Helpline Directory</h2>
        <p style={{ marginTop: '0.4rem', color: '#888', fontSize: '0.9rem' }}>
          Click any card to copy the number.
        </p>

        <div className="directory" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { label: 'Police', num: '100' },
            { label: 'Fire Brigade', num: '101' },
            { label: 'Ambulance', num: '108' },
            { label: 'BMC Helpline', num: '1916' },
            { label: 'Women\'s Helpline', num: '1091' },
            { label: 'Traffic Police', num: '8454999999' }
          ].map((item) => (
            <div 
              key={item.num}
              className="contact-card" 
              onClick={() => copyToClipboard(item.num)}
              style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}
            >
              <h3>{item.label}</h3>
              <p><strong>{item.num}</strong></p>
            </div>
          ))}
        </div>

        <div className="ward-office" style={{ marginTop: '3rem', padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <h2>R/Central Ward Office (Borivali)</h2>
          <p><strong>Address:</strong> Chandavarkar Road, Borivali West, Mumbai, Maharashtra 400092</p>
          <p><strong>Contact:</strong> 022-28946000</p>
          <p><strong>Timings:</strong> 10:30 AM to 5:30 PM (Closed on Sundays and Public Holidays)</p>
        </div>

        <h2 style={{ marginTop: '3rem' }}>Feedback Form</h2>
        
        {!submitted ? (
          <form className="feedback-form" onSubmit={handleSubmit} noValidate>
            <input type="text" id="nameField" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
            <input type="email" id="emailField" placeholder="Your Email" value={formData.email} onChange={handleInputChange} />
            <textarea rows="5" id="messageField" placeholder="Your Message or Complaint" value={formData.message} onChange={handleInputChange}></textarea>
            <button type="submit" className="btn-primary">Submit Feedback</button>
          </form>
        ) : (
          <div className="success-msg" style={{ display: 'block', background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
            ✅ Thank you! Your feedback has been submitted. We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;