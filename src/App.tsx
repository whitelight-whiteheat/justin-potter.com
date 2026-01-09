import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/globals.css';
import Header from './components/Header';
import MainContent from './sections/MainContent';
import About from './sections/About';
import Contact from './sections/Contact';
import Archive from './sections/Archive';
import { ProjectData } from './types';
import { DURATION, EASING } from './utils/animations';

// Shared main container styles
const mainContainerStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  height: '100%',
  zIndex: 1,
  backgroundColor: 'transparent'
};

function App() {
  const [activeView, setActiveView] = useState<'main' | 'about' | 'contact' | 'archive'>('main');
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);

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
    </div>
  );
}

export default App;
