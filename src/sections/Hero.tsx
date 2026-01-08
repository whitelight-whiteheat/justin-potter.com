import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '../types';
import {
  containerVariants,
  hoverAnimationVariants,
  subtitleVariants,
} from '../utils/animations';
import { getDisplayName, formatDisplayTime } from '../utils/helpers';
import { useProjectHover, useDisplayTime } from '../utils/hooks';

interface HeroProps {
  hoveredProject?: ProjectData | null;
}

const Hero = ({ hoveredProject }: HeroProps) => {
  // Normalize undefined to null for type safety
  const normalizedProject = hoveredProject ?? null;
  
  // Use shared hooks for consistent behavior
  const animationKey = useProjectHover(normalizedProject);
  const currentTime = useDisplayTime(normalizedProject);

  // Get name parts for display
  const nameParts = useMemo(() => {
    return normalizedProject ? getDisplayName(normalizedProject.title) : ['JUSTIN', 'POTTER'];
  }, [normalizedProject]);
  
  // Display year when hovering, current time otherwise
  const displayTime = formatDisplayTime(normalizedProject, currentTime);

  return (
    <motion.section 
      className="hero-section"
      style={{
        height: 'auto',
        minHeight: 'auto',
        padding: 'calc(var(--spacing-lg) + 50px) 0 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
          margin: '0',
          padding: '0 0.5rem 0 0'
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'visible' }}>
            <motion.h1
              key={`${nameParts[0]}-${animationKey}`}
              initial="initial"
              animate={normalizedProject ? "animate" : "initial"}
              variants={hoverAnimationVariants}
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                fontWeight: 700,
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                color: 'var(--primary-white)',
                margin: 0,
                fontFamily: 'var(--font-primary)',
                textTransform: 'uppercase',
                position: 'relative'
              }}
            >
              {nameParts[0]}
            </motion.h1>
            {nameParts[1] && (
              <motion.h1
                key={`${nameParts[1]}-${animationKey}`}
                initial="initial"
                animate={normalizedProject ? "animate" : "initial"}
                variants={hoverAnimationVariants}
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.85,
                  letterSpacing: '-0.03em',
                  color: 'var(--primary-white)',
                  margin: 0,
                  fontFamily: 'var(--font-primary)',
                  textTransform: 'uppercase',
                  position: 'relative'
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
            {normalizedProject ? (
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
              {normalizedProject ? displayTime : `Brooklyn, NY ${displayTime}`}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
