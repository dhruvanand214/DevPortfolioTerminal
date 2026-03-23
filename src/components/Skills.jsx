import { useState } from 'react';
import './Skills.css';

const skillCategories = [
  {
    id: 'frontend',
    name: 'ls frontend/',
    title: 'Frontend Development',
    skills: [
      { name: 'Angular (14–17)', icon: '🅰️' },
      { name: 'React.js', icon: '⚛️' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'RxJS', icon: '🔄' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'HTML / CSS / ES6+', icon: '🌐' },
    ]
  },
  {
    id: 'backend',
    name: 'ls backend/',
    title: 'Backend Architecture',
    skills: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '⚡' },
      { name: 'REST API Design', icon: '🔗' },
      { name: 'Spring Boot', icon: '🍃' },
    ]
  },
  {
    id: 'databases',
    name: 'ls databases/',
    title: 'Database Systems',
    skills: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'PostgreSQL', icon: '🐘' },
    ]
  },
  {
    id: 'devops',
    name: 'ls devops-tools/',
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git / GitHub', icon: '📦' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Jira', icon: '📋' },
      { name: 'Postman', icon: '📮' },
      { name: 'Webpack / Vite', icon: '⚡' },
    ]
  },
  {
    id: 'testing',
    name: 'ls testing/',
    title: 'Quality Assurance',
    skills: [
      { name: 'Jasmine', icon: '🧪' },
      { name: 'Karma', icon: '⚙️' },
      { name: 'Unit Testing', icon: '✅' },
      { name: 'Integration Testing', icon: '🔬' },
    ]
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="section-label">capabilities</div>
        <h2 className="section-title">
          Tech <span className="accent">Stack</span>
        </h2>
        <p className="skills-subtitle">
          Tools and technologies I work with daily.
        </p>

        <div className="skills-ide-layout">
          {/* Left Sidebar - Terminal Commands */}
          <div className="skills-sidebar">
            <div className="skills-sidebar-header">
              <div className="skills-sidebar-dots">
                <span /><span /><span />
              </div>
              <span className="skills-sidebar-title">~/portfolio/skills — bash</span>
            </div>
            
            <div className="skills-categories">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  className={`skills-category-btn ${activeCategory.id === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span className="cmd-prompt">$</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Skill Cards */}
          <div className="skills-content">
            <div className="skills-content-header">
              <span>{`> Output: ${activeCategory.id}/`}</span>
            </div>
            
            <div className="skills-content-body">
              <div className="skills-grid" key={activeCategory.id}>
                {activeCategory.skills.map((skill) => (
                  <div key={skill.name} className="skill-card">
                    <span className="skill-icon">{skill.icon}</span>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Bar */}
            <div className="skills-statusbar">
              <div className="skills-statusbar-left">
                <span>
                  <span className="circle-indicator"></span>
                  System Online
                </span>
                <span>{activeCategory.skills.length} items</span>
              </div>
              <div className="skills-statusbar-right">
                <span>UTF-8</span>
                <span>React JSX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
