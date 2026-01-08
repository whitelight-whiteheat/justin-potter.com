import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';

interface ProjectData {
  title: string;
  year: number;
}

interface HeroProps {
  hoveredProject?: ProjectData | null;
}

const Hero = ({ hoveredProject }: HeroProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Only update time if not hovering over a project
    if (!hoveredProject) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hoveredProject]);

  // Split project name intelligently - "CommerceFlow" becomes "COMMERCE" and "FLOW"
  const getDisplayName = (projectName: string) => {
    // If it contains spaces, split on spaces
    if (projectName.includes(' ')) {
      const parts = projectName.toUpperCase().split(' ');
      return parts.length >= 2 ? [parts[0], parts.slice(1).join(' ')] : [parts[0], ''];
    }
    // Split camelCase/PascalCase words (e.g., "CommerceFlow" -> ["COMMERCE", "FLOW"])
    // Match capital letters followed by lowercase letters
    const words = projectName.match(/[A-Z][a-z]*/g) || [projectName];
    if (words.length > 1) {
      return [words[0].toUpperCase(), words.slice(1).join('').toUpperCase()];
    }
    // If single word, return as is
    return [words[0].toUpperCase(), ''];
  };

  const nameParts = hoveredProject ? getDisplayName(hoveredProject.title) : ['JUSTIN', 'POTTER'];
  
  // Display year when hovering, current time otherwise
  const displayTime = hoveredProject 
    ? hoveredProject.year.toString() 
    : currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

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
        padding: 'calc(var(--spacing-lg) + 50px) 0 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--primary-black)'
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
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 'var(--spacing-xl)',
            width: '100%'
          }}
        >
          {/* Left Side - Name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.h1
              key={nameParts[0]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                fontWeight: 700,
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                color: 'var(--primary-white)',
                margin: 0,
                fontFamily: 'var(--font-primary)',
                textTransform: 'uppercase'
              }}
            >
              {nameParts[0]}
            </motion.h1>
            {nameParts[1] && (
              <motion.h1
                key={nameParts[1]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.85,
                  letterSpacing: '-0.03em',
                  color: 'var(--primary-white)',
                  margin: 0,
                  fontFamily: 'var(--font-primary)',
                  textTransform: 'uppercase',
                  marginTop: '-0.1em'
                }}
              >
                {nameParts[1]}
              </motion.h1>
            )}
          </div>

          {/* Right Side - Role & Location */}
          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0',
              textAlign: 'right'
            }}
          >
            {hoveredProject ? (
              <>
                <motion.p
                  key="design"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                    fontWeight: 400,
                    color: 'var(--primary-white)',
                    margin: 0,
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                  }}
                >
                  Design
                </motion.p>
                <motion.p
                  key="development"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                    fontWeight: 400,
                    color: 'var(--primary-white)',
                    margin: 0,
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                  }}
                >
                  Development
                </motion.p>
              </>
            ) : (
              <>
                <motion.p
                  key="designer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                    fontWeight: 400,
                    color: 'var(--primary-white)',
                    margin: 0,
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                  }}
                >
                  Designer &
                </motion.p>
                <motion.p
                  key="developer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                    fontWeight: 400,
                    color: 'var(--primary-white)',
                    margin: 0,
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    lineHeight: 1.2
                  }}
                >
                  Developer
                </motion.p>
              </>
            )}
            <div
              style={{
                marginTop: 'var(--spacing-sm)',
                fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
                color: 'var(--primary-white)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.05em'
              }}
            >
              {hoveredProject ? displayTime : `Brooklyn, NY ${displayTime}`}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
