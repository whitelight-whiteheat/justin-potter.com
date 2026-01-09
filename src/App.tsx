import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/globals.css';
import Header from './components/Header';
import MainContent from './sections/MainContent';
import About from './sections/About';
import Contact from './sections/Contact';
import Archive from './sections/Archive';
import Footer from './components/Footer';
import { ProjectData } from './types';
import { DURATION, EASING } from './utils/animations';

// Shared main container styles
const mainContainerStyle: React.CSSProperties = {
  flex: 1,
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
  zIndex: 1,
  backgroundColor: 'transparent'
};

function App() {
  const [activeView, setActiveView] = useState<'main' | 'about' | 'contact' | 'archive'>('main');
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);
  const [showFooter, setShowFooter] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Track scroll on active view to show/hide footer
  useEffect(() => {
    const container = mainRef.current;
    if (!container) {
      setShowFooter(false);
      return;
    }

    // Find scrollable elements (sections with overflow: auto/scroll)
    const findScrollableElement = (): HTMLElement | null => {
      const sections = Array.from(container.querySelectorAll('section'));
      for (const section of sections) {
        const style = window.getComputedStyle(section);
        if (style.overflow === 'auto' || style.overflowY === 'auto' || style.overflow === 'scroll' || style.overflowY === 'scroll') {
          return section as HTMLElement;
        }
      }
      return null;
    };

    const scrollContainer = findScrollableElement() || container;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop || 0;
      const threshold = 50;
      setShowFooter(scrollTop > threshold);
    };

    // Check initial scroll position
    setTimeout(() => handleScroll(), 100);

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  return (
    <div className="App" id="top" style={{
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Persistent Background Grid - fixed layer that stays across all views */}
      <div 
        className="background-grid"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <Header onNavigate={setActiveView} activeView={activeView} />
      
      {/* Content Container with smooth transitions */}
      <AnimatePresence mode="wait">
        {activeView === 'main' && (
          <motion.main
            ref={mainRef}
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING }}
            style={mainContainerStyle}
          >
            <MainContent onProjectHover={setHoveredProject} />
          </motion.main>
        )}

        {activeView === 'about' && (
          <motion.main
            ref={mainRef}
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING }}
            style={mainContainerStyle}
          >
            <About />
          </motion.main>
        )}

        {activeView === 'contact' && (
          <motion.main
            ref={mainRef}
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING }}
            style={mainContainerStyle}
          >
            <Contact />
          </motion.main>
        )}

        {activeView === 'archive' && (
          <motion.main
            ref={mainRef}
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING }}
            style={mainContainerStyle}
          >
            <Archive />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer showFooter={showFooter} />
    </div>
  );
}

export default App;
