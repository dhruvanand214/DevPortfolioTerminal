import { useState, useEffect } from 'react';
import './Loader.css';

const bootMessages = [
  "Initializing system kernel...",
  "Loading core modules: [ OK ]",
  "Mounting virtual disk: [ OK ]",
  "Resolving dependencies...",
  "Fetching project data...",
  "Compiling assets: [ DONE ]",
  "Starting DevEnvironment..."
];

const Loader = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let delay = 0;
    bootMessages.forEach((msg, index) => {
      delay += Math.random() * 200 + 100; // 100-300ms per line
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (index === bootMessages.length - 1) {
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500); // Wait for fade out animation
          }, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className={`loader-container ${!visible ? 'fade-out' : ''}`}>
      <div className="loader-terminal">
        {messages.map((msg, idx) => (
          <div key={idx} className="loader-line">
            {msg.includes('[ OK ]') || msg.includes('[ DONE ]') ? (
              <>
                <span className="loader-success">
                  {msg.match(/\[ OK \]|\[ DONE \]/)[0]}
                </span>
                {msg.replace(/\[ OK \]|\[ DONE \]/, '')}
              </>
            ) : (
              msg
            )}
          </div>
        ))}
        {messages.length < bootMessages.length && (
          <div className="loader-line">
            <span className="loader-cursor">█</span>
          </div>
        )}
        {messages.length === bootMessages.length && (
          <div className="loader-line success-text">
            System ready.
            <span className="loader-cursor">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
