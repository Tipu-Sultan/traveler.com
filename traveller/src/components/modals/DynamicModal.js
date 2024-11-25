import React, { useState } from 'react';

const DynamicModal = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  // Determine styles based on modal type
  const modalStyles = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    alert: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };

  const iconStyles = {
    error: 'text-red-500',
    success: 'text-green-500',
    alert: 'text-yellow-500',
  };

  const icons = {
    error: '❌',
    success: '✅',
    alert: '⚠️',
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-all ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`relative max-w-lg w-full mx-auto p-6 rounded-lg shadow-xl border-l-4 transition-all transform scale-95 ${isOpen ? 'scale-100' : 'scale-95'} ${modalStyles[type]}`}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`text-3xl ${iconStyles[type]} animate-bounce`}>
            {icons[type]}
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="font-bold text-2xl">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <p className="mt-2 text-lg">{message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-transparent text-white hover:bg-gray-700 rounded-full transition-all duration-300"
          >
            <span className="text-xl font-semibold">✖</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
