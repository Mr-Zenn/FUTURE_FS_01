import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import { getProjects } from '../services/project.service.js';
import Spinner from '../components/ui/Spinner.jsx';
import { FALLBACK_PROJECTS, buildProjectList } from '../utils/projectData.js';

const FILTERS = ['All', 'Full Stack', 'Frontend'];

const FEATURED_TITLES = ['CRM System', 'CampusTick', 'Restaurant Reservation System (Lumière)'];

/* ── Featured card ── */
const FeaturedCard = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <motion.div
      className="featured-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className="featured-card__media">
        {project.image && !imgError
          ? <img src={project.image} alt={project.title} className="featured-card__img" loading="lazy" onError={() => setImgError(true)} />
          : (
            <div className="featured-card__placeholder">
              <span className="featured-card__placeholder-letter">{project.title[0]}</span>
              <span className="featured-card__placeholder-name">{project.title}</span>
            </div>
          )
        }
        <div className="featured-card__badge"><FiStar /> Featured</div>
      </div>

      <div className="featured-card__body">
        <span className="featured-card__category">{project.category}</span>
        <h3 className="featured-card__title">{project.title}</h3>
        <p className="featured-card__desc">{project.description}</p>

        <div className="featured-card__stack">
          {project.techStack?.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="featured-card__links">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-link btn-link--outline">
              <FiGithub /> GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-link btn-link--primary">
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="featured-card__glow" />
    </motion.div>
  );
};

/* ── Regular project card ── */
const ProjectCard = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <motion.div
      className="pcard"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
    >
      <div className="pcard__img-wrap">
        {project.image && !imgError
          ? <img src={project.image} alt={project.title} className="pcard__img" loading="lazy" onError={() => setImgError(true)} />
          : (
            <div className="pcard__img-placeholder">
              <span className="pcard__placeholder-letter">{project.title[0]}</span>
              <span className="pcard__placeholder-label">{project.category}</span>
            </div>
          )
        }
        <div className="pcard__overlay">
          <div className="pcard__overlay-actions">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="pcard__overlay-btn">
                <FiGithub /> Code
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="pcard__overlay-btn pcard__overlay-btn--primary">
                <FiExternalLink /> Live
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="pcard__body">
        <span className="pcard__category">{project.category}</span>
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__desc">{project.description?.slice(0, 110)}…</p>
        <div className="pcard__stack">
          {project.techStack?.slice(0, 4).map((t) => <span key={t} className="tag tag--sm">{t}</span>)}
          {project.techStack?.length > 4 && <span className="tag tag--sm">+{project.techStack.length - 4}</span>}
        </div>
        <div className="pcard__actions">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="pcard__btn pcard__btn--ghost">
              <FiGithub /> GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="pcard__btn pcard__btn--primary">
              <FiExternalLink /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main ── */
const Projects = () => {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((r) => {
        const projects = r.data.data.projects || [];
        setAll(buildProjectList(projects));
      })
      .catch(() => setAll(FALLBACK_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  const featured = all.filter((p) => FEATURED_TITLES.includes(p.title) || p.featured);
  const filtered = filter === 'All'
    ? all
    : all.filter((p) => p.category?.trim().toLowerCase() === filter.trim().toLowerCase());

  return (
    <div className="projects-v2">
      {/* Featured */}
      {featured.length > 0 && (
        <section className="page-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">Highlighted work</p>
            <h1 className="section-title-v2">Featured <span>Projects</span></h1>
          </motion.div>
          <div className="featured-grid">
            {featured.map((p, i) => <FeaturedCard key={p._id} project={p} index={i} />)}
          </div>
        </section>
      )}

      {/* All projects */}
      <section className="page-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">All work</p>
          <h2 className="section-title-v2">All <span>Projects</span></h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="projects-loader"><Spinner size={32} /></div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="pcard-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0
                ? <p className="empty-state">No projects in this category yet.</p>
                : filtered.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)
              }
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default Projects;
