// A normal button that will display loading or the content
// Accepts all button props + loading that controls the button's state
import React from 'react';
import './index.scss';

const Button = props => {
  const { children, className, disabled, onClick, loading } = props;
  return (
    <button
      className={`btn ${className ? className : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? 'Loading..' : children}
    </button>
  );
};

export default Button;
