import { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 40, delay = 0, onComplete = null, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (!completed) {
      setCompleted(true);
      onComplete && onComplete();
    }
  }, [started, displayedText, text, speed, completed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {started && !completed && <span className="cursor" />}
    </span>
  );
};

export default TypingEffect;
