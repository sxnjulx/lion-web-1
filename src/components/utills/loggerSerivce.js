import React from 'react';
import { createRoot } from 'react-dom/client';
import CustomAlert from './CustomAlert';

const LoggerService = {
  logSuccess: (message) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<CustomAlert message={message} type="success" />);
    
    setTimeout(() => {
      root.unmount();
      container.remove();
    }, 3000); // Remove after 3 seconds (adjust as needed)
  },
  logFailure: (message, error) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<CustomAlert message={`${message} ${error}`} type="failure" />);
    
    setTimeout(() => {
      root.unmount();
      container.remove();
    }, 3000); // Remove after 3 seconds (adjust as needed)
  },
};

export default LoggerService;
