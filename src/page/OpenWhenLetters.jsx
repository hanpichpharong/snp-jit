import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, X, Heart } from 'lucide-react';

export default function OpenWhenLetters() {
  const [activeLetter, setActiveLetter] = useState(null);

  const letters = [
    {
      id: 1,
      envelopeTitle: 'Open when you miss me 🥺',
      tag: 'Close to My Heart',
      message:
        'Whenever you feel lonely or miss me, please remember that no matter the physical distance, my heart is right next to yours. Close your eyes, take a deep breath, and remember my arms around you. I am always just a phone call or a heartbeat away.',
      signoff: 'Always missing you more 💕',
    },
    {
      id: 2,
      envelopeTitle: 'Open when you had a hard day 🫂',
      tag: 'Safe Haven',
      message:
        'You worked so hard today, and I am endlessly proud of you. Let go of the stress, put on cozy clothes, and know that you are stronger than any bad day. Tomorrow is a brand new start, and I will be cheering for you every step of the way.',
      signoff: 'Big warm hugs waiting for you 🧸',
    },
    {
      id: 3,
      envelopeTitle: 'Open when you doubt your beauty 🌸',
      tag: 'You Are Stunning',
      message:
        'Just in case you forgot: You are the most breathtaking, radiant person I have ever seen. From your natural messy hair in the morning to your cutest silly pouts, your beauty mesmerizes me every single day. Both inside and out, you are pure magic.',
      signoff: 'Mesmerized by you forever ✨',
    },
    {
      id: 4,
      envelopeTitle: 'Open when you need a smile 😊',
      tag: 'Daily Joy',
      message:
        'Think of the goofy beanies we wore, the silly upside-down photos we took, and the funny faces we pull at each other! Life is so much lighter and full of laughter with you. Put on that sweet smile that makes my entire day brighten up!',
      signoff: 'Your personal comedian & lover 🧢❤️',
    },
  ];

  const handleOpenLetter = (letter) => {
    setActiveLetter(letter);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff6584', '#ffd6df', '#ff758f'],
    });
  };

  return (
    <div className="open-when-section animate-fade-up">
      <div className="section-header-center">
        <span className="gallery-badge">
          <Mail size={16} />
          <span>Love Notes Capsule</span>
          <Sparkles size={16} />
        </span>
        <h2 className="gallery-title">“Open When...” Envelopes 💌</h2>
        <p className="gallery-subtitle">
          Whenever you need a little comfort, click any envelope to reveal a special note from my heart.
        </p>
      </div>

      <div className="envelopes-grid">
        {letters.map((letter) => (
          <div
            key={letter.id}
            className="envelope-card"
            onClick={() => handleOpenLetter(letter)}
          >
            <div className="envelope-top-flap"></div>
            <div className="envelope-body">
              <span className="envelope-stamp">❤️</span>
              <span className="envelope-tag">{letter.tag}</span>
              <h3 className="envelope-title">{letter.envelopeTitle}</h3>
              <span className="envelope-cta">Click to Open Letter 💌</span>
            </div>
          </div>
        ))}
      </div>

      {activeLetter && (
        <div
          className="letter-modal-backdrop animate-fade-in"
          onClick={() => setActiveLetter(null)}
        >
          <div
            className="mini-note-modal animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="letter-close-btn"
              onClick={() => setActiveLetter(null)}
            >
              <X size={20} />
            </button>
            <div className="mini-note-content">
              <span className="mini-note-seal">💌</span>
              <h3 className="mini-note-title">{activeLetter.envelopeTitle}</h3>
              <p className="mini-note-text">“{activeLetter.message}”</p>
              <div className="mini-note-signoff">
                <Heart size={16} fill="#ff4d6d" color="#ff4d6d" />
                <span>{activeLetter.signoff}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
