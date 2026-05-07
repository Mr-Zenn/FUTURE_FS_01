import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript,
  SiTypescript, SiGit, SiDocker, SiTailwindcss, SiPostman,
} from 'react-icons/si';
import { FiCode, FiDatabase, FiLayout, FiServer } from 'react-icons/fi';

const SKILLS = [
  { icon: <SiReact />,       label: 'React',       color: '#61dafb' },
  { icon: <SiNodedotjs />,   label: 'Node.js',     color: '#68a063' },
  { icon: <SiMongodb />,     label: 'MongoDB',     color: '#47a248' },
  { icon: <SiExpress />,     label: 'Express',     color: '#888' },
  { icon: <SiJavascript />,  label: 'JavaScript',  color: '#f7df1e' },
  { icon: <SiTypescript />,  label: 'TypeScript',  color: '#3178c6' },
  { icon: <SiGit />,         label: 'Git',         color: '#f05032' },
  { icon: <SiTailwindcss />, label: 'Tailwind',    color: '#38bdf8' },
  { icon: <SiDocker />,      label: 'Docker',      color: '#2496ed' },
  { icon: <SiPostman />,     label: 'Postman',     color: '#ff6c37' },
];

const TIMELINE = [
  {
    year: '2022',
    title: 'Started Web Development',
    desc: 'Began learning HTML, CSS, and JavaScript fundamentals. Built first static websites.',
    icon: <FiCode />,
  },
  {
    year: '2023',
    title: 'Mastered React & Node.js',
    desc: 'Deep-dived into the MERN stack. Built full-stack apps with authentication and REST APIs.',
    icon: <FiServer />,
  },
  {
    year: '2023',
    title: 'Database & Backend Architecture',
    desc: 'Learned MongoDB, schema design, aggregation pipelines, and production-grade Express patterns.',
    icon: <FiDatabase />,
  },
  {
    year: '2024',
    title: 'Production Projects',
    desc: 'Shipped CRM System and Lumière Restaurant Reservation platform used by real clients.',
    icon: <FiLayout />,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const About = () => (
  <div className="about-v2">
    {/* Intro */}
    <section className="about-v2__intro page-section">
      <motion.div {...fadeUp()}>
        <p className="section-eyebrow">Who I am</p>
        <h1 className="section-title-v2">About <span>Me</span></h1>
      </motion.div>

      <div className="about-v2__bio-grid">
        <motion.div className="about-v2__bio" {...fadeUp(0.1)}>
          <p>
            I’m a full-stack developer who loves turning complex problems into elegant,
            scalable solutions. I specialize in the MERN stack and care deeply about
            code quality, developer experience, and shipping products that matter.
          </p>
          <p>
            Outside of coding, I explore system design, contribute to open source,
            and constantly push myself to learn something new every week.
          </p>

          <div className="about-v2__stats">
            {[['2+', 'Years Exp.', '#7c3aed'], ['10+', 'Projects', '#3178c6'], ['5+', 'Clients', '#47a248']].map(([val, lbl, accent]) => (
              <div key={lbl} className="about-stat" style={{ '--stat-accent': accent }}>
                <span className="about-stat__val">{val}</span>
                <span className="about-stat__lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="skills-v2" {...fadeUp(0.15)}>
          <h3 className="skills-v2__heading">Tech Stack</h3>
          <div className="skills-v2__grid">
            {SKILLS.map(({ icon, label, color }, i) => (
              <motion.div
                key={label}
                className="skill-chip"
                style={{ '--skill-color': color }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
              >
                <span className="skill-chip__icon">{icon}</span>
                <span className="skill-chip__label">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Timeline */}
    <section className="timeline-section page-section">
      <motion.div {...fadeUp()}>
        <p className="section-eyebrow">My Journey</p>
        <h2 className="section-title-v2">Learning <span>Timeline</span></h2>
      </motion.div>

      <div className="timeline">
        {TIMELINE.map(({ year, title, desc, icon }, i) => (
          <motion.div
            key={i}
            className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="timeline__card">
              <div className="timeline__icon">{icon}</div>
              <span className="timeline__year">{year}</span>
              <h4 className="timeline__title">{title}</h4>
              <p className="timeline__desc">{desc}</p>
            </div>
            <div className="timeline__dot" />
          </motion.div>
        ))}
        <div className="timeline__line" />
      </div>
    </section>
  </div>
);

export default About;
