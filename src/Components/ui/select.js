// src/Components/ui/select.js
import React from 'react';
import PropTypes from 'prop-types';
import './select.css';

export function Select({ value, onChange, children, className = '', ...props }) {
  return (
    <select value={value} onChange={onChange} className={`select ${className}`} {...props}>
      {children}
    </select>
  );
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ children }) {
  return <>{children}</>;
}

Select.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

SelectContent.propTypes = {
  children: PropTypes.node,
};

SelectItem.propTypes = {
  value: PropTypes.any,
  children: PropTypes.node,
};

SelectTrigger.propTypes = {
  children: PropTypes.node,
};

SelectValue.propTypes = {
  children: PropTypes.node,
};

