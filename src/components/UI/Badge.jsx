import React from 'react';
// import '../../styles/UI/Badge.css';

export const Badge = ({ children, variant = 'default', icon }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
};
