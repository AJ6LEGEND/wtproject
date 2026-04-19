import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WT2.css';

// Added user and setUser props to stay in sync with App.js
const Settings = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Initialize state directly from the user prop
  const [formData, setFormData] = useState({
    displayName: user?.name || '',
    email: user?.email || '',
    notifications: true,
    photo: null,
  });

  const [previewUrl, setPreviewUrl] = useState(
    user?.profile_pic ? `http://localhost:5000/${user.profile_pic}` : null
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [id]: checked });
    } else if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      if (file) setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('userId', user.id);
      data.append('name', formData.displayName);
      if (formData.photo) {
        data.append('profilePic', formData.photo);
      }

      // 1. Update the Database
      const response = await axios.post('http://localhost:5000/api/update-profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // 2. Update LocalStorage & State with the new data from server
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings to database.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="settings-wrapper">
      <div className="container">
        <h2>Account Settings</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Manage your MumbaiConnect profile and preferences.
        </p>

        <form className="basic-form" onSubmit={handleSubmit} noValidate>

          {/* Fixed CSS class names (removed dots from string) */}
          <div className="avatar-upload">
            <div className="avatar-circle">
              {previewUrl
                ? <img src={previewUrl} alt="Profile" />
                : <span style={{ fontSize: '3rem' }}>👤</span>
              }
            </div>
            <label htmlFor="photoInput" className="file-input-label">
              Change Photo
            </label>
            <input
              type="file"
              id="photoInput"
              accept="image/jpeg, image/png"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </div>

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
            disabled
            style={{ background: '#f5f5f5', color: '#999', cursor: 'not-allowed' }}
          />
          <small style={{ color: '#aaa', marginTop: '-0.5rem' }}>
            Email cannot be changed.
          </small>

          <div className="toggle-group">
            <input
              type="checkbox"
              id="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            <label htmlFor="notifications">Enable Push Notifications</label>
          </div>

          {error && (
            <p style={{ color: 'red', fontSize: '0.85rem' }}>⚠️ {error}</p>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {showSuccess && (
          <div className="save-success">
            ✅ Settings saved successfully.
          </div>
        )}

        <hr />

        <h2>Account Management</h2>
        <div className="account-actions">
          <button className="btn-secondary" type="button">Add / Switch Account</button>
          <button className="btn-danger" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;