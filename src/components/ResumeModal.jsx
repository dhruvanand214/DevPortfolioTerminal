import React, { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  const resumePath = '/New_Resume.pdf'; // Path to the PDF in the public folder

  return (
    <div className="resume-modal-overlay">
      <div className="resume-modal-container">
        <TerminalWindow 
          title="~/documents/New_Resume.pdf" 
          onClose={onClose}
          showStatusBar
          statusItems={['PDF Viewer', 'v1.0', '100%']}
          bodyClassName="full-screen-body"
          draggable={false}
        >
          <div className="resume-content-wrap pdf-view">
            {!isMobile ? (
              <iframe 
                src={`${resumePath}#view=FitH`} 
                title="Resume PDF"
                className="resume-pdf-iframe"
              />
            ) : (
              <div className="resume-mobile-placeholder">
                <div className="mobile-icon">📄</div>
                <h3>Resume Viewer</h3>
                <p>PDF embedding is limited on mobile devices for better performance.</p>
                <a href={resumePath} target="_blank" rel="noopener noreferrer" className="resume-btn primary-mobile">
                  <span className="btn-prefix">$</span> open_in_new_tab
                </a>
              </div>
            )}
            
            <div className="resume-actions fade-in">
              <a href={resumePath} download="Dhruv_Anand_Resume.pdf" className="resume-btn">
                <span className="btn-prefix">$</span> download --force
              </a>
              <button className="resume-btn secondary" onClick={onClose}>
                <span className="btn-prefix">$</span> exit
              </button>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default ResumeModal;
