import { useState } from 'react';
import './Workflow.css';

const WORKFLOW_STEPS = [
  {
    id: 1,
    title: 'Discovery & Planning',
    file: '01_discovery_&_planning.ts',
    desc: 'Understanding business logic, user needs, and defining the architecture roadmap before coding.',
    features: [
      'Requirements gathering',
      'System architecture design',
      'Tech stack selection',
      'Creating product roadmaps'
    ],
    icon: '🔍',
    tabName: 'planning.ts'
  },
  {
    id: 2,
    title: 'Design & UX',
    file: '02_design_&_ux.ts',
    desc: 'Crafting intuitive user interfaces with a focus on accessibility and modern aesthetics.',
    features: [
      'Wireframing & Prototyping',
      'Design System creation',
      'User journey mapping',
      'Interactive mockups via Figma'
    ],
    icon: '✨',
    tabName: 'design.tsx'
  },
  {
    id: 3,
    title: 'Development',
    file: '03_development.ts',
    desc: 'Writing clean, scalable, and accessible code to bring the defined experiences to life.',
    features: [
      'Frontend architectural setup',
      'Component-driven development',
      'State management integration',
      'Backend API integration'
    ],
    icon: '💻',
    tabName: 'development.ts'
  },
  {
    id: 4,
    title: 'Content Integration',
    file: '04_content_integration.ts',
    desc: 'Structuring the content architecture for product messaging, localization, and SEO.',
    features: [
      'Dynamic CMS integration',
      'SEO metadata optimization',
      'Asset delivery optimization',
      'Copywriting alignment'
    ],
    icon: '📄',
    tabName: 'content.json'
  },
  {
    id: 5,
    title: 'Testing & QA',
    file: '05_testing_&_qa.ts',
    desc: 'Cross-device testing, performance audits, and rigorous edge-case polishing.',
    features: [
      'Unit & Integration Testing',
      'Lighthouse performance scores',
      'Cross-browser compatibility',
      'Security payload validation'
    ],
    icon: '🐛',
    tabName: 'testing.test.ts'
  },
  {
    id: 6,
    title: 'Launch',
    file: '06_launch.ts',
    desc: 'Deploying the application with zero downtime and final production configurations.',
    features: [
      'CI/CD pipeline execution',
      'Environment variable securement',
      'DNS & Domain routing',
      'Production smoke tests'
    ],
    icon: '🚀',
    tabName: 'docker.yml'
  },
  {
    id: 7,
    title: 'Iteration & Growth',
    file: '07_iteration_&_growth.ts',
    desc: 'Monitoring analytics, gathering user feedback, and scaling the codebase actively.',
    features: [
      'User behavior analytics',
      'Continuous feature updates',
      'Scaling infrastructure',
      'A/B testing flows'
    ],
    icon: '📈',
    tabName: 'analytics.config.js'
  }
];

const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const currentStep = WORKFLOW_STEPS[activeStep];
  const progressPercent = ((activeStep + 1) / WORKFLOW_STEPS.length) * 100;

  return (
    <section className="workflow section" id="process">
      <div className="container">
        <div className="workflow-intro">
          <div className="section-label">PROCESS</div>
          <h2 className="section-title">
            From Idea <br />
            <span className="accent workflow-title-hollow">to Launch</span>
          </h2>
          <p className="workflow-subtitle">
            A structured workflow designed for clarity, scale, and long-term maintainability.
          </p>
        </div>

        {/* The IDE Interface */}
        <div className="workflow-ide fade-in">
          
          {/* Left Sidebar */}
          <aside className="wf-sidebar">
            <div className="wf-sidebar-header">
              <div className="wf-window-controls">
                <span />
                <span />
                <span />
              </div>
              <div className="wf-sidebar-title">
                STEPS
              </div>
            </div>
            
            <ul className="wf-step-list">
              {WORKFLOW_STEPS.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <li 
                    key={step.id} 
                    className={`wf-step-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="wf-step-num">
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <span className="wf-step-name">{step.title}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Main Content Pane */}
          <main className="wf-main">
            
            {/* Top Editor Tabs */}
            <div className="wf-tabs">
              <div className="wf-tab active">
                <span className="wf-tab-icon">#</span> {currentStep.tabName}
              </div>
              <div className="wf-tab inactive">
                package.json
              </div>
              <div className="wf-tab-spacer"></div>
              <div className="wf-encoding">TS UTF-8</div>
            </div>

            <div className="wf-content-area">
              
              {/* Breadcrumb */}
              <div className="wf-breadcrumb">
                workflow / steps / <span className="highlight">{currentStep.file}</span>
              </div>

              {/* Progress Bar */}
              <div className="wf-progress-container">
                <div className="wf-progress-labels">
                  <span className="wf-progress-step">Step {activeStep + 1} / {WORKFLOW_STEPS.length}</span>
                  <span className="wf-progress-percent">{Math.round(progressPercent)}%</span>
                </div>
                <div className="wf-progress-track">
                  <div 
                    className="wf-progress-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Step Cards UI */}
              <div className="wf-cards-viewport">
                <div className="wf-cards-track" style={{ transform: `translateX(-${activeStep * 100}%)` }}>
                  {WORKFLOW_STEPS.map((step) => (
                    <div key={step.id} className="wf-card-wrapper">
                      <div className="wf-step-card">
                        <div className="wf-card-header">
                          <span className="wf-card-indicator">
                            {String(step.id).padStart(2, '0')} / {String(WORKFLOW_STEPS.length).padStart(2, '0')}
                          </span>
                        </div>
                        
                        <h3 className="wf-card-title">{step.title}</h3>
                        <p className="wf-card-desc">{step.desc}</p>
                        
                        <div className="wf-card-tag">FEATURES</div>
                        <ul className="wf-card-features">
                          {step.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </main>
        </div>

      </div>
    </section>
  );
};

export default Workflow;
