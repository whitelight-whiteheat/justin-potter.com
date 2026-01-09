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
    },
    {
      id: 2,
      title: 'Portfolio Site',
      imageUrl: project1Image, // Placeholder - replace with actual project image
      liveUrl: 'https://www.justin-potter.com/',
      year: 2025
    },
    {
      id: 3,
      title: 'Task Manager',
      imageUrl: project1Image, // Placeholder - replace with actual project image
      liveUrl: '#',
      year: 2024
    },
    {
      id: 4,
      title: 'API Dashboard',
      imageUrl: project1Image, // Placeholder - replace with actual project image
      liveUrl: '#',
      year: 2024
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
    try {
      return hoveredProject ? getDisplayName(hoveredProject.title) : ['JUSTIN', 'POTTER'];
    } catch (error) {
      return ['JUSTIN', 'POTTER'];
    }
  }, [hoveredProject]);
  
  // Display year when hovering, current time otherwise
  const displayTime = (() => {
    try {
      return formatDisplayTime(hoveredProject, currentTime);
    } catch (error) {
      return hoveredProject ? hoveredProject.year.toString() : '00:00:00';
    }
  })();


  return (
    <motion.section 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        padding: 'calc(var(--spacing-lg) + 50px) 0 var(--spacing-sm) 0',
        backgroundColor: 'transparent'
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
            padding: `0 var(--hero-right-padding) 0 0`,
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
              gridTemplateColumns: '1fr auto auto',
              gridTemplateRows: 'auto auto',
              alignItems: 'flex-start',
              gap: 'var(--spacing-md)',
              width: '100%',
              marginTop: 'var(--hero-top-margin)',
              marginLeft: 'var(--hero-left-margin)',
              position: 'relative'
            }}
          >
          {/* Name - spans first column and both rows */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            overflow: 'visible',
            gridColumn: '1',
            gridRow: '1 / 3'
          }}>
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

          {/* Designer & Developer / Design & Development - Second column, first row */}
          <motion.div
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            style={{
              gridColumn: '2',
              gridRow: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 0,
              textAlign: 'left',
              minWidth: '6rem',
              position: 'relative',
              minHeight: '2.4rem'
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
                        lineHeight: 1.2
                      }}
                    >
                      Developer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
          </motion.div>

          {/* Location/Time - Second column, second row */}
          <div
            style={{
              gridColumn: '2',
              gridRow: '2',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'var(--primary-white)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
              textAlign: 'left',
              position: 'relative',
              minHeight: '1.05rem'
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
            paddingBottom: 'var(--spacing-md)',
            paddingLeft: 'var(--projects-section-padding)',
            paddingRight: 'var(--projects-section-padding)',
            boxSizing: 'border-box'
          }}
        >
          {/* Featured Projects Label */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-md)',
            paddingLeft: 'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)'
          }}>
            <h2 style={{
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'var(--primary-white)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0
            }}>
              Featured Projects
            </h2>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 300,
              color: 'var(--medium-grey)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'lowercase',
              margin: 0,
              fontStyle: 'italic'
            }}>
              (Swipe)
            </p>
          </div>

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
                <motion.a
                  key={project.id}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: DURATION.fast, ease: EASING }
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
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  {/* Project Image */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: DURATION.fast, ease: EASING }
                    }}
                    onMouseEnter={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      height: '220px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'var(--dark-grey)',
                      flexShrink: 0,
                      zIndex: 1,
                      pointerEvents: 'auto',
                      borderRadius: '2px'
                    }}
                  >
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      whileHover={{
                        filter: 'brightness(1.1)',
                        transition: { duration: DURATION.fast, ease: EASING }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'filter 0.3s ease'
                      }}
                    />
                    {/* Overlay on hover */}
                    {hoveredCardId === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.fast }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
                          pointerEvents: 'none'
                        }}
                      />
                    )}
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
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredCardId === project.id ? 1 : 0,
                        x: hoveredCardId === project.id ? 0 : -10
                      }}
                      whileHover={{ 
                        color: 'var(--lime-green)',
                        x: hoveredCardId === project.id ? 5 : 0
                      }}
                      transition={hoverTransition}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--primary-white)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        pointerEvents: 'none',
                        marginTop: '-0.75px',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      View Project →
                    </motion.span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MainContent;
