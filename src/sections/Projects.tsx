import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';
import project1Image from '../assets/landingpage.png';
import project2Image from '../assets/project-2.png';
import project3Image from '../assets/project-3.png';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'CommerceFlow',
      imageUrl: project1Image,
      liveUrl: 'https://commerce-flow-v2.vercel.app/',
    },
    {
      id: 2,
      title: 'Project Two',
      imageUrl: project2Image,
      liveUrl: '#',
    },
    {
      id: 3,
      title: 'Project Three',
      imageUrl: project3Image,
      liveUrl: '#',
    }
  ];

  return (
    <section id="projects" className="section" style={{ 
      height: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--primary-white)',
      position: 'relative',
      overflow: 'hidden',
      padding: '0',
      boxSizing: 'border-box'
    }}>
      <div className="container" style={{ width: '100%', maxWidth: '100%', padding: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-sm) var(--spacing-md)',
            flexShrink: 0
          }}
        >
          <motion.h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--primary-black)',
              margin: 0,
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            style={{
              fontSize: '0.875rem',
              color: 'var(--medium-grey)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              marginTop: '0.25rem'
            }}
          >
            featured work (Swipe)
          </motion.div>
        </motion.div>

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
            paddingBottom: 'var(--spacing-md)',
            flex: 1,
            minHeight: 0,
            marginBottom: 'var(--spacing-md)'
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
            alignItems: 'flex-start'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-project-id={project.id}
                style={{
                  minWidth: '400px',
                  maxWidth: '400px',
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-sm)',
                  position: 'relative'
                }}
              >
                {/* Project Image */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'var(--light-grey)',
                    marginBottom: 'var(--spacing-xs)',
                    flexShrink: 0,
                    zIndex: 1
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '0.875rem 1.75rem',
                        backgroundColor: 'var(--primary-white)',
                        color: 'var(--primary-black)',
                        textDecoration: 'none',
                        fontWeight: 400,
                        letterSpacing: '0.05em',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      View this project
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Project Title */}
                <motion.h3
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 400,
                    color: 'var(--primary-black)',
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    zIndex: 1,
                    position: 'relative'
                  }}
                >
                  {project.title}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Titles List (Minimal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            padding: 'var(--spacing-md) var(--spacing-md) calc(var(--spacing-xl) + 80px) var(--spacing-md)',
            flexShrink: 0,
            display: 'flex',
            gap: 'var(--spacing-lg)',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (containerRef.current) {
                  const projectElement = containerRef.current.querySelector(`[data-project-id="${project.id}"]`);
                  if (projectElement) {
                    projectElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }
              }}
              whileHover={{ scale: 1.05, x: 5, color: 'var(--primary-black)' }}
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.75rem)',
                fontWeight: 400,
                color: 'var(--medium-grey)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {project.title}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
