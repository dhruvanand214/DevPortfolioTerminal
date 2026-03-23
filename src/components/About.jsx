import TerminalWindow from './TerminalWindow';
import './About.css';

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-label">about me</div>
        <h2 className="section-title">
          The Dev <span className="accent">Behind the Code</span>
        </h2>
        <p className="about-subtitle">
          A quick look under the hood — who I am, what I do, and where I come from.
        </p>

        <div className="about-grid">
          <TerminalWindow
            title="~/portfolio — bash"
            showStatusBar
            statusItems={['UTF-8', 'bash', 'zsh 5.9']}
          >
            {/* whoami */}
            <div className="terminal-line">
              <div className="terminal-prompt">
                <span className="terminal-user">dhruv</span>
                <span className="terminal-separator">@</span>
                <span className="terminal-path">portfolio</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-command">whoami</span>
              </div>
              <div className="terminal-output">
                Dhruv Anand — Full Stack Developer (Angular | React)
              </div>
            </div>

            {/* cat about.txt */}
            <div className="terminal-line">
              <div className="terminal-prompt">
                <span className="terminal-user">dhruv</span>
                <span className="terminal-separator">@</span>
                <span className="terminal-path">portfolio</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-command">cat about.txt</span>
              </div>
              <div className="terminal-output">
                High-performance Full Stack Developer with 2+ years of experience
                specializing in Angular and the MERN stack. Expert in engineering
                scalable frontend architectures and modernizing legacy enterprise
                systems. Proven track record of reducing technical debt by 30% and
                improving application load speeds by 20% through advanced performance
                tuning. Awarded "Digital Warrior" for delivering production-ready
                features with zero-defect deployment.
              </div>
            </div>

            {/* cat education.txt */}
            <div className="terminal-line">
              <div className="terminal-prompt">
                <span className="terminal-user">dhruv</span>
                <span className="terminal-separator">@</span>
                <span className="terminal-path">portfolio</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-command">cat education.txt</span>
              </div>
              <div className="terminal-output">
                <div className="education-output">
                  <span className="edu-degree">B.Tech in Computer Science and Engineering</span>
                  <span className="edu-school">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</span>
                  <span className="edu-details">2019 — 2023 | CGPA: 8.4/10</span>
                </div>
              </div>
            </div>

            {/* neofetch style */}
            <div className="terminal-line">
              <div className="terminal-prompt">
                <span className="terminal-user">dhruv</span>
                <span className="terminal-separator">@</span>
                <span className="terminal-path">portfolio</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-command">echo $LOCATION</span>
              </div>
              <div className="terminal-output">
                📍 Pune, India
              </div>
            </div>

            <div className="terminal-line">
              <div className="terminal-prompt">
                <span className="terminal-user">dhruv</span>
                <span className="terminal-separator">@</span>
                <span className="terminal-path">portfolio</span>
                <span className="terminal-dollar">$</span>
                <span className="cursor" />
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Stats */}
        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-value">2+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100+</div>
            <div className="stat-label">Components Migrated</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">30%</div>
            <div className="stat-label">Tech Debt Reduced</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">5000+</div>
            <div className="stat-label">Users Impacted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
