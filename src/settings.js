import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './WT2.css';

const Settings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: 'Advait',
    email: 'advait@mumbaiconnect.in',
    notifications: true,
    photo: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [id]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="settings-wrapper">
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
        <NavLink to="/digidocs">DigiDocs</NavLink>
        <NavLink to="/environment">AQI</NavLink>
      </nav>

      <div className="container">
        <h2>Account Settings</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Manage your MumbaiConnect profile and preferences.
        </p>

        <form className="basic-form" onSubmit={handleSubmit} noValidate>
          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleChange}
          />

          <label>Display Name</label>
          <input
            type="text"
            id="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="toggle-group">
            <input
              type="checkbox"
              id="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            <label htmlFor="notifications">Enable Push Notifications</label>
          </div>

          <button type="submit" className="btn-primary">Save Changes</button>
        </form>

        {showSuccess && (
          <div className="save-success">
            ✅ Settings saved successfully.
          </div>
        )}

        <hr />

        <h2>Account Management</h2>
        <div className="account-actions">
          <button className="btn-secondary">Add / Switch Account</button>
          <button
            className="btn-danger"
            onClick={() => navigate('/login')}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;