import React, { createContext, useContext, useState } from "react";

import ToastNotification from "../components/Toast";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Math.random().toString(36).substr(2, 9); // Unique ID for each toast
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastNotification toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
