import React, { useState } from 'react';
import axios from 'axios'; // Import axios for backend connection
import './WT1.css';

const Reports = ({ user }) => { // Receiving user prop from App.js
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    description: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category)
      newErrors.category = 'Please select an issue category.';
    if (!formData.location.trim())
      newErrors.location = 'Please enter a location or landmark.';
    if (!formData.description.trim())
      newErrors.description = 'Please describe the issue.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Use FormData to handle the image file upload
      const data = new FormData();
      data.append('user_id', user?.id); // Link to logged-in user
      data.append('category', formData.category);
      data.append('location', formData.location);
      data.append('description', formData.description);
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      const response = await axios.post('http://localhost:5000/api/reports', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setTicketNum(response.data.ticketNumber);
      setSubmitted(true);
    } catch (err) {
      setErrors({ server: 'Failed to submit report. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reports-wrapper">
      <div className="container">
        <h2>Report a Civic Issue</h2>
        <p style={{ marginBottom: '2rem' }}>
          Help us keep Mumbai clean and safe. Submit an issue directly to the BMC.
        </p>

        {!submitted ? (
          <form className="basic-form" onSubmit={handleSubmit} noValidate>

            <label>Issue Category</label>
            <select id="category" value={formData.category} onChange={handleChange}>
              <option value="">-- Select Category --</option>
              <option value="pothole">Pothole</option>
              <option value="garbage">Garbage / Solid Waste</option>
              <option value="streetlight">Broken Streetlight</option>
              <option value="water">Water Leakage</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                ⚠️ {errors.category}
              </p>
            )}

            <label>Location (Area / Landmark)</label>
            <input
              type="text"
              id="location"
              placeholder="e.g. S.V. Road, near Borivali Station"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                ⚠️ {errors.location}
              </p>
            )}

            <label>Description</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                ⚠️ {errors.description}
              </p>
            )}

            <label>Upload Photo (JPG/PNG) — Optional</label>
            <input
              type="file"
              id="photo"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
            />

            {errors.server && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '1rem' }}>
                ⚠️ {errors.server}
              </p>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        ) : (
          <div className="ticket-msg">
            <h3>✅ Report Submitted!</h3>
            <p>Your tracking ticket number is: <strong>{ticketNum}</strong></p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Please save this number for future reference. 
              Our ground team will inspect the site soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;