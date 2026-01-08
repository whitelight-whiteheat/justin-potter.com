import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate?: (view: 'main' | 'about' | 'contact' | 'archive') => void;
  activeView?: 'main' | 'about' | 'contact' | 'archive';
}

const Header = ({ onNavigate, activeView = 'main' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden'; // Always hidden
    }
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Work', view: 'main' as const, label: 'Projects' },
    { name: 'Info', view: 'about' as const, label: 'About' },
    { name: 'Archive', view: 'archive' as const, label: 'Archive' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  const handleNavClick = (view: 'main' | 'about' | 'contact' | 'archive') => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ width: '100%', margin: '0', padding: '0' }}>
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0',
            paddingBottom: 'var(--spacing-md)',
            paddingRight: '15rem',
            paddingLeft: '0',
            width: '100%'
          }}>
            {/* Logo/Home Link */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('main');
                }
                setIsMenuOpen(false);
              }}
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: 'var(--primary-white)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                paddingLeft: '1rem',
                marginLeft: '0',
                marginTop: '0.50rem',
              }}
            >
              Justin Potter
            </motion.a>

            {/* Navigation Links */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-xl)',
              alignItems: 'center'
            }}>
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.view);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bracket-hover"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    color: 'var(--primary-white)',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)',
                    opacity: 1,
                    cursor: 'pointer'
                  }}
                >
                  <span 
                    className="bracket" 
                    style={activeView === item.view ? { color: 'var(--lime-green)' } : {}}
                  >
                    [
                  </span>
                  {item.name}
                  <span 
                    className="bracket" 
                    style={activeView === item.view ? { color: 'var(--lime-green)' } : {}}
                  >
                    ]
                  </span>
                </motion.a>
              ))}
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                zIndex: 999
              }}
            />

            {/* Menu Content */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: 'var(--spacing-xl)'
              }}
            >
              {/* Navigation Items */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)',
                alignItems: 'center'
              }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    style={{ textAlign: 'center' }}
                  >
                    <motion.a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.view);
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        x: 10
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        fontSize: 'clamp(2rem, 6vw, 4rem)',
                        fontWeight: 400,
                        color: 'var(--primary-white)',
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                        display: 'block',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <span style={{ opacity: 0.3 }}>[</span>
                      {item.name}
                      <span style={{ opacity: 0.3 }}>]</span>
                    </motion.a>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--primary-white)',
                        marginTop: '0.5rem',
                        fontWeight: 300,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.label}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Footer Info in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  position: 'absolute',
                  bottom: 'var(--spacing-lg)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: 'var(--primary-white)',
                  fontWeight: 300,
                  letterSpacing: '0.05em'
                }}
              >
                <p style={{ margin: 0 }}>
                  Portfolio 2K25
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
