import React, { useEffect } from 'react';

type AlertProps = {
  variant: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  duration?: number; // in milliseconds
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  duration = 1000,
  onClose,
}) => {
  useEffect(() => {
    if (message && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show position-fixed`}
      role="alert"
      style={{
        top: '1rem',
        right: '1rem',
        zIndex: 1055,
        minWidth: '250px',
        maxWidth: '350px',
      }}
    >
      {message}
      {onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};

export default Alert;
