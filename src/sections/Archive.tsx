import React, { useState } from 'react';
import { motion } from 'framer-motion';
import project1Image from '../assets/landingpage.png';
import { DURATION, EASING } from '../utils/animations';

const Archive = () => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const archiveProjects = [
    {
      id: 1,
      title: 'Dataspot',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2024,
      description: 'Branding concept'
    },
    {
      id: 2,
      title: 'Malea Studio',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2024,
      description: 'Website home page'
    },
    {
      id: 3,
      title: 'Intune',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2023,
      description: 'Concept poster'
    },
    {
      id: 4,
      title: 'PlanCo',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2022,
      description: 'Design Challenge'
    },
    {
      id: 5,
      title: 'Vantage Point',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2023,
      description: 'Promotional Flyer'
    },
    {
      id: 6,
      title: 'Dataspot',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2024,
      description: 'Website concept'
    },
    {
      id: 7,
      title: 'Malea Studio',
      imageUrl: project1Image,
      liveUrl: '#',
      year: 2024,
      description: 'Website'
    }
  ];


  return (
    <section 
      id="archive" 
      style={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 'calc(var(--spacing-lg) + 80px)',
        paddingBottom: 'var(--spacing-xl)',
        paddingLeft: 'var(--projects-section-padding)',
        paddingRight: 'var(--projects-section-padding)',
        backgroundColor: 'transparent',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px'
      }}>
        {/* Archive Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASING }}
          style={{ 
            marginBottom: 'var(--spacing-xl)',
            textAlign: 'left'
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            color: 'var(--primary-white)',
            margin: 0,
            marginBottom: 'var(--spacing-sm)',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-primary)',
            textTransform: 'uppercase'
          }}>
            Archive
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--medium-grey)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0
          }}>
            Scroll to Discover
          </p>
        </motion.div>

        {/* Archive Projects - Alternating Left/Right Layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xl)',
          width: '100%'
        }}>
          {archiveProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const alignLeft = isEven;
            
            return (
            <motion.div
              key={project.id}
              initial={{ 
                opacity: 0, 
                x: alignLeft ? -100 : 100,
                y: 50
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0
              }}
              viewport={{ 
                once: false, 
                margin: "-100px" 
              }}
              transition={{ 
                duration: DURATION.slow, 
                ease: EASING 
              }}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: DURATION.fast, ease: EASING }
              }}
              className="bracket-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '75%',
                alignSelf: alignLeft ? 'flex-start' : 'flex-end',
                marginLeft: alignLeft ? 0 : 'auto',
                marginRight: alignLeft ? 'auto' : 0
              }}
            >
              {/* Project Image - Larger */}
              <motion.div
                style={{
                  width: '100%',
                  height: 'clamp(300px, 40vw, 500px)',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'var(--dark-grey)',
                  borderRadius: '2px'
                }}
              >
                <motion.img
                  src={project.imageUrl}
                  alt={project.title}
                  whileHover={{
                    scale: 1.05,
                    filter: 'brightness(1.1)',
                    transition: { duration: DURATION.fast, ease: EASING }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Project Number Overlay - Position based on alignment */}
                <div style={{
                  position: 'absolute',
                  top: 'var(--spacing-md)',
                  ...(alignLeft ? { left: 'var(--spacing-md)' } : { right: 'var(--spacing-md)' }),
                  fontSize: '0.875rem',
                  color: 'var(--primary-white)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '2px'
                }}>
                  <span className="bracket">[</span>
                  {String(index + 1).padStart(2, '0')}
                  <span className="bracket">]</span>
                </div>
              </motion.div>

              {/* Project Info - Single Line Format */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                flexWrap: 'wrap'
              }}>
                <h3 style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  fontWeight: 400,
                  color: 'var(--primary-white)',
                  margin: 0,
                  fontFamily: 'var(--font-primary)',
                  lineHeight: 1.4
                }}>
                  {project.title} – {project.description} ({project.year})
                </h3>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Archive;
