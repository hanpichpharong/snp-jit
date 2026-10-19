import { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Heart } from 'lucide-react';

export default function LoveLetterModal({ isOpen, onClose }) {
  const [kissCount, setKissCount] = useState(0);

  if (!isOpen) return null;

  const handleSendKissBack = () => {
    setKissCount((prev) => prev + 1);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166'],
    });
  };

  return (
    <div className="letter-modal-backdrop animate-fade-in" onClick={onClose}>
      <div
        className="letter-modal-paper animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="letter-close-btn" onClick={onClose} title="Close Letter">
          <X size={22} />
        </button>

        <div className="letter-inner-content">
          <div className="letter-stamp-area">
            <span className="wax-seal">💌</span>
            <div className="letter-meta-date">To My Forever Person</div>
          </div>

          <h1 className="letter-main-title">My Beautiful Sweetheart,</h1>

          <div className="letter-paragraphs">
            <p>
              I wanted to write this letter to remind you of something very important: You are the most
              incredible thing that has ever walked into my life.
            </p>
            <p>
              Every time I see you smile, all the noise in the world disappears. You make ordinary days
              feel like grand celebrations. Even when we are simply running errands, wearing silly beanies,
              or sitting across a table sipping coffee, you make me the happiest person alive.
            </p>
            <p>
              Thank you for being you — for your warmth, your pure heart, your sweet pouts, your funny
              jokes, and the gentle way you love me. I promise to always stand by you, make you laugh when
              you’re down, celebrate your biggest wins, and hold your hand through whatever comes our way.
            </p>
            <p>
              These photos are just a small reflection of our journey together so far. I cannot wait to
              fill pages and pages of photo albums with you for the rest of our lives.
            </p>
          </div>

          <div className="letter-signoff">
            <p className="closing-words">With all my love, always & forever,</p>
            <p className="signature-name">Yours Always ❤️</p>
          </div>

          <div className="letter-kiss-box">
            <button onClick={handleSendKissBack} className="kiss-interactive-btn">
              <Heart size={18} fill="#ff4d6d" color="#ff4d6d" />
              <span>Send A Little Kiss Back {kissCount > 0 && `(x${kissCount})`}</span>
            </button>
            {kissCount > 0 && (
              <span className="kiss-feedback">Received with love! 🥰💋</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
