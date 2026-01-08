import React, { useState } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

interface ProjectData {
  title: string;
  year: number;
}

function App() {
  const [activeView, setActiveView] = useState<'main' | 'about' | 'contact'>('main');
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);

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
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
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
        <main style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          height: '100%'
        }}>
          <About />
        </main>
      )}

      {/* Contact View */}
      {activeView === 'contact' && (
        <main style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          height: '100%'
        }}>
          <Contact />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
