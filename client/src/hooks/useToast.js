import { useState, useCallback } from 'react';

let _id = 0;

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toast = useCallback((message, type = 'success') => {
    const id = ++_id;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => remove(id), 3500);
  }, [remove]);

  return { toasts, toast, remove };
};

export default useToast;
