import React from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';

const Hero = () => {
  // Split text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      clipPath: 'inset(100% 0 0 0)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.6
      }
    }
  };

  return (
    <motion.section 
      className="hero-section"
      style={{
        height: 'auto',
        minHeight: 'auto',
        padding: 'calc(var(--spacing-lg) + 80px) 0 var(--spacing-md) 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--primary-white)'
      }}
    >
      {/* Main Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1400px',
          padding: '0 var(--spacing-md)'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0'
          }}
        >
          {/* First Name - "JUSTIN" */}
          <motion.h1
            variants={textVariants}
            style={{
              fontSize: 'clamp(4rem, 14vw, 11rem)',
              fontWeight: 700,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              color: 'var(--primary-black)',
              margin: 0,
              fontFamily: 'var(--font-primary)',
              textTransform: 'uppercase'
            }}
          >
            JUSTIN
          </motion.h1>

          {/* Last Name - "POTTER" */}
          <motion.h1
            variants={textVariants}
            style={{
              fontSize: 'clamp(4rem, 14vw, 11rem)',
              fontWeight: 700,
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              color: 'var(--primary-black)',
              margin: 0,
              fontFamily: 'var(--font-primary)',
              textTransform: 'uppercase',
              marginTop: '-0.1em'
            }}
          >
            POTTER
          </motion.h1>

          {/* Subtitle Section */}
          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            style={{
              marginTop: 'var(--spacing-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <motion.p
              style={{
                fontSize: 'clamp(1.125rem, 1.8vw, 1.75rem)',
                fontWeight: 400,
                color: 'var(--medium-grey)',
                margin: 0,
                letterSpacing: '0.01em'
              }}
            >
              Fullstack Developer
            </motion.p>
            
            <motion.div
              style={{
                display: 'flex',
                gap: 'var(--spacing-sm)',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '0.25rem'
              }}
            >
              <motion.span
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                  color: 'var(--medium-grey)',
                  fontWeight: 300
                }}
              >
                Brooklyn, NY
              </motion.span>
              
              <motion.span
                style={{
                  fontSize: '1rem',
                  color: 'var(--border-grey)',
                  margin: '0 0.25rem'
                }}
              >
                •
              </motion.span>

              <motion.a
                href="#contact"
                whileHover={{ 
                  color: 'var(--primary-black)',
                  x: 5
                }}
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                  color: 'var(--medium-grey)',
                  fontWeight: 300,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ opacity: 0.3 }}>[</span>
                Contact
                <span style={{ opacity: 0.3 }}>]</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
