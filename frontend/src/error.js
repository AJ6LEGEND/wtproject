import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WT3.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
  <div className="error-page">
    <h1>404!</h1>
    <p>Oops, this area is not covered yet!</p>
    <button onClick={() => navigate('/')}>To Home</button>
  </div>
  );
};

export default ErrorPage;