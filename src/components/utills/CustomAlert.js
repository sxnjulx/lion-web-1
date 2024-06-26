import React from 'react';

const CustomAlert = ({ message, type }) => {
  const alertClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    failure: 'bg-red-100 border-red-400 text-red-700',
  };

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 rounded ${alertClasses[type]} shadow-md`}>
      <strong>{type === 'success' ? 'Success' : 'Failure'}:</strong> {message}
    </div>
  );
};

export default CustomAlert;
