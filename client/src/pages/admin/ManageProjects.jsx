import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiExternalLink } from 'react-icons/hi';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/project.service.js';
import { buildProjectList } from '../../utils/projectData.js';
import Modal from '../../components/ui/Modal.jsx';
import ProjectForm from '../../components/ui/ProjectForm.jsx';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import Toast from '../../components/ui/Toast.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import useToast from '../../hooks/useToast.js';
import useConfirm from '../../hooks/useConfirm.js';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { toasts, toast, remove } = useToast();
  const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm();

  const load = () =>
    getProjects()
      .then((r) => setProjects(buildProjectList(r.data.data.projects || [])))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing({ ...p, techStack: p.techStack?.join(', ') });
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editing) {
        const res = await updateProject(editing._id, data);
        setProjects((prev) => prev.map((p) => p._id === editing._id ? res.data.data : p));
        toast('Project updated successfully');
      } else {
        const res = await createProject(data);
        setProjects((prev) => [res.data.data, ...prev]);
        toast('Project created successfully');
      }
      setModalOpen(false);
    } catch (err) {
      toast(err.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = await confirm('Delete this project? This action cannot be undone.');
    if (!ok) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast('Project deleted');
    } catch {
      toast('Failed to delete project', 'error');
    }
  };

  return (
    <div className="manage-page">
      <Toast toasts={toasts} remove={remove} />
      <ConfirmDialog
        open={confirmState.open}
        message={confirmState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <div className="manage-page__header">
        <h1 className="admin-page-title">Projects</h1>
        <button className="btn btn--primary" onClick={openAdd}>
          <HiPlus /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="admin-loader"><Spinner size={32} /></div>
      ) : projects.length === 0 ? (
        <p className="empty-state">No projects yet. Add your first one!</p>
      ) : (
        <motion.div
          className="projects-table-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Tech Stack</th>
                <th>Links</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <td>
                    <div className="table-title">{p.title}</div>
                    <div className="table-sub">{p.description?.slice(0, 60)}…</div>
                  </td>
                  <td><span className="tag">{p.category || '—'}</span></td>
                  <td>
                    <div className="tag-list">
                      {p.techStack?.slice(0, 3).map((t) => <span key={t} className="tag tag--sm">{t}</span>)}
                      {p.techStack?.length > 3 && <span className="tag tag--sm">+{p.techStack.length - 3}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="table-links">
                      {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="table-link">GitHub <HiExternalLink /></a>}
                      {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="table-link">Live <HiExternalLink /></a>}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      {p._id ? (
                        <>
                          <button className="icon-btn icon-btn--edit" onClick={() => openEdit(p)} title="Edit"><HiPencil /></button>
                          <button className="icon-btn icon-btn--delete" onClick={() => handleDelete(p._id)} title="Delete"><HiTrash /></button>
                        </>
                      ) : (
                        <span className="badge-seed">Portfolio Entry</span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Project' : 'Add New Project'}
      >
        <ProjectForm
          onSubmit={handleSubmit}
          defaultValues={editing || {}}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default ManageProjects;
