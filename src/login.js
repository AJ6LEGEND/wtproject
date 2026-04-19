import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import './WT2.css';

const Login = ({ setUser }) => {
  // 'login' | 'register' | 'forgot'
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [regData, setRegData] = useState({
    name: '', email: '', password: '', confirm: '', area: ''
  });
  const [regErrors, setRegErrors] = useState({});
  const [regSuccess, setRegSuccess] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co\.in)$/;
  const nameRegex  = /^[A-Za-z\s]+$/;

  // ── Login ──
  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginData.email.trim())             errors.email    = 'Email is required.';
    else if (!emailRegex.test(loginData.email)) errors.email = 'Enter a valid email.';
    if (!loginData.password.trim())          errors.password = 'Password is required.';
    
    setLoginErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: loginData.email,
          password: loginData.password
        });
        
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setLoginSuccess(true);
        setTimeout(() => navigate('/'), 1000);
      } catch (err) {
        setLoginErrors({ server: err.response?.data?.error || 'Invalid credentials' });
      }
    }
  };

  // ── Register ──
  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!regData.name.trim())               errors.name     = 'Name is required.';
    else if (!nameRegex.test(regData.name)) errors.name     = 'Name must only contain letters.';
    if (!regData.email.trim())              errors.email    = 'Email is required.';
    else if (!emailRegex.test(regData.email)) errors.email  = 'Enter a valid email.';
    if (!regData.password.trim())           errors.password = 'Password is required.';
    else if (regData.password.length < 6)   errors.password = 'Password must be at least 6 characters.';
    if (regData.confirm !== regData.password) errors.confirm = 'Passwords do not match.';
    // Area validation kept as per your original logic
    setRegErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:5000/api/register', {
          name: regData.name,
          email: regData.email,
          password: regData.password
        });
        setRegSuccess(true);
        // Automatically switch to login tab after registration success
        setTimeout(() => {
          setTab('login');
          setRegSuccess(false);
        }, 2000);
      } catch (err) {
        setRegErrors({ server: err.response?.data?.error || 'Registration failed' });
      }
    }
  };

  // ── Forgot ──
  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !emailRegex.test(forgotEmail)) {
      setForgotError('Enter a valid email address.');
      return;
    }
    setForgotError('');
    setForgotSuccess(true);
  };

  return (
    <div className="login-wrapper">
      <div className="auth-card">

        {/* ── Header ── */}
        <h2>MumbaiConnect</h2>
        <p>Borivali Ward Citizen Portal</p>

        {/* ── Tabs (hidden on forgot screen) ── */}
        {tab !== 'forgot' && (
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => { setTab('login'); setLoginSuccess(false); }}
            >
              Login
            </button>
            <button
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => { setTab('register'); setRegSuccess(false); }}
            >
              Register
            </button>
          </div>
        )}

        {/* ════ LOGIN FORM ════ */}
        {tab === 'login' && !loginSuccess && (
          <form onSubmit={handleLogin} noValidate>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                  setLoginErrors({ ...loginErrors, email: '' });
                }}
              />
              {loginErrors.email && <span className="auth-error">⚠️ {loginErrors.email}</span>}
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                  setLoginErrors({ ...loginErrors, password: '' });
                }}
              />
              {loginErrors.password && <span className="auth-error">⚠️ {loginErrors.password}</span>}
              {loginErrors.server && <span className="auth-error">⚠️ {loginErrors.server}</span>}
            </div>

            <button
              type="button"
              className="forgot-link"
              onClick={() => setTab('forgot')}
            >
              Forgot Password?
            </button>

            <button type="submit" className="auth-btn">Login</button>
          </form>
        )}

        {tab === 'login' && loginSuccess && (
          <div className="auth-success">
            ✅ Logged in successfully! Welcome back.
          </div>
        )}

        {/* ════ REGISTER FORM ════ */}
        {tab === 'register' && !regSuccess && (
          <form onSubmit={handleRegister} noValidate>
            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Advait Jawalikar"
                value={regData.name}
                onChange={(e) => {
                  setRegData({ ...regData, name: e.target.value });
                  setRegErrors({ ...regErrors, name: '' });
                }}
              />
              {regErrors.name && <span className="auth-error">⚠️ {regErrors.name}</span>}
            </div>

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={regData.email}
                onChange={(e) => {
                  setRegData({ ...regData, email: e.target.value });
                  setRegErrors({ ...regErrors, email: '' });
                }}
              />
              {regErrors.email && <span className="auth-error">⚠️ {regErrors.email}</span>}
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={regData.password}
                onChange={(e) => {
                  setRegData({ ...regData, password: e.target.value });
                  setRegErrors({ ...regErrors, password: '' });
                }}
              />
              {regErrors.password && <span className="auth-error">⚠️ {regErrors.password}</span>}
            </div>

            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={regData.confirm}
                onChange={(e) => {
                  setRegData({ ...regData, confirm: e.target.value });
                  setRegErrors({ ...regErrors, confirm: '' });
                }}
              />
              {regErrors.confirm && <span className="auth-error">⚠️ {regErrors.confirm}</span>}
              {regErrors.server && <span className="auth-error">⚠️ {regErrors.server}</span>}
            </div>

            <button type="submit" className="auth-btn">Create Account</button>
          </form>
        )}

        {tab === 'register' && regSuccess && (
          <div className="auth-success">
            ✅ Account created successfully! You can now login.
          </div>
        )}

        {/* ════ FORGOT PASSWORD ════ */}
        {tab === 'forgot' && !forgotSuccess && (
          <form onSubmit={handleForgot} noValidate>
            <h2 style={{ marginBottom: '0.3rem' }}>Reset Password</h2>
            <p style={{ marginBottom: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
              Enter your registered email and we'll send a reset link.
            </p>

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => {
                  setForgotEmail(e.target.value);
                  setForgotError('');
                }}
              />
              {forgotError && <span className="auth-error">⚠️ {forgotError}</span>}
            </div>

            <button type="submit" className="auth-btn">Send Reset Link</button>
            <br />
            <button
              type="button"
              className="forgot-link"
              style={{ marginTop: '1rem' }}
              onClick={() => { setTab('login'); setForgotSuccess(false); setForgotEmail(''); }}
            >
              ← Back to Login
            </button>
          </form>
        )}

        {tab === 'forgot' && forgotSuccess && (
          <>
            <div className="auth-info">
              📧 A password reset link has been sent to <strong>{forgotEmail}</strong>.
              Please check your inbox.
            </div>
            <button
              type="button"
              className="forgot-link"
              onClick={() => { setTab('login'); setForgotSuccess(false); setForgotEmail(''); }}
            >
              ← Back to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Login;