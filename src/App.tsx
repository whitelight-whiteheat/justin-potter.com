import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import MainContent from './sections/MainContent';
import About from './sections/About';
import Contact from './sections/Contact';
import Archive from './sections/Archive';
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
  const [activeView, setActiveView] = useState<'main' | 'about' | 'contact' | 'archive'>('main');
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
      <Header onNavigate={setActiveView} activeView={activeView} />
      {/* Main View - Merged Hero + Projects */}
      {activeView === 'main' && (
        <main style={mainContainerStyle}>
          <MainContent onProjectHover={setHoveredProject} />
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

      {/* Archive View */}
      {activeView === 'archive' && (
        <main style={mainContainerStyle}>
          <Archive />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
