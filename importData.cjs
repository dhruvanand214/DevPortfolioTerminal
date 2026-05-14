const fs = require('fs');
const { execSync } = require('child_process');

const fallbackProjects = [
  {
    _id: 'project-1',
    _type: 'project',
    name: 'EventLedger',
    techLabel: 'MERN Stack Architecture',
    file: 'event-ledger.exe',
    description: 'A high-concurrency event tracking system built for real-time data synchronization and complex search operations.',
    features: [
      'JWT-secured authentication with custom middleware',
      'Real-time data synchronization across clients',
      'Optimized MongoDB indexing — query response times reduced from 1.2s to under 200ms'
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: '#',
    liveLink: 'https://eventledger.vercel.app/',
    impact: [
      { _key: 'i1', label: 'Events Tracked', value: '1M+' },
      { _key: 'i2', label: 'Query Speed', value: '<200ms' },
      { _key: 'i3', label: 'Uptime', value: '99.9%' },
      { _key: 'i4', label: 'Active Users', value: '500+' }
    ],
    stars: 128,
    forks: 23,
    views: '2.4k'
  },
  {
    _id: 'project-2',
    _type: 'project',
    name: 'GhostKitchen',
    techLabel: 'Full Stack Delivery System',
    file: 'ghost-kitchen.exe',
    description: 'An end-to-end order management engine with a custom workflow state machine for real-time status updates.',
    features: [
      'Custom workflow state machine for order lifecycle management',
      'Unified admin dashboard automating 10+ manual tasks',
      'Increased operational efficiency by 35%'
    ],
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'Redux'],
    link: '#',
    liveLink: 'https://ghost-kitchen-frontend.vercel.app/',
    impact: [
      { _key: 'i1', label: 'Orders/Day', value: '5k+' },
      { _key: 'i2', label: 'Efficiency', value: '+35%' },
      { _key: 'i3', label: 'Tasks Auto', value: '10+' },
      { _key: 'i4', label: 'Restaurants', value: '50+' }
    ],
    stars: 85,
    forks: 12,
    views: '1.2k'
  },
  {
    _id: 'project-3',
    _type: 'project',
    name: 'Mega Blog Platform',
    techLabel: 'React.js (2025)',
    file: 'mega-blog.exe',
    description: 'A full-stack blog platform with CRUD operations, authentication, and real-time database powered by Appwrite.',
    features: [
      'React Hook Form for validation and clean form architecture',
      'Appwrite backend for real-time database and auth',
      'Responsive UI with reusable component design patterns'
    ],
    tech: ['React', 'Appwrite', 'React Hook Form', 'CSS'],
    link: '#',
    impact: [
      { _key: 'i1', label: 'Daily Readers', value: '10k+' },
      { _key: 'i2', label: 'Articles', value: '500+' },
      { _key: 'i3', label: 'Load Time', value: '0.8s' },
      { _key: 'i4', label: 'Bounce Rate', value: '25%' }
    ],
    stars: 210,
    forks: 45,
    views: '8.9k'
  },
  {
    _id: 'project-4',
    _type: 'project',
    name: 'Weather API Dashboard',
    techLabel: 'Frontend Data Viz',
    file: 'weather-dash.exe',
    description: 'A performance-focused weather dashboard integrating third-party APIs with graphical data representation.',
    features: [
      'Configured Webpack & Babel for efficient bundling',
      'Implemented debounced search queries reducing API load',
      'Custom SVG charting for temperature trends'
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    link: '#',
    impact: [
      { _key: 'i1', label: 'API Calls/Day', value: '50k+' },
      { _key: 'i2', label: 'Bundle Size', value: '45kb' },
      { _key: 'i3', label: 'Locations', value: '200k+' },
      { _key: 'i4', label: 'Accuracy', value: '99%' }
    ],
    stars: 65,
    forks: 8,
    views: '3.1k'
  }
];

const fallbackExperiences = [
  {
    _id: 'exp-1',
    _type: 'experience',
    role: 'Associate Software Engineer',
    company: 'Tech Mahindra',
    location: 'Pune, India',
    period: 'Aug 2023 — Present',
    file: 'tech-mahindra.ts',
    highlights: [
      { _key: 'h1', text: 'Engineered a frontend optimization strategy using OnPush Change Detection and Lazy Loading, resulting in a measurable 20% increase in Core Web Vitals.', keywords: ['OnPush Change Detection', 'Lazy Loading', '20%'] },
      { _key: 'h2', text: 'Spearheaded the migration of 100+ legacy AngularJS components to Angular 14+, reducing the codebase size by 15% and eliminating critical security vulnerabilities.', keywords: ['100+ legacy AngularJS', 'Angular 14+', '15%'] },
      { _key: 'h3', text: 'Architected a centralized Reusable Component Library used by 3 separate project teams, slashing feature development time by 25%.', keywords: ['Reusable Component Library', '3 separate project teams', '25%'] },
      { _key: 'h4', text: 'Identified and patched a recursive memory leak using Chrome DevTools profiling, preventing application crashes for 5,000+ active users.', keywords: ['Chrome DevTools', '5,000+ active users'] },
      { _key: 'h5', text: 'Optimized backend-to-frontend data flow by implementing RxJS-based state management, reducing redundant API calls by 40%.', keywords: ['RxJS-based state management', '40%'] }
    ]
  },
  {
    _id: 'exp-2',
    _type: 'experience',
    role: 'Frontend Developer Intern',
    company: 'Growth India',
    location: 'Remote',
    period: 'Sep 2022 — Nov 2022',
    file: 'growth-india.ts',
    highlights: [
      { _key: 'h1', text: 'Built responsive UI modules using HTML, CSS, JavaScript, and Bootstrap for the company\'s web platform.', keywords: ['HTML, CSS, JavaScript', 'Bootstrap'] },
      { _key: 'h2', text: 'Improved UI layout, page structure, and mobile experience to enhance user engagement across devices.', keywords: ['mobile experience', 'user engagement'] },
      { _key: 'h3', text: 'Integrated PHP backend APIs for dynamic content rendering, bridging the frontend-backend interface.', keywords: ['PHP backend APIs', 'dynamic content rendering'] },
      { _key: 'h4', text: 'Identified and resolved UI defects, improving stability and overall performance.', keywords: ['UI defects', 'stability'] }
    ]
  }
];

const fallbackCategories = [
  {
    _id: 'skill-1',
    _type: 'skillCategory',
    name: 'ls frontend/',
    title: 'Frontend Development',
    skills: [
      { _key: 's1', name: 'Angular (14–17)', icon: '🅰️' },
      { _key: 's2', name: 'React.js', icon: '⚛️' },
      { _key: 's3', name: 'TypeScript', icon: '🔷' },
      { _key: 's4', name: 'RxJS', icon: '🔄' },
      { _key: 's5', name: 'Tailwind CSS', icon: '🎨' },
      { _key: 's6', name: 'HTML / CSS / ES6+', icon: '🌐' }
    ]
  },
  {
    _id: 'skill-2',
    _type: 'skillCategory',
    name: 'ls backend/',
    title: 'Backend Architecture',
    skills: [
      { _key: 's1', name: 'Node.js', icon: '🟢' },
      { _key: 's2', name: 'Express.js', icon: '⚡' },
      { _key: 's3', name: 'REST API Design', icon: '🔗' },
      { _key: 's4', name: 'Spring Boot', icon: '🍃' }
    ]
  },
  {
    _id: 'skill-3',
    _type: 'skillCategory',
    name: 'ls databases/',
    title: 'Database Systems',
    skills: [
      { _key: 's1', name: 'MongoDB', icon: '🍃' },
      { _key: 's2', name: 'MySQL', icon: '🐬' },
      { _key: 's3', name: 'PostgreSQL', icon: '🐘' }
    ]
  },
  {
    _id: 'skill-4',
    _type: 'skillCategory',
    name: 'ls devops-tools/',
    title: 'DevOps & Tools',
    skills: [
      { _key: 's1', name: 'Git / GitHub', icon: '📦' },
      { _key: 's2', name: 'Docker', icon: '🐳' },
      { _key: 's3', name: 'Jira', icon: '📋' },
      { _key: 's4', name: 'Postman', icon: '📮' },
      { _key: 's5', name: 'Webpack / Vite', icon: '⚡' }
    ]
  },
  {
    _id: 'skill-5',
    _type: 'skillCategory',
    name: 'ls testing/',
    title: 'Quality Assurance',
    skills: [
      { _key: 's1', name: 'Jasmine', icon: '🧪' },
      { _key: 's2', name: 'Karma', icon: '⚙️' },
      { _key: 's3', name: 'Unit Testing', icon: '✅' },
      { _key: 's4', name: 'Integration Testing', icon: '🔬' }
    ]
  }
];

const allDocs = [...fallbackProjects, ...fallbackExperiences, ...fallbackCategories];
const ndjson = allDocs.map(doc => JSON.stringify(doc)).join('\n');

fs.writeFileSync('./portfolio/data.ndjson', ndjson);

console.log('NDJSON created. Running import...');
try {
  execSync('npx sanity dataset import data.ndjson portfio-studio --replace', { cwd: './portfolio', stdio: 'inherit' });
  console.log('Import successful!');
} catch (e) {
  console.error('Import failed', e);
}
