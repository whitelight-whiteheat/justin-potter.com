import React, { useState } from 'react';
import './styles/globals.css';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [activeView, setActiveView] = useState<'main' | 'about' | 'contact'>('main');

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
          flexDirection: 'column'
        }}>
          <div style={{ flexShrink: 0 }}>
            <Hero />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Projects />
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
