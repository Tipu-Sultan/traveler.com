// components/AuthLayouts.js
import React from 'react';
import '../App.css';

const AuthLayout = ({ title, children }) => {
  return (
    <div className="auth-container">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-sky-600 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
