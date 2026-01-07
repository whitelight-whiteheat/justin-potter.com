import React from 'react';
import '../styles/globals.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      padding: 'var(--spacing-sm) var(--spacing-md)',
      textAlign: 'center',
      zIndex: 100,
      pointerEvents: 'none'
    }}>
      <div className="container">
        <p style={{
          color: 'var(--medium-grey)',
          fontSize: '0.75rem',
          margin: 0,
          fontWeight: 300,
          letterSpacing: '0.05em'
        }}>
          © {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
