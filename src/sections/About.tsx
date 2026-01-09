import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING } from '../utils/animations';
import linkedinIcon from '../assets/linkedin.png';
import githubIcon from '../assets/github.png';

const About = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = 'Bjmpotter@gmail.com';
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/justin-mpotter/',
      icon: linkedinIcon
    },
    {
      name: 'GitHub',
      url: 'https://github.com/whitelight-whiteheat',
      icon: githubIcon
    }
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section 
      id="about" 
      style={{ 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        paddingTop: 'calc(var(--spacing-lg) + 80px)',
        paddingBottom: 'var(--spacing-xl)',
        paddingLeft: 'var(--projects-section-padding)',
        paddingRight: 'var(--projects-section-padding)',
        backgroundColor: 'transparent'
      }}
    >
      <div style={{ 
        width: '100%', 
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: '100px'
      }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASING }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            color: 'var(--primary-white)',
            margin: 0,
            marginBottom: 'var(--spacing-xl)',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-primary)',
            textTransform: 'uppercase'
          }}
        >
          Info
        </motion.h1>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.1, ease: EASING }}
          style={{
            marginBottom: 'var(--spacing-xl)'
          }}
        >
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--primary-white)',
            marginBottom: 'var(--spacing-md)',
            fontFamily: 'var(--font-primary)'
          }}>
            I'm Justin Potter, a fullstack developer based in Brooklyn, NY.
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--primary-white)',
            marginBottom: 'var(--spacing-md)',
            fontFamily: 'var(--font-primary)'
          }}>
            Originally from Brooklyn and passionate about creating digital experiences that stand out and drive meaningful results.
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--primary-white)',
            marginBottom: 'var(--spacing-md)',
            fontFamily: 'var(--font-primary)'
          }}>
            Specializing in fullstack development, user-centered design, and modern web technologies.
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--primary-white)',
            marginBottom: 'var(--spacing-md)',
            fontFamily: 'var(--font-primary)'
          }}>
            Passionate about creating memorable experiences through clean code, intuitive interfaces, and thoughtful design.
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: 'var(--primary-white)',
            marginBottom: 'var(--spacing-xl)',
            fontFamily: 'var(--font-primary)'
          }}>
            Available for freelance opportunities.
          </p>
        </motion.div>

        {/* Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.2, ease: EASING }}
          style={{
            marginBottom: 'var(--spacing-xl)'
          }}
        >
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'var(--medium-grey)',
            margin: 0,
            marginBottom: 'var(--spacing-sm)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}>
            Email
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            flexWrap: 'wrap'
          }}>
            <a
              href={`mailto:${email}`}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--primary-white)',
                textDecoration: 'none',
                fontFamily: 'var(--font-primary)',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--lime-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--primary-white)';
              }}
            >
              {email}
            </a>
            <button
              onClick={handleCopyEmail}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--medium-grey)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.25rem 0.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--lime-green)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--medium-grey)';
              }}
            >
              {copiedEmail ? 'Copied!' : 'Copy Email Address'}
            </button>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, delay: 0.3, ease: EASING }}
        >
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-lg)',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DURATION.normal, delay: 0.4 + index * 0.1, ease: EASING }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: DURATION.fast, ease: EASING }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  textDecoration: 'none',
                  color: 'var(--primary-white)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)'
                }}
              >
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--medium-grey)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Visit {social.name} profile
                </span>
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--primary-white)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em'
                }}>
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
