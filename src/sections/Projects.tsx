import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import project1Image from '../assets/landingpage.png';
import { ProjectData } from '../types';
import { slideInRightVariants, projectCardHover, hoverTransition, DURATION, EASING } from '../utils/animations';

interface ProjectsProps {
  onProjectHover?: (project: ProjectData | null) => void;
}

const Projects = ({ onProjectHover }: ProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'CommerceFlow',
      imageUrl: project1Image,
      liveUrl: 'https://commerce-flow-v2.vercel.app/',
      year: 2025
    }
  ];

  return (
    <section id="projects" className="section" style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--primary-black)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      paddingBottom: 'var(--spacing-xl)'
    }}>
      <div className="container" style={{ width: '100%', maxWidth: '100%', paddingLeft: '85px', paddingRight: '85px', paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxSizing: 'border-box', margin: 0}}>
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRightVariants}
                transition={{ delay: index * 0.1 }}
                data-project-id={project.id}
                className="bracket-hover"
                onMouseEnter={(e) => {
                  setHoveredCardId(project.id);
                  const projectData = { title: project.title, year: project.year };
                  if (onProjectHover) {
                    onProjectHover(projectData);
                  }
                }}
                onMouseLeave={(e) => {
                  setHoveredCardId(null);
                  if (onProjectHover) {
                    onProjectHover(null);
                  }
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
    </section>
  );
};

export default Projects;
