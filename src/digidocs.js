import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './WT3.css';

const defaultDocs = [
  { id: 'aadhaar', label: 'Aadhaar Card',   icon: '🪪', number: '', file: null },
  { id: 'pan',     label: 'PAN Card',        icon: '💳', number: '', file: null },
  { id: 'driving', label: 'Driving Licence', icon: '🚗', number: '', file: null },
  { id: 'ration',  label: 'Ration Card',     icon: '📋', number: '', file: null },
  { id: 'voter',   label: 'Voter ID',        icon: '🗳️', number: '', file: null },
];

const DigiDocs = () => {
  const [docs, setDocs]             = useState(defaultDocs);
  const [viewingId, setViewingId]   = useState(null);
  const [uploadData, setUploadData] = useState({ docType: '', number: '', file: null });
  const [uploadErrors, setUploadErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDownload = (doc) => {
    alert(`Downloading ${doc.label}...\n(In a real app this would download the file.)`);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!uploadData.docType)       errors.docType = 'Please select a document type.';
    if (!uploadData.number.trim()) errors.number  = 'Please enter the document number.';
    if (!uploadData.file)          errors.file    = 'Please select a file to upload.';
    setUploadErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setDocs((prev) =>
      prev.map((d) =>
        d.id === uploadData.docType
          ? { ...d, number: uploadData.number, file: uploadData.file }
          : d
      )
    );

    setUploadSuccess(true);
    setUploadData({ docType: '', number: '', file: null });
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="digi-wrapper">
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
        <h2>📁 DigiDocs — Document Wallet</h2>
        <p className="digi-subtitle">
          Securely store and access your important documents.
        </p>

        {/* ════ DOCUMENT CARDS ════ */}
        <div className="digi-grid">
          {docs.map((doc) => (
            <div className="digi-card" key={doc.id}>
              <div className="digi-card-top">
                <span className="digi-icon">{doc.icon}</span>
                <h3>{doc.label}</h3>
              </div>
              <p className={`digi-status ${doc.file ? 'uploaded' : ''}`}>
                {doc.file ? `✅ Uploaded · ${doc.number}` : 'Not uploaded yet'}
              </p>
              <div className="digi-card-actions">
                <button
                  className="digi-btn-view"
                  disabled={!doc.file}
                  onClick={() => setViewingId(viewingId === doc.id ? null : doc.id)}
                >
                  {viewingId === doc.id ? 'Close' : 'View'}
                </button>
                <button
                  className="digi-btn-download"
                  disabled={!doc.file}
                  onClick={() => handleDownload(doc)}
                >
                  Download
                </button>
              </div>

              {/* ── Inline View Panel ── */}
              {viewingId === doc.id && doc.file && (
                <div className="digi-view-panel">
                  <p><strong>Document Type:</strong> {doc.label}</p>
                  <p><strong>Document Number:</strong> {doc.number}</p>
                  <p><strong>File Name:</strong> {doc.file.name}</p>
                  <p><strong>File Size:</strong> {(doc.file.size / 1024).toFixed(1)} KB</p>
                  <button
                    className="digi-view-close"
                    onClick={() => setViewingId(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ════ UPLOAD SECTION ════ */}
        <div className="digi-upload-section">
          <h3>⬆️ Upload / Update Document</h3>

          <form onSubmit={handleUploadSubmit} noValidate>
            <div className="digi-upload-field">
              <label>Document Type</label>
              <select
                value={uploadData.docType}
                onChange={(e) => {
                  setUploadData({ ...uploadData, docType: e.target.value });
                  setUploadErrors({ ...uploadErrors, docType: '' });
                }}
              >
                <option value="">-- Select Document --</option>
                {defaultDocs.map((d) => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
              {uploadErrors.docType && (
                <span className="digi-upload-error">⚠️ {uploadErrors.docType}</span>
              )}
            </div>

            <div className="digi-upload-field">
              <label>Document Number</label>
              <input
                type="text"
                placeholder="e.g. XXXX-XXXX-XXXX"
                value={uploadData.number}
                onChange={(e) => {
                  setUploadData({ ...uploadData, number: e.target.value });
                  setUploadErrors({ ...uploadErrors, number: '' });
                }}
              />
              {uploadErrors.number && (
                <span className="digi-upload-error">⚠️ {uploadErrors.number}</span>
              )}
            </div>

            <div className="digi-upload-field">
              <label>Upload File (PDF / JPG / PNG)</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  setUploadData({ ...uploadData, file: e.target.files[0] });
                  setUploadErrors({ ...uploadErrors, file: '' });
                }}
              />
              {uploadErrors.file && (
                <span className="digi-upload-error">⚠️ {uploadErrors.file}</span>
              )}
            </div>

            <button type="submit" className="digi-submit-btn">
              Submit / Update Document
            </button>
          </form>

          {uploadSuccess && (
            <div className="digi-upload-success">
              ✅ Document uploaded! The card above has been updated.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigiDocs;