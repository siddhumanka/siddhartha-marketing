// src/Components/ui/badge.js
import React from 'react';
import PropTypes from 'prop-types';
import './badge.css';

export function Badge({ children, color = 'primary', className = '', ...props }) {
  return (
    <span className={`badge badge-${color} ${className}`} {...props}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Badge;

