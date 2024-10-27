// src/components/Toast.js
import React from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastMessage = styled.div`
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : "#f44336"};
  color: white;
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 10px;
  animation: slideIn 0.3s forwards;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close the toast after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return <ToastMessage type={type}>{message}</ToastMessage>;
};

const ToastNotification = ({ toasts, removeToast }) => {
  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContainer>
  );
};

export default ToastNotification;
