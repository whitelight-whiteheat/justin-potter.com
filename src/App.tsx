import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import { ProjectData } from './types';

// Shared main container styles
const mainContainerStyle: React.CSSProperties = {
  flex: 1,
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};

function App() {
  const [activeView, setActiveView] = useState<'main' | 'about' | 'contact'>('main');
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);

  // #region agent log
  useEffect(() => {
    console.log('App: hoveredProject changed to:', hoveredProject?.title || null);
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:24',message:'hoveredProject state changed in App',data:{hoveredProject:hoveredProject?.title||null,hasProject:!!hoveredProject},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'F'})}).catch((err)=>{console.error('Log fetch failed:',err);});
  }, [hoveredProject]);
  // #endregion

  return (
    <div className="App" id="top" style={{
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header onNavigate={setActiveView} />
      {/* Main View - Hero + Projects */}
      {activeView === 'main' && (
        <main style={{
          ...mainContainerStyle,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ flexShrink: 0 }}>
            <Hero hoveredProject={hoveredProject} />
          </div>
          <div style={{ flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
            <Projects onProjectHover={setHoveredProject} />
          </div>
        </main>
      )}

      {/* About View */}
      {activeView === 'about' && (
        <main style={mainContainerStyle}>
          <About />
        </main>
      )}

      {/* Contact View */}
      {activeView === 'contact' && (
        <main style={mainContainerStyle}>
          <Contact />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
