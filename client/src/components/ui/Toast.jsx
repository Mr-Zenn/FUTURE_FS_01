import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiX } from 'react-icons/hi';

const icons = { success: <HiCheckCircle />, error: <HiXCircle /> };

const Toast = ({ toasts, remove }) => (
  <div className="toast-container">
    <AnimatePresence>
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          className={`toast toast--${t.type}`}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.25 }}
        >
          <span className="toast__icon">{icons[t.type]}</span>
          <span className="toast__msg">{t.message}</span>
          <button className="toast__close" onClick={() => remove(t.id)}><HiX /></button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default Toast;
