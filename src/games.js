import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './WT1.css';

const questions = [
  {
    id: 'q1',
    text: '1. Which station is the northern terminus of the Western Railway suburban network?',
    options: [
      { label: 'Virar', correct: false },
      { label: 'Dahanu Road', correct: true },
      { label: 'Palghar', correct: false },
    ],
  },
  {
    id: 'q2',
    text: "2. What was the original name of Veermata Jijabai Bhosale Udyan (Byculla Zoo)?",
    options: [
      { label: 'Albert Gardens', correct: false },
      { label: 'Edward Park', correct: false },
      { label: 'Victoria Gardens', correct: true },
    ],
  },
  {
    id: 'q3',
    text: "3. Which of these was NOT one of the original Seven Islands of Bombay?",
    options: [
      { label: 'Parel', correct: false },
      { label: 'Mahim', correct: false },
      { label: 'Trombay', correct: true },
    ],
  },
  {
    id: 'q4',
    text: '4. In which year did the first passenger train run between Bori Bunder and Thane?',
    options: [
      { label: '1857', correct: false },
      { label: '1853', correct: true },
      { label: '1881', correct: false },
    ],
  },
  {
    id: 'q5',
    text: '5. What is the former name of the historic August Kranti Maidan?',
    options: [
      { label: 'Gowalia Tank Maidan', correct: true },
      { label: 'Cross Maidan', correct: false },
      { label: 'Esplanade', correct: false },
    ],
  },
  {
    id: 'q6',
    text: '6. The Elephanta Caves are situated on an island originally known by local fishermen as:',
    options: [
      { label: 'Gharapuri', correct: true },
      { label: 'Khanderi', correct: false },
      { label: 'Butcher Island', correct: false },
    ],
  },
  {
    id: 'q7',
    text: '7. Which architect designed the Chhatrapati Shivaji Maharaj Terminus (CSMT)?',
    options: [
      { label: 'George Wittet', correct: false },
      { label: 'F.W. Stevens', correct: true },
      { label: 'John Begg', correct: false },
    ],
  },
  {
    id: 'q8',
    text: '8. Which of these lakes is situated entirely within the Mumbai city limits?',
    options: [
      { label: 'Tansa', correct: false },
      { label: 'Bhatsa', correct: false },
      { label: 'Tulsi', correct: true },
    ],
  },
  {
    id: 'q9',
    text: "9. Mumbai's oldest surviving standing fort structure is:",
    options: [
      { label: 'Bombay Castle', correct: true },
      { label: 'Bandra Fort (Castella de Aguada)', correct: false },
      { label: 'Sewri Fort', correct: false },
    ],
  },
  {
    id: 'q10',
    text: '10. The Asiatic Society of Mumbai Town Hall was completed in which decade?',
    options: [
      { label: '1800s', correct: false },
      { label: '1830s', correct: true },
      { label: '1860s', correct: false },
    ],
  },
];

const Games = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [unanswered, setUnanswered] = useState([]);

  const handleSelect = (questionId, correct) => {
    setAnswers({ ...answers, [questionId]: correct });
    // Clear highlight for that question once answered
    setUnanswered((prev) => prev.filter((id) => id !== questionId));
  };

  const handleSubmit = () => {
    // Find which question IDs have no answer yet
    const missed = questions
      .map((q) => q.id)
      .filter((id) => answers[id] === undefined);

    if (missed.length > 0) {
      setUnanswered(missed);
      // Scroll to first unanswered question
      document.getElementById(missed[0])?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const total = Object.values(answers).filter(Boolean).length;
    setScore(total);
  };

  return (
    <div className="games-wrapper">
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
        <h2>The Ultimate Mumbai Quiz</h2>
        <p style={{ marginBottom: '2rem' }}>Test your knowledge about the city of dreams!</p>

        {unanswered.length > 0 && (
          <p style={{
            color: 'red', background: '#fff0f0',
            border: '1px solid #ffcccc', borderRadius: '6px',
            padding: '0.7rem 1rem', marginBottom: '1.5rem', fontSize: '0.9rem'
          }}>
            ⚠️ Please answer all questions before submitting.
            Question{unanswered.length > 1 ? 's' : ''}{' '}
            <strong>{unanswered.map((id) => id.replace('q', '#')).join(', ')}</strong>{' '}
            {unanswered.length > 1 ? 'are' : 'is'} unanswered.
          </p>
        )}

        {score === null ? (
          <div className="quiz-container">
            {questions.map((q) => (
              <div
                id={q.id}
                className="quiz-q"
                key={q.id}
                style={{
                  border: unanswered.includes(q.id)
                    ? '2px solid red'
                    : '1px solid transparent',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  transition: 'border 0.2s',
                }}
              >
                <p><strong>{q.text}</strong></p>
                {q.options.map((opt) => (
                  <label key={opt.label} style={{ display: 'block', marginBottom: '0.3rem' }}>
                    <input
                      type="radio"
                      name={q.id}
                      onChange={() => handleSelect(q.id, opt.correct)}
                    />{' '}
                    {opt.label}
                  </label>
                ))}
              </div>
            ))}

            <button
              className="btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <div style={{
            marginTop: '2rem', padding: '2rem',
            background: '#e2f0d9', border: '1px solid #c5e0b4', borderRadius: '4px'
          }}>
            <h3 style={{ color: '#385723' }}>Quiz Completed!</h3>
            <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
              Your score is: <strong>{score} / 10</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;