import React from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING } from '../utils/animations';

interface FooterProps {
  showFooter?: boolean;
}

const Footer = ({ showFooter = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: showFooter ? 1 : 0,
        y: showFooter ? 0 : 20
      }}
      transition={{ duration: DURATION.normal, ease: EASING }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        zIndex: 100,
        pointerEvents: showFooter ? 'auto' : 'none'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '0 var(--projects-section-padding)',
        flexWrap: 'wrap',
        gap: 'var(--spacing-sm)'
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-md)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <p style={{
            color: 'var(--primary-white)',
            fontSize: '0.75rem',
            margin: 0,
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}>
            © {currentYear}
          </p>
          <span style={{
            color: 'var(--medium-grey)',
            fontSize: '0.75rem'
          }}>•</span>
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Add imprint/privacy modal or page navigation here
            }}
            style={{
              color: 'var(--primary-white)',
              fontSize: '0.75rem',
              fontWeight: 300,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--lime-green)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--primary-white)';
            }}
          >
            Imprint & Data Privacy
          </a>
        </div>
        <p style={{
          color: 'var(--medium-grey)',
          fontSize: '0.75rem',
          margin: 0,
          fontWeight: 300,
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)'
        }}>
          Design & Development by Justin Potter
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
