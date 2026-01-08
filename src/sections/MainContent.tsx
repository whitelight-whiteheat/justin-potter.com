import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import project1Image from '../assets/landingpage.png';
import { ProjectData } from '../types';
import {
  containerVariants,
  hoverAnimationVariants,
  subtitleVariants,
  projectCardHover,
  hoverTransition,
  DURATION,
  EASING,
} from '../utils/animations';
import { getDisplayName, formatDisplayTime } from '../utils/helpers';
import { useProjectHover, useDisplayTime } from '../utils/hooks';

interface MainContentProps {
  onProjectHover?: (project: ProjectData | null) => void;
}

const MainContent = ({ onProjectHover }: MainContentProps) => {
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use shared hooks for consistent behavior
  const animationKey = useProjectHover(hoveredProject);
  const currentTime = useDisplayTime(hoveredProject);

  const projects = [
    {
      id: 1,
      title: 'CommerceFlow',
      imageUrl: project1Image,
      liveUrl: 'https://commerce-flow-v2.vercel.app/',
      year: 2025
    }
  ];

  // Notify parent of hover changes
  useEffect(() => {
    if (onProjectHover) {
      onProjectHover(hoveredProject);
    }
  }, [hoveredProject, onProjectHover]);

  // Get name parts for display
  const nameParts = useMemo(() => {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:nameParts',message:'nameParts useMemo triggered',data:{hoveredProject:hoveredProject?.title||null,hasProject:!!hoveredProject},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'G'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    try {
      const result = hoveredProject ? getDisplayName(hoveredProject.title) : ['JUSTIN', 'POTTER'];
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:nameParts',message:'nameParts calculated',data:{result,resultLength:result.length},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'G'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      return result;
    } catch (error) {
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:nameParts',message:'ERROR in nameParts calculation',data:{error:error instanceof Error ? error.message : String(error),hoveredProject:hoveredProject?.title||null},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'E'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      return ['JUSTIN', 'POTTER'];
    }
  }, [hoveredProject]);
  
  // Display year when hovering, current time otherwise
  const displayTime = (() => {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:displayTime',message:'displayTime calculation',data:{hoveredProject:hoveredProject?.title||null,currentTimeType:typeof currentTime},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'H'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    try {
      return formatDisplayTime(hoveredProject, currentTime);
    } catch (error) {
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:displayTime',message:'ERROR in displayTime',data:{error:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'E'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      return hoveredProject ? hoveredProject.year.toString() : '00:00:00';
    }
  })();


  return (
    <motion.section 
      className="background-grid"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        padding: 'calc(var(--spacing-lg) + 50px) 0 var(--spacing-sm) 0'
      }}
    >
      {/* Hero and Projects in separate containers */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: '0',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Hero Section - Independent Container */}
        <div
          style={{
            width: '100%',
            padding: '0 20rem 0 0',
            margin: '0',
            flexShrink: 0,
            position: 'relative'
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'flex-start',
              gap: 'var(--spacing-sm)',
              width: '100%',
              marginTop: '10rem',
              marginLeft: '1rem',
              position: 'relative'
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

          {/* Designer & Developer - Independent positioning */}
          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: 'absolute',
              top: 0,
              right: '10rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 0,
              textAlign: 'left',
              maxWidth: '6rem',
              overflow: 'visible',
              transform: 'translateX(calc(-1 * (var(--spacing-xl) * 2 + 3rem)))',
              minHeight: '2.4rem',
              marginRight: '10.5rem'
            }}
          >
              <AnimatePresence mode="wait">
                {hoveredProject ? (
                  <motion.div
                    key="project-text"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: DURATION.normal, ease: EASING }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 0,
                      width: '100%'
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: 'var(--primary-white)',
                        margin: 0,
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        lineHeight: 1.2
                      }}
                    >
                      Design
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: 'var(--primary-white)',
                        margin: 0,
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        lineHeight: 1.2
                      }}
                    >
                      Development
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-text"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: DURATION.normal, ease: EASING }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 0,
                      width: '100%'
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: 'var(--primary-white)',
                        margin: 0,
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        lineHeight: 1.2
                      }}
                    >
                      Designer &
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: 'var(--primary-white)',
                        margin: 0,
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        lineHeight: 1.2,
                        marginRight: '4.5rem',
                        marginLeft: '0rem',
                      }}
                    >
                      Developer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
          </motion.div>

          {/* Brooklyn, NY - Independent positioning */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: '10rem',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'var(--primary-white)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
              textAlign: 'left',
              maxWidth: '8rem',
              overflow: 'visible',
              whiteSpace: 'normal',
              minHeight: '1.05rem',
              marginRight: '-9rem'
            }}
          >
            <AnimatePresence mode="wait">
              {hoveredProject ? (
                <motion.span
                  key="year"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  {displayTime}
                </motion.span>
              ) : (
                <motion.span
                  key="location"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  Brooklyn, NY {displayTime}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        </div>

        {/* Projects Section - Independent Container */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flexShrink: 0,
            paddingTop: 'var(--spacing-md)',
            paddingBottom: '2rem',
            paddingLeft: '85px',
            paddingRight: '85px',
            boxSizing: 'border-box'
          }}
        >
          {/* Horizontal Scrollable Projects Container */}
          <div
            ref={containerRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: 'grab',
              paddingLeft: 'var(--spacing-md)',
              paddingRight: 'var(--spacing-md)',
              paddingBottom: '0',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              gap: 'var(--spacing-md)'
            }}
            onMouseDown={(e) => {
              const container = e.currentTarget;
              container.style.cursor = 'grabbing';
              let isDown = true;
              let startX = e.pageX - container.offsetLeft;
              let scrollLeft = container.scrollLeft;

              const handleMouseMove = (e: MouseEvent) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
              };

              const handleMouseUp = () => {
                isDown = false;
                container.style.cursor = 'grab';
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.preventDefault();
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Projects List */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-lg)',
              minWidth: 'max-content',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: DURATION.slow, delay: index * 0.1, ease: EASING }}
                  data-project-id={project.id}
                  className="bracket-hover"
                  onMouseEnter={(e) => {
                    setHoveredCardId(project.id);
                    const projectData = { title: project.title, year: project.year };
                    setHoveredProject(projectData);
                  }}
                  onMouseLeave={(e) => {
                    setHoveredCardId(null);
                    setHoveredProject(null);
                  }}
                  style={{
                    minWidth: '320px',
                    maxWidth: '320px',
                    scrollSnapAlign: 'start',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-xs)',
                    position: 'relative',
                    pointerEvents: 'auto'
                  }}
                >
                  {/* Project Image */}
                  <motion.div
                    whileHover={projectCardHover}
                    onMouseEnter={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      height: '220px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'var(--dark-grey)',
                      flexShrink: 0,
                      zIndex: 1,
                      pointerEvents: 'auto'
                    }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </motion.div>

                  {/* Project Number and View Link */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingTop: '-0.55rem'
                  }}>
                    <div 
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--primary-white)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                        opacity: 0.9
                      }}
                    >
                      <span className="bracket">[</span>{String(index + 1).padStart(2, '0')}<span className="bracket">]</span>
                    </div>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredCardId === project.id ? 1 : 0,
                        x: hoveredCardId === project.id ? 0 : -10
                      }}
                      transition={hoverTransition}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--primary-white)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        pointerEvents: hoveredCardId === project.id ? 'auto' : 'none',
                        marginTop: '-0.75px'
                      }}
                    >
                      View Project →
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MainContent;
