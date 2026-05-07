import { motion, AnimatePresence } from 'framer-motion';
import { HiExclamation } from 'react-icons/hi';

const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="confirm-dialog"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="confirm-dialog__icon"><HiExclamation /></div>
          <p className="confirm-dialog__msg">{message}</p>
          <div className="confirm-dialog__actions">
            <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
            <button className="btn btn--danger-solid" onClick={onConfirm}>Delete</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmDialog;
