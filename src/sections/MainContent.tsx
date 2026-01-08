import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import project1Image from '../assets/landingpage.png';
import { ProjectData } from '../types';

interface MainContentProps {
  onProjectHover?: (project: ProjectData | null) => void;
}

const MainContent = ({ onProjectHover }: MainContentProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'CommerceFlow',
      imageUrl: project1Image,
      liveUrl: 'https://commerce-flow-v2.vercel.app/',
      year: 2025
    }
  ];

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:28',message:'hoveredProject changed',data:{hoveredProject:hoveredProject?.title||null,hasProject:!!hoveredProject,previousKey:animationKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    // Trigger animation when hoveredProject changes to a non-null value
    if (hoveredProject) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:31',message:'Project hovered, triggering animation',data:{projectTitle:hoveredProject.title,year:hoveredProject.year,oldKey:animationKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      setAnimationKey(prev => {
        const newKey = prev + 1;
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:35',message:'animationKey incremented',data:{oldKey:prev,newKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
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

  // Notify parent of hover changes
  useEffect(() => {
    if (onProjectHover) {
      onProjectHover(hoveredProject);
    }
  }, [hoveredProject, onProjectHover]);

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
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:80',message:'nameParts calculated',data:{nameParts,namePartsLength:nameParts.length,animationKey,hoveredProject:hoveredProject?.title||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
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
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--primary-black)',
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
          margin: '0'
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

          {/* Right Side Container - Parent for independent positioning */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              position: 'absolute',
              top: 0,
              right: '-0.0001rem',
              gap: 'var(--spacing-xl)',
              width: 'auto'
            }}
          >
            {/* Designer & Developer - Aligned with [work] */}
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 0,
                textAlign: 'left',
                maxWidth: '6rem',
                overflow: 'visible',
                transform: 'translateX(calc(-1 * (var(--spacing-xl) * 2 + 3rem)))'
              }}
            >
              {hoveredProject ? (
                <>
                  <motion.div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 0
                    }}
                  >
                    <motion.p
                      key="design"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
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
                    </motion.p>
                    <motion.p
                      key="development"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
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
                    </motion.p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 0
                    }}
                  >
                    <motion.p
                      key="designer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
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
                    </motion.p>
                    <motion.p
                      key="developer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
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
                    </motion.p>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Brooklyn, NY - Aligned with [archive] */}
            <div
              style={{
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
                whiteSpace: 'normal'
              }}
            >
              {hoveredProject ? displayTime : `Brooklyn, NY ${displayTime}`}
            </div>
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-project-id={project.id}
                  className="bracket-hover"
                  onMouseEnter={(e) => {
                    // #region agent log
                    console.log('MainContent onMouseEnter fired', project.title);
                    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:380',message:'onMouseEnter triggered',data:{projectId:project.id,projectTitle:project.title,hasCallback:!!onProjectHover},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'E'})}).catch((err)=>{console.error('Log fetch failed:',err);});
                    // #endregion
                    setHoveredCardId(project.id);
                    const projectData = { title: project.title, year: project.year };
                    setHoveredProject(projectData);
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:385',message:'Calling onProjectHover with project data',data:{projectData},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'E'})}).catch((err)=>{console.error('Log fetch failed:',err);});
                    // #endregion
                    console.log('Calling onProjectHover with:', projectData);
                  }}
                  onMouseLeave={(e) => {
                    // #region agent log
                    console.log('MainContent onMouseLeave fired');
                    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainContent.tsx:393',message:'onMouseLeave triggered',data:{projectId:project.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'E'})}).catch((err)=>{console.error('Log fetch failed:',err);});
                    // #endregion
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
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
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
                      transition={{ duration: 0.2 }}
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
