import { useState } from 'react';
import { Heart, Mail, Camera, Sparkles, Ticket } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import MusicPlayer from './MusicPlayer';
import Home from './Home';
import Gallery from './Gallery';
import LoveCoupons from './LoveCoupons';
import OpenWhenLetters from './OpenWhenLetters';
import LoveLetterModal from './LoveLetterModal';
import './surprise.css';

export default function SurprisePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const goToGallery = () => {
    setActiveTab('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToOpenWhen = () => {
    setActiveTab('openwhen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCoupons = () => {
    setActiveTab('coupons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="surprise-page-wrapper">
      <FloatingHearts />

      <header className="top-nav-bar">
        <div className="nav-brand" onClick={goToHome} style={{ cursor: 'pointer' }}>
          <Heart size={22} className="brand-heart-icon" fill="#e63964" />
          <span>For My Sweetheart</span>
        </div>

        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={goToHome}
          >
            <Mail size={15} />
            <span>Sweet Message</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={goToGallery}
          >
            <Camera size={15} />
            <span>Our Photos (8)</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'openwhen' ? 'active' : ''}`}
            onClick={goToOpenWhen}
          >
            <Sparkles size={15} />
            <span>Open When...</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'coupons' ? 'active' : ''}`}
            onClick={goToCoupons}
          >
            <Ticket size={15} />
            <span>Love Coupons</span>
          </button>
        </nav>

        <MusicPlayer />
      </header>

      <main className="main-content-flow">
        {activeTab === 'home' && (
          <Home
            onOpenGallery={goToGallery}
            onOpenLetter={() => setIsLetterOpen(true)}
          />
        )}
        {activeTab === 'gallery' && <Gallery onBackToHome={goToHome} />}
        {activeTab === 'openwhen' && <OpenWhenLetters />}
        {activeTab === 'coupons' && <LoveCoupons />}
      </main>

      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      <footer className="surprise-footer">
        <div className="footer-love-text">
          <span>Made with endless love for the prettiest girl in the world</span>
          <Heart size={15} fill="#ff4d6d" color="#ff4d6d" />
        </div>
        <p className="footer-sub">Every moment with you is my favorite memory ✨</p>
      </footer>
    </div>
  );
}
