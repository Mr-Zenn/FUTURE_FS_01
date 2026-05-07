import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal__header">
            <h3 className="modal__title">{title}</h3>
            <button className="modal__close" onClick={onClose}><HiX /></button>
          </div>
          <div className="modal__body">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
