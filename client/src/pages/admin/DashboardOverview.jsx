import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiFolder, HiMail, HiClock } from 'react-icons/hi';
import { getProjects } from '../../services/project.service.js';
import { getMessages } from '../../services/message.service.js';
import Spinner from '../../components/ui/Spinner.jsx';
import { buildProjectList } from '../../utils/projectData.js';

const StatCard = ({ icon, label, value, gradient, delay }) => (
  <motion.div
    className="stat-card"
    style={{ '--card-gradient': gradient }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
  >
    <div className="stat-card__icon">{icon}</div>
    <div className="stat-card__body">
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  </motion.div>
);

const DashboardOverview = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getMessages()])
      .then(([pr, mr]) => {
        setProjects(buildProjectList(pr.data.data.projects || []));
        setMessages(mr.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-loader"><Spinner size={32} /></div>;

  return (
    <div className="overview">
      <h1 className="admin-page-title">Overview</h1>

      <div className="stat-grid">
        <StatCard
          icon={<HiFolder />}
          label="Total Projects"
          value={projects.length}
          gradient="linear-gradient(135deg, #7c3aed, #4f46e5)"
          delay={0}
        />
        <StatCard
          icon={<HiMail />}
          label="Total Messages"
          value={messages.length}
          gradient="linear-gradient(135deg, #0ea5e9, #6366f1)"
          delay={0.08}
        />
        <StatCard
          icon={<HiClock />}
          label="Recent (7 days)"
          value={messages.filter((m) => {
            const d = new Date(m.createdAt);
            return (Date.now() - d) < 7 * 24 * 60 * 60 * 1000;
          }).length}
          gradient="linear-gradient(135deg, #10b981, #0ea5e9)"
          delay={0.16}
        />
      </div>

      <motion.div
        className="recent-messages"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.24 }}
      >
        <h2 className="admin-section-title">Recent Messages</h2>
        {messages.length === 0 ? (
          <p className="empty-state">No messages yet.</p>
        ) : (
          <div className="msg-list">
            {messages.slice(0, 5).map((m) => (
              <div key={m._id} className="msg-row">
                <div className="msg-row__avatar">{m.name[0].toUpperCase()}</div>
                <div className="msg-row__body">
                  <div className="msg-row__header">
                    <span className="msg-row__name">{m.name}</span>
                    <span className="msg-row__email">{m.email}</span>
                  </div>
                  <p className="msg-row__text">{m.message}</p>
                </div>
                <span className="msg-row__date">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
