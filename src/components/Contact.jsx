import TerminalWindow from './TerminalWindow';
import './Contact.css';

const Contact = () => {
  return (
    <>
      <section className="contact section" id="contact">
        <div className="container">
          <div className="section-label">connect</div>
          <h2 className="section-title">
            Let's <span className="accent">Build Together</span>
          </h2>
          <p className="contact-subtitle">
            Open to opportunities, collaborations, and interesting conversations.
          </p>

          <div className="contact-content">
            {/* Left side - Info */}
            <div className="contact-info">
              <p className="contact-description">
                I'm always interested in hearing about new projects, opportunities,
                and collaborations. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>

              <div className="contact-links">
                <a
                  href="mailto:dhruvanand214@gmail.com"
                  className="contact-link-item"
                >
                  <span className="contact-link-icon">📧</span>
                  <div className="contact-link-details">
                    <span className="contact-link-label">Email</span>
                    <span className="contact-link-value">dhruvanand214@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/dhruv-anand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <span className="contact-link-icon">💼</span>
                  <div className="contact-link-details">
                    <span className="contact-link-label">LinkedIn</span>
                    <span className="contact-link-value">linkedin.com/in/dhruv-anand</span>
                  </div>
                </a>

                <a
                  href="https://github.com/dhruvanand214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <span className="contact-link-icon">🐙</span>
                  <div className="contact-link-details">
                    <span className="contact-link-label">GitHub</span>
                    <span className="contact-link-value">github.com/dhruvanand214</span>
                  </div>
                </a>

                <a
                  href="tel:+918273399918"
                  className="contact-link-item"
                >
                  <span className="contact-link-icon">📱</span>
                  <div className="contact-link-details">
                    <span className="contact-link-label">Phone</span>
                    <span className="contact-link-value">+91-8273399918</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right side - Terminal */}
            <div className="contact-terminal">
              <TerminalWindow
                title="~/contact — bash"
                showStatusBar
                statusItems={['connected', 'bash']}
              >
                <div className="terminal-line">
                  <div className="terminal-prompt">
                    <span className="terminal-user">dhruv</span>
                    <span className="terminal-separator">@</span>
                    <span className="terminal-path">portfolio</span>
                    <span className="terminal-dollar">$</span>
                    <span className="terminal-command">echo "Let's connect!"</span>
                  </div>
                  <div className="terminal-output">
                    Let's connect!
                  </div>
                </div>

                <div className="terminal-line">
                  <div className="terminal-prompt">
                    <span className="terminal-user">dhruv</span>
                    <span className="terminal-separator">@</span>
                    <span className="terminal-path">portfolio</span>
                    <span className="terminal-dollar">$</span>
                    <span className="terminal-command">cat availability.txt</span>
                  </div>
                  <div className="terminal-output">
                    ✅ Currently available for full-time roles
                    <br />🎯 Open to frontend & full-stack positions
                    <br />📍 Based in Pune, India
                    <br />🌍 Open to remote & hybrid opportunities
                  </div>
                </div>

                <div className="terminal-line">
                  <div className="terminal-prompt">
                    <span className="terminal-user">dhruv</span>
                    <span className="terminal-separator">@</span>
                    <span className="terminal-path">portfolio</span>
                    <span className="terminal-dollar">$</span>
                    <span className="terminal-command">echo $RESPONSE_TIME</span>
                  </div>
                  <div className="terminal-output">
                    Usually within 24 hours ⚡
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-built">
            Built with <span className="footer-heart">♥</span> by Dhruv Anand &copy; {new Date().getFullYear()}
          </div>
          <div className="footer-links">
            <a href="https://github.com/dhruvanand214" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/dhruv-anand" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:dhruvanand214@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
