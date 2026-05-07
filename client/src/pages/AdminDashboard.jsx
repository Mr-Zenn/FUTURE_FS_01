import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, deleteProject } from '../services/project.service.js';
import { getMessages } from '../services/message.service.js';
import { useForm } from 'react-hook-form';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('projects');
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getProjects().then((r) => setProjects(r.data.data.projects));
    getMessages().then((r) => setMessages(r.data.data));
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const onAddProject = async (data) => {
    const payload = { ...data, techStack: data.techStack.split(',').map((t) => t.trim()) };
    const res = await createProject(payload);
    setProjects([res.data.data, ...projects]);
    reset();
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p._id !== id));
  };

  return (
    <section className="page-section">
      <div className="dashboard__header">
        <h1 className="section-title">Dashboard</h1>
        <div className="dashboard__meta">
          <span>Welcome, {user?.name}</span>
          <button className="btn btn--outline" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard__tabs">
        <button className={`tab ${tab === 'projects' ? 'tab--active' : ''}`} onClick={() => setTab('projects')}>Projects</button>
        <button className={`tab ${tab === 'messages' ? 'tab--active' : ''}`} onClick={() => setTab('messages')}>Messages</button>
        <button className={`tab ${tab === 'add' ? 'tab--active' : ''}`} onClick={() => setTab('add')}>Add Project</button>
      </div>

      {tab === 'projects' && (
        <div className="dashboard__list">
          {projects.map((p) => (
            <div key={p._id} className="dashboard__item">
              <div>
                <strong>{p.title}</strong>
                <span className="tag" style={{ marginLeft: '0.5rem' }}>{p.category}</span>
              </div>
              <button className="btn btn--danger" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'messages' && (
        <div className="dashboard__list">
          {messages.map((m) => (
            <div key={m._id} className="dashboard__item dashboard__item--col">
              <strong>{m.name} — <span className="muted">{m.email}</span></strong>
              <p>{m.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'add' && (
        <form className="contact-form" onSubmit={handleSubmit(onAddProject)}>
          <div className="form-group">
            <input placeholder="Title" {...register('title', { required: true })} />
          </div>
          <div className="form-group">
            <textarea placeholder="Description" rows={3} {...register('description', { required: true })} />
          </div>
          <div className="form-group">
            <input placeholder="Tech Stack (comma separated)" {...register('techStack')} />
          </div>
          <div className="form-group">
            <input placeholder="Category" {...register('category')} />
          </div>
          <div className="form-group">
            <input placeholder="GitHub Link" {...register('githubLink')} />
          </div>
          <div className="form-group">
            <input placeholder="Live Link" {...register('liveLink')} />
          </div>
          <div className="form-group">
            <input placeholder="Image URL" {...register('image')} />
          </div>
          <button type="submit" className="btn btn--primary">Add Project</button>
        </form>
      )}
    </section>
  );
};

export default AdminDashboard;
