import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Mail, Smile, Camera, ArrowDown } from 'lucide-react';

export default function Home({ onOpenGallery, onOpenLetter }) {
  const [reasonIndex, setReasonIndex] = useState(0);
  const [kissSent, setKissSent] = useState(false);
  const [kissCount, setKissCount] = useState(999);

  const sweetReasons = [
    'Your adorable pout that always makes my heart melt 🥺',
    'The way your face lights up whenever you laugh 💕',
    'How cozy and warm it feels every time you hold my arm 🧸',
    'Your incredible kindness and how caring you are 🌸',
    'That you are not just my girlfriend, but my absolute best friend 👫',
    'Our funny matching beanie moments and silly selfies 🧢',
    'Every sweet memory we have made, and all the ones waiting for us ✨',
  ];

  const handleSendKiss = () => {
    setKissSent(true);
    setKissCount((prev) => prev + 1);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#e63964', '#ff4d6d', '#ff85a1'],
    });
  };

  const handleNextReason = () => {
    setReasonIndex((prev) => (prev + 1) % sweetReasons.length);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff6584', '#ff8da1', '#ffd1dc', '#ff4d6d'],
    });
  };

  const handleCtaClick = () => {
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff6b8b', '#ffa8ba', '#ffd700', '#ffffff'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1'],
      });
    }, 250);
    onOpenGallery();
  };

  return (
    <div className="home-container">
      <div className="hero-badge animate-fade-down">
        <Sparkles size={16} className="sparkle-icon" />
        <span>A Special Little Surprise Just For You</span>
        <Heart size={15} className="heart-mini-icon" fill="#ff6584" />
      </div>

      <h1 className="hero-title animate-fade-up">
        To My Sweetest Girl In The World <span className="title-heart">💖</span>
      </h1>

      <p className="hero-subtitle animate-fade-up delay-1">
        I made this website because you deserve all the love, smiles, and magic every single day.
      </p>

      <div className="sweet-message-card animate-scale-up delay-2">
        <div className="card-top-decoration">
          <span className="stamp">💌 For You</span>
          <span className="card-sparkle">✨✨✨</span>
        </div>

        <h2 className="letter-salutation">My Dearest Love,</h2>

        <div className="letter-body">
          <p>
            From the very first moment we started sharing our days together, my life became so much
            brighter, warmer, and filled with genuine laughter.
          </p>
          <p>
            Whether we are walking under the golden sunset, having quiet coffee dates, trying on funny
            hats, or just sharing our goofiest faces — every single second with you is my favorite memory.
          </p>
          <p className="letter-highlight">
            “You are my sunshine, my happiest thoughts, and my favorite person in the whole universe.”
          </p>
          <p>
            I put together our sweetest photos so you can always look back and see how beautiful our
            journey is.
          </p>
        </div>

        <div className="letter-footer">
          <div className="letter-actions">
            <button onClick={onOpenLetter} className="read-full-letter-btn">
              <Mail size={16} />
              <span>Read Full Love Letter 💌</span>
            </button>
            <button
              onClick={handleSendKiss}
              className={`send-love-btn ${kissSent ? 'loved' : ''}`}
            >
              <Heart size={16} fill={kissSent ? '#ff4d6d' : 'none'} />
              <span>Send Me A Kiss ({kissCount})</span>
            </button>
          </div>
          <span className="signature">Forever yours, with all my heart ❤️</span>
        </div>
      </div>

      <div className="compliment-box animate-fade-up delay-3">
        <div className="compliment-header">
          <Smile size={18} className="smile-icon" />
          <span>Why I Fell In Love With You:</span>
        </div>
        <p className="compliment-text">“{sweetReasons[reasonIndex]}”</p>
        <button onClick={handleNextReason} className="compliment-btn">
          <span>Click For Another Sweet Reason 🌸</span>
        </button>
      </div>

      <div className="cta-wrapper animate-bounce-slow delay-3">
        <button onClick={handleCtaClick} className="see-photos-cta-btn" id="see-photos-button">
          <div className="btn-glow-layer"></div>
          <div className="btn-content">
            <span className="btn-icon-wrap">
              <Camera size={26} className="camera-icon" />
            </span>
            <div className="btn-text-group">
              <span className="btn-main-text">Click To See Our Photos 📸</span>
              <span className="btn-sub-text">Our sweetest & cutest memories inside ✨</span>
            </div>
            <Sparkles size={22} className="btn-sparkle" />
          </div>
        </button>

        <div className="cta-hint">
          <ArrowDown size={18} className="arrow-down-bounce" />
          <span>Click the button above to unlock the photo gallery!</span>
        </div>
      </div>

      <div className="stats-row animate-fade-up delay-4">
        <div className="stat-card">
          <span className="stat-emoji">📸</span>
          <span className="stat-val">8</span>
          <span className="stat-label">Precious Moments</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">♾️</span>
          <span className="stat-val">∞</span>
          <span className="stat-label">Endless Love</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">🥰</span>
          <span className="stat-val">100%</span>
          <span className="stat-label">Happiest With You</span>
        </div>
      </div>
    </div>
  );
}
