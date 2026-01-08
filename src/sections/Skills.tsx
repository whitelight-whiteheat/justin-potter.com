import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const frontendSkills = [
    { name: 'HTML5', level: 90, status: 'Experienced' },
    { name: 'CSS3', level: 85, status: 'Experienced' },
    { name: 'SASS', level: 75, status: 'Intermediate' },
    { name: 'JavaScript', level: 70, status: 'Intermediate' },
    { name: 'React', level: 75, status: 'Intermediate' },
    { name: 'Node.js', level: 70, status: 'Intermediate' }
  ];

  const backendSkills = [
    { name: 'Express.js', level: 70, status: 'Intermediate' },
    { name: 'PostgreSQL', level: 65, status: 'Intermediate' },
    { name: 'Git', level: 80, status: 'Experienced' },
    { name: 'Docker', level: 60, status: 'Basic' }
  ];

  const SkillBar = ({ skill, index }: { skill: { name: string; level: number; status: string }, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      style={{ 
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--dark-grey)',
        borderRadius: '8px',
        border: '1px solid var(--medium-grey)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 'var(--spacing-sm)'
      }}>
        <h4 style={{ 
          marginBottom: '0',
          fontSize: '1.125rem',
          fontWeight: 500,
          color: 'var(--primary-black)'
        }}>
          {skill.name}
        </h4>
        <span style={{ 
          color: 'var(--primary-white)', 
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          {skill.status}
        </span>
      </div>
      <div style={{ 
        width: '100%', 
        height: '8px', 
        backgroundColor: 'var(--dark-grey)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          style={{ 
            height: '100%', 
            backgroundColor: 'var(--primary-black)',
            borderRadius: '4px'
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="section" style={{
      backgroundColor: 'var(--primary-black)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
            color: 'var(--primary-white)', 
            fontSize: '0.875rem',
            fontWeight: 400,
            marginBottom: 'var(--spacing-sm)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Explore My
          </motion.div>
          <motion.h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 400,
            color: 'var(--primary-black)',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Skills & Experience
          </motion.h2>
        </motion.div>
        
        {/* Frontend Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 'var(--spacing-xl)' }}
        >
          <h3 style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--primary-black)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 'var(--spacing-sm)'
          }}>
            <span style={{ fontSize: '1.5rem' }}>💻</span>
            Frontend Development
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-md)'
          }}>
            {frontendSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Backend Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--primary-black)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 'var(--spacing-sm)'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🗄️</span>
            Backend & Tools
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-md)'
          }}>
            {backendSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index + frontendSkills.length} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
