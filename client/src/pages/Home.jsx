import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTypescript,
} from 'react-icons/si';

/* ── Typewriter ── */
const ROLES = ['Full Stack Developer', 'MERN Specialist', 'UI/UX Enthusiast', 'Problem Solver'];

const Typewriter = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1800);
      return () => clearTimeout(t);
    }
    const current = ROLES[roleIdx];
    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      }
      setPaused(true);
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      }
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span className="typewriter">
      {displayed}
      <span className="typewriter__cursor" />
    </span>
  );
};

/* ── Floating tech icon ── */
const FLOAT_ICONS = [
  { icon: <SiReact />,      color: '#61dafb', top: '15%',  left: '1%'   },
  { icon: <SiNodedotjs />,  color: '#68a063', top: '20%',  right: '1%'  },
  { icon: <SiMongodb />,    color: '#47a248', bottom: '32%', left: '1%' },
  { icon: <SiExpress />,    color: '#aaa',    bottom: '20%', right: '1%' },
  { icon: <SiJavascript />, color: '#f7df1e', top: '60%',  left: '2%'  },
  { icon: <SiTypescript />, color: '#3178c6', top: '48%',  right: '2%' },
];

/* ── Scroll indicator ── */
const ScrollIndicator = () => (
  <motion.div
    className="scroll-indicator"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
  >
    <motion.div
      className="scroll-indicator__dot"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />
  </motion.div>
);

/* ── Main ── */
const Home = () => (
    <section className="hero-v2">
      {/* Animated gradient orbs */}
      <div className="hero-v2__orb hero-v2__orb--1" />
      <div className="hero-v2__orb hero-v2__orb--2" />
      <div className="hero-v2__orb hero-v2__orb--3" />

      {/* Floating icons — hidden on mobile via CSS */}
      {FLOAT_ICONS.map(({ icon, color, ...pos }, i) => (
        <motion.span
          key={i}
          className="float-icon"
          style={{ color, ...pos }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {icon}
        </motion.span>
      ))}

      {/* Grid noise overlay */}
      <div className="hero-v2__grid" />

      <div className="hero-v2__inner">
        {/* Left content */}
        <div className="hero-v2__content">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-v2__eyebrow">
              <span className="hero-v2__dot" /> Available for work
            </span>
          </motion.div>

          <motion.h1
            className="hero-v2__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Jay Prakash
          </motion.h1>

          <motion.h2
            className="hero-v2__role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typewriter />
          </motion.h2>

          <motion.p
            className="hero-v2__bio"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I craft scalable, production-ready web applications using the MERN stack.
            Obsessed with clean architecture, pixel-perfect UI, and real-world impact.
          </motion.p>

          <motion.div
            className="hero-v2__stats"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {[['2+', 'Years Exp.'], ['15+', 'Projects'], ['5+', 'Tech Stack']].map(([num, label]) => (
              <div key={label} className="hero-v2__stat">
                <span className="hero-v2__stat-num">{num}</span>
                <span className="hero-v2__stat-label">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="hero-v2__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/projects" className="btn-hero btn-hero--primary">
              View Projects <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-hero btn-hero--ghost">
              Contact Me
            </Link>
          </motion.div>

          <motion.div
            className="hero-v2__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hero-social">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hero-social">
              <FiLinkedin />
            </a>
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          className="hero-v2__visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <div className="hero-v2__avatar-ring">
            <div className="hero-v2__avatar">JP</div>
          </div>

          <div className="hero-v2__badges">
            {[
              { label: 'React',   color: '#61dafb' },
              { label: 'Node.js', color: '#68a063' },
              { label: 'MongoDB', color: '#47a248' },
            ].map(({ label, color }) => (
              <span key={label} className="orbit-badge" style={{ '--color': color }}>
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
);

export default Home;
