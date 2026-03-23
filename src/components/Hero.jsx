import { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';
import './Hero.css';

const titles = [
  'Full Stack Developer',
  'Angular Specialist',
  'React Developer',
  'Frontend Architect',
];

const Hero = ({ onOpenResume }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [commands, setCommands] = useState([
    { cmd: '', response: '--- Interactive Session Started. Type "help" for a list of commands. ---' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim().toLowerCase();
      let response = '';
      
      if (cmd === 'help') {
        response = 'Available commands: whoami, skills, resume, clear. \n\n[SECRET TIPS]: Try typing "matrix" for the digital rain effect, or "sudo" to test your system access.';
      } else if (cmd === 'whoami') {
        response = 'guest user exploring DevPortfolio_v1.0';
      } else if (cmd === 'skills') {
        response = 'Angular, React, Node.js, MongoDB, Express';
      } else if (cmd === 'resume') {
        response = 'Launching resume.sh... Opening secure viewer.';
        onOpenResume();
      } else if (cmd === 'ls') {
        response = 'about.md  projects/  resume.md  skills.json';
      } else if (cmd === 'sudo') {
        response = 'Permission denied. This incident will be reported.';
      } else if (cmd === 'clear') {
        setCommands([]);
        setInputValue('');
        return;
      } else if (cmd !== '') {
        response = `Command not found: ${cmd}`;
      }

      if (cmd !== '') {
        setCommands(prev => [...prev, { cmd, response }]);
      }
      setInputValue('');
    }
  };

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && displayTitle === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayTitle === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayTitle(
          isDeleting
            ? currentTitle.slice(0, displayTitle.length - 1)
            : currentTitle.slice(0, displayTitle.length + 1)
        );
      }, isDeleting ? 30 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayTitle, isDeleting, titleIndex]);

  return (
    <section className="hero section" id="home">
      <div className="container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="prompt-symbol">~/</span>
            Hi there, I'm
          </div>

          <h1 className="hero-name">
            Dhruv<br />Anand
          </h1>

          <div className="hero-title">
            {displayTitle}
            <span className="typing-cursor" />
          </div>

          <p className="hero-description">
            Building <span className="highlight">scalable frontend architectures</span> and
            modernizing legacy enterprise systems. 2+ years of experience
            with <span className="highlight">Angular</span>, <span className="highlight">React</span>,
            and the <span className="highlight">MERN</span> stack.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="hero-cta primary">
              <span className="cta-prefix">$</span> view projects
            </a>
            <a
              href="https://github.com/dhruvanand214"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta secondary"
            >
              <span className="cta-prefix">$</span> open github
            </a>
            <button
              onClick={onOpenResume}
              className="hero-cta secondary"
            >
              <span className="cta-prefix">$</span> ./resume.pdf --view
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/dhruvanand214" target="_blank" rel="noopener noreferrer" className="hero-social-link">
              ◈ GitHub
            </a>
            <a href="https://linkedin.com/in/dhruv-anand" target="_blank" rel="noopener noreferrer" className="hero-social-link">
              ◈ LinkedIn
            </a>
            <a href="mailto:dhruvanand214@gmail.com" className="hero-social-link">
              ◈ Email
            </a>
          </div>
        </div>

        {/* Right - Terminal Code Preview */}
        <div className="hero-terminal">
          <TerminalWindow
            title="~/portfolio/developer.ts"
            showStatusBar
            statusItems={['UTF-8', 'TypeScript', 'Ln 1, Col 1']}
          >
            <div className="code-line">
              <span className="line-number">1</span>
              <span><span className="code-comment">{'// Developer Profile Configuration'}</span></span>
            </div>
            <div className="code-line">
              <span className="line-number">2</span>
              <span><span className="code-comment" style={{ opacity: 0.6 }}>{'// Hint: Interactive shell available below!'}</span></span>
            </div>
            <div className="code-line">
              <span className="line-number">3</span>
              <span>
                <span className="code-keyword">export const </span>
                <span className="code-function">developer</span>
                <span className="code-bracket"> = {'{'}</span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">4</span>
              <span>
                {'  '}<span className="code-property">name</span>
                <span className="code-bracket">: </span>
                <span className="code-string">"Dhruv Anand"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">5</span>
              <span>
                {'  '}<span className="code-property">role</span>
                <span className="code-bracket">: </span>
                <span className="code-string">"Full Stack Developer"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">6</span>
              <span>
                {'  '}<span className="code-property">location</span>
                <span className="code-bracket">: </span>
                <span className="code-string">"Pune, India"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">7</span>
              <span>
                {'  '}<span className="code-property">experience</span>
                <span className="code-bracket">: </span>
                <span className="code-string">"2+ years"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">8</span>
              <span>
                {'  '}<span className="code-property">specialization</span>
                <span className="code-bracket">: [</span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">9</span>
              <span>
                {'    '}<span className="code-string">"Angular"</span>,
                <span className="code-string"> "React"</span>,
                <span className="code-string"> "Node.js"</span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">10</span>
              <span>
                {'  '}<span className="code-bracket">],</span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">11</span>
              <span>
                {'  '}<span className="code-property">status</span>
                <span className="code-bracket">: </span>
                <span className="code-value">"Available for hire"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">12</span>
              <span><span className="code-bracket">{'}'}</span>;</span>
            </div>

            <div className="terminal-interaction" style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              {commands.map((c, i) => (
                <div key={i} className="terminal-line" style={{ marginBottom: '8px' }}>
                  <div>
                    <span className="terminal-user">guest@portfolio</span>
                    <span className="terminal-separator">:</span>
                    <span className="terminal-path">~</span>
                    <span className="terminal-dollar">$</span>
                    <span className="terminal-command" style={{ marginLeft: '8px' }}>{c.cmd}</span>
                  </div>
                  <div className="terminal-output" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{c.response}</div>
                </div>
              ))}
              <div className="terminal-line" style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                <span className="terminal-user">guest@portfolio</span>
                <span className="terminal-separator">:</span>
                <span className="terminal-path">~</span>
                <span className="terminal-dollar">$</span>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleCommand}
                  className="interactive-input"
                  placeholder="Type 'help' or 'matrix'..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    outline: 'none',
                    flex: 1,
                    marginLeft: '8px'
                  }}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
              <div className="terminal-tip" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '12px', opacity: 0.6 }}>
                💡 Tip: Try typing <span style={{ color: 'var(--accent-cyan)' }}>"matrix"</span> or <span style={{ color: 'var(--accent-cyan)' }}>"sudo"</span> anywhere on screen to find secrets!
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};

export default Hero;
