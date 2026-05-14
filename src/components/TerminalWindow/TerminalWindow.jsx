import React, { useState, useRef, useEffect } from 'react';
import './TerminalWindow.css';

const TerminalWindow = ({
  title = '~/portfolio',
  children,
  tabs = null,
  activeTab = 0,
  onTabChange = null,
  showStatusBar = false,
  statusItems = [],
  className = '',
  bodyClassName = '',
  draggable = true,
  onClose = null
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'ubuntu' ? 'default' : 'ubuntu';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleMouseDown = (e) => {
    if (!draggable || e.button !== 0 || e.target.closest('button')) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`terminal-window ${className} ${isDragging ? 'dragging' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, position: 'relative', zIndex: isDragging ? 50 : 1 }}
    >
      {/* Title Bar */}
      <div 
        className="terminal-titlebar"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="terminal-dots">
          <span 
            className="terminal-dot red" 
            onClick={onClose} 
            style={{ cursor: onClose ? 'pointer' : 'default' }}
            title={onClose ? "Close" : ""}
          />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="terminal-title">{title}</span>
        <div className="terminal-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            title="Toggle Theme"
          >
            <span className="icon-mac">🍎</span>
            <span className="icon-ubuntu">🐧</span>
          </button>
          <span style={{ display: 'flex', alignItems: 'center' }}>⌘</span>
        </div>
      </div>

      {/* Tabs */}
      {tabs && (
        <div className="terminal-tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`terminal-tab ${index === activeTab ? 'active' : ''}`}
              onClick={() => onTabChange && onTabChange(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <div className={`terminal-body ${bodyClassName}`}>
        {children}
      </div>

      {/* Status Bar */}
      {showStatusBar && (
        <div className="terminal-statusbar">
          <div className="status-left">
            <span className="status-indicator">connected</span>
          </div>
          <div className="status-right">
            {statusItems.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalWindow;
