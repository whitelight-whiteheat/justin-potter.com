import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '../types';

interface HeroProps {
  hoveredProject?: ProjectData | null;
}

const Hero = ({ hoveredProject }: HeroProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationKey, setAnimationKey] = useState(0);

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.tsx:12',message:'hoveredProject changed',data:{hoveredProject:hoveredProject?.title||null,hasProject:!!hoveredProject,previousKey:animationKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    // Trigger animation when hoveredProject changes to a non-null value
    if (hoveredProject) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.tsx:18',message:'Project hovered, triggering animation',data:{projectTitle:hoveredProject.title,year:hoveredProject.year,oldKey:animationKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      setAnimationKey(prev => {
        const newKey = prev + 1;
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.tsx:22',message:'animationKey incremented',data:{oldKey:prev,newKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        return newKey;
      });
    }
  }, [hoveredProject, animationKey]);
  // #endregion

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

  const nameParts = useMemo(() => {
    return hoveredProject ? getDisplayName(hoveredProject.title) : ['JUSTIN', 'POTTER'];
  }, [hoveredProject]);
  
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Hero.tsx:50',message:'nameParts calculated',data:{nameParts,namePartsLength:nameParts.length,animationKey,hoveredProject:hoveredProject?.title||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
  }, [nameParts, animationKey, hoveredProject]);
  // #endregion
  
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


  // Simple hover animation variants
  const hoverAnimationVariants = {
    initial: { 
      opacity: 1,
      y: 0
    },
    animate: {
      opacity: [1, 0.3, 0.6, 0.2, 0.8, 1],
      y: [0, -20, -40, -60, -40, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut" as const
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
              animate={hoveredProject ? "animate" : "initial"}
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
                animate={hoveredProject ? "animate" : "initial"}
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
