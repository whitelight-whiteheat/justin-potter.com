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
