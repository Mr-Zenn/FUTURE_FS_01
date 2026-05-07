import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiTrash, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { getMessages, deleteMessage } from '../../services/message.service.js';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import Toast from '../../components/ui/Toast.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import useToast from '../../hooks/useToast.js';
import useConfirm from '../../hooks/useConfirm.js';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const { toasts, toast, remove } = useToast();
  const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm();

  useEffect(() => {
    getMessages()
      .then((r) => setMessages(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const ok = await confirm('Delete this message permanently?');
    if (!ok) return;
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast('Message deleted');
    } catch {
      toast('Failed to delete message', 'error');
    }
  };

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

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
        <h1 className="admin-page-title">Messages</h1>
        <span className="badge">{messages.length} total</span>
      </div>

      {loading ? (
        <div className="admin-loader"><Spinner size={32} /></div>
      ) : messages.length === 0 ? (
        <p className="empty-state">No messages yet.</p>
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
                <th>Sender</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m, i) => (
                <>
                  <motion.tr
                    key={m._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={expanded === m._id ? 'tr--expanded' : ''}
                  >
                    <td>
                      <div className="table-title">{m.name}</div>
                      <div className="table-sub">{m.email}</div>
                    </td>
                    <td>
                      <div className="msg-preview">
                        <span>{m.message.slice(0, 60)}{m.message.length > 60 ? '…' : ''}</span>
                        {m.message.length > 60 && (
                          <button className="expand-btn" onClick={() => toggleExpand(m._id)}>
                            {expanded === m._id ? <HiChevronUp /> : <HiChevronDown />}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="table-date">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="icon-btn icon-btn--delete" onClick={() => handleDelete(m._id)} title="Delete">
                        <HiTrash />
                      </button>
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {expanded === m._id && (
                      <motion.tr
                        key={`${m._id}-expand`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td colSpan={4} className="msg-full-cell">
                          <p className="msg-full-text">{m.message}</p>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ManageMessages;
