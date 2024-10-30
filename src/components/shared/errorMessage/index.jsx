// src/components/shared/ErrorMessage.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaRedoAlt } from 'react-icons/fa';
import './ErrorMessage.css';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <FaExclamationTriangle size={40} />
        </div>
        <h3 className="error-title">Oops!</h3>
        <p className="error-message">{message}</p>
        {showRetry && onRetry && (
          <Button 
            variant="danger" 
            className="retry-button"
            onClick={onRetry}
          >
            <FaRedoAlt className="me-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;