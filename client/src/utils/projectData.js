import imgCrm     from '../assets/projects/crm.png';
import imgLumiere  from '../assets/projects/lumiere.png';
import imgCampus   from '../assets/projects/campustick.png';
import imgWeather  from '../assets/projects/weather.png';
import imgTodo     from '../assets/projects/todo.png';

const URLS = {
  crm:     { github: 'https://github.com/Mr-Zenn/FUTURE_FS_02',     live: 'https://future-fs-02-xi-cyan.vercel.app/login' },
  lumiere: { github: 'https://github.com/Mr-Zenn/FUTURE_FS_03',     live: 'https://future-fs-03-sandy.vercel.app/' },
  campus:  { github: 'https://github.com/Mr-Zenn/campustick',        live: 'https://campustick.vercel.app/' },
  weather: { github: 'https://github.com/Mr-Zenn/weather-dashboard', live: 'https://weather-dashboard-beige-nu.vercel.app/' },
  todo:    { github: 'https://github.com/Mr-Zenn/todo-app',          live: 'https://todo-app-one-orpin-85.vercel.app/' },
};

export const LOCAL_META = {
  'CRM System': {
    image: imgCrm, githubLink: URLS.crm.github, liveLink: URLS.crm.live,
    category: 'Full Stack', featured: true,
  },
  'Restaurant Reservation System (Lumi\u00e8re)': {
    image: imgLumiere, githubLink: URLS.lumiere.github, liveLink: URLS.lumiere.live,
    category: 'Full Stack', featured: true,
  },
  'CampusTick': {
    image: imgCampus, githubLink: URLS.campus.github, liveLink: URLS.campus.live,
    category: 'Full Stack', featured: true,
  },
  'Weather Dashboard': {
    image: imgWeather, githubLink: URLS.weather.github, liveLink: URLS.weather.live,
    category: 'Frontend', featured: false,
  },
  'Todo App': {
    image: imgTodo, githubLink: URLS.todo.github, liveLink: URLS.todo.live,
    category: 'Frontend', featured: false,
  },
};

const LOCAL_META_NORMALIZED = Object.fromEntries(
  Object.entries(LOCAL_META).map(([k, v]) => [k.trim().toLowerCase(), v])
);

export const FALLBACK_PROJECTS = [
  {
    _id: null, title: 'CRM System', category: 'Full Stack', featured: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Socket.io'],
    githubLink: URLS.crm.github, liveLink: URLS.crm.live, image: imgCrm,
    description: 'Enterprise-grade CRM platform with real-time analytics, automated workflows, lead management, and customizable reporting dashboards.',
  },
  {
    _id: null, title: 'Restaurant Reservation System (Lumi\u00e8re)', category: 'Full Stack', featured: true,
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Tailwind CSS', 'Nodemailer'],
    githubLink: URLS.lumiere.github, liveLink: URLS.lumiere.live, image: imgLumiere,
    description: 'Elegant restaurant reservation platform with table management, real-time availability, and automated confirmation emails.',
  },
  {
    _id: null, title: 'CampusTick', category: 'Full Stack', featured: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'QR Code'],
    githubLink: URLS.campus.github, liveLink: URLS.campus.live, image: imgCampus,
    description: 'Campus event ticketing system with QR code generation, attendance tracking, and multi-gateway payment support.',
  },
  {
    _id: null, title: 'Weather Dashboard', category: 'Frontend', featured: false,
    techStack: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'CSS Modules'],
    githubLink: URLS.weather.github, liveLink: URLS.weather.live, image: imgWeather,
    description: 'Modern weather application with real-time forecasts, interactive maps, and location-based alerts.',
  },
  {
    _id: null, title: 'Todo App', category: 'Frontend', featured: false,
    techStack: ['React', 'TypeScript', 'React DnD', 'Styled Components'],
    githubLink: URLS.todo.github, liveLink: URLS.todo.live, image: imgTodo,
    description: 'Feature-rich task management app with drag-and-drop, priority levels, dark mode, and local storage persistence.',
  },
];

const applyLocalMeta = (p) => {
  const local = LOCAL_META[p.title] || LOCAL_META_NORMALIZED[p.title?.trim().toLowerCase()];
  if (!local) return p;
  return {
    ...p,
    image:      local.image      || p.image,
    githubLink: local.githubLink || p.githubLink || null,
    liveLink:   local.liveLink   || p.liveLink   || null,
    category:   local.category,
    featured:   local.featured   ?? p.featured,
  };
};

/** Merges API projects with local meta, appends any missing fallbacks. API always wins on duplicates. */
export const buildProjectList = (apiProjects = []) => {
  const merged = apiProjects.map(applyLocalMeta);
  const apiTitles = new Set(merged.map((p) => p.title?.trim().toLowerCase()));
  const missing = FALLBACK_PROJECTS.filter((p) => !apiTitles.has(p.title?.trim().toLowerCase()));
  return [...merged, ...missing];
};
