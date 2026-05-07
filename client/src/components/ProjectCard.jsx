import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    {project.image && <img src={project.image} alt={project.title} className="project-card__img" />}
    <div className="project-card__body">
      <span className="project-card__category">{project.category}</span>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__stack">
        {project.techStack.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="project-card__links">
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noreferrer"><FiGithub /> Code</a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noreferrer"><FiExternalLink /> Live</a>
        )}
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
