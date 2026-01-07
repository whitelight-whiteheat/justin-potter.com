import React from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';
import experienceIcon from '../assets/experience.png';
import educationIcon from '../assets/education.png';

const About = () => {
  return (
    <section id="about" className="section" style={{ 
      backgroundColor: 'var(--primary-white)',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto'
    }}>
      <div className="container" style={{ width: '100%', maxWidth: '1200px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}
        >
          <motion.div style={{ 
            color: 'var(--medium-grey)', 
            fontSize: '0.875rem',
            fontWeight: 400,
            marginBottom: 'var(--spacing-sm)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Get To Know More
          </motion.div>
          <motion.h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 400,
            color: 'var(--primary-black)',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            About Me
          </motion.h2>
        </motion.div>

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          display: 'grid',
          gap: 'var(--spacing-lg)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.8,
              color: 'var(--medium-grey)',
              marginBottom: 'var(--spacing-md)'
            }}>
              I'm Justin, a passionate fullstack developer based in Brooklyn, NY. 
              I love creating digital experiences that not only look great but also 
              solve real problems for users. My approach combines clean, maintainable 
              code with intuitive user interfaces.
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.8,
              color: 'var(--medium-grey)'
            }}>
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or enjoying the vibrant tech 
              community here in New York.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spacing-md)',
              marginTop: 'var(--spacing-lg)'
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ 
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--light-grey)',
                borderRadius: '8px',
                border: '1px solid var(--border-grey)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src={experienceIcon} 
                  alt="Experience" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div>
                <h4 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--primary-black)'
                }}>
                  Experience
                </h4>
                <p style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--primary-black)', fontWeight: 600 }}>
                  2+ years
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--medium-grey)', marginBottom: '0' }}>
                  Fullstack Development
                </p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ 
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--light-grey)',
                borderRadius: '8px',
                border: '1px solid var(--border-grey)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src={educationIcon} 
                  alt="Education" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div>
                <h4 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--primary-black)'
                }}>
                  Education
                </h4>
                <p style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--primary-black)', fontWeight: 600 }}>
                  B.Sc. Degree
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--medium-grey)', marginBottom: '0' }}>
                  Computer Science
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
