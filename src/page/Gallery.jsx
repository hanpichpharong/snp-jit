import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Sparkles,
  Maximize2,
  Heart,
  ChevronLeft,
  Pause,
  Play,
  ChevronRight,
  X,
} from 'lucide-react';

import img1 from '../assets/image1.jpg';
import img2 from '../assets/image2.jpg';
import img3 from '../assets/image3.jpg';
import img4 from '../assets/image4.jpg';
import img5 from '../assets/image5.jpg';
import img6 from '../assets/image6.jpg';
import img7 from '../assets/image7.jpg';
import img8 from '../assets/image8.jpg';

export default function Gallery({ onBackToHome }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [likes, setLikes] = useState({
    1: 42,
    2: 56,
    3: 39,
    4: 88,
    5: 65,
    6: 74,
    7: 59,
    8: 91,
  });
  const [userLiked, setUserLiked] = useState({});

  const photos = [
    {
      id: 1,
      src: img1,
      title: 'Golden Hour Together',
      tag: 'Sunset Glow 🌅',
      date: 'May 7',
      quote:
        'Even the most breathtaking sunset cannot compare to the glow in your eyes. With you, every ordinary moment feels golden.',
      detail:
        'A warm afternoon sitting side-by-side, soaking in the sunlight and enjoying each other’s presence.',
    },
    {
      id: 2,
      src: img2,
      title: 'Silly Faces & Playful Pouts',
      tag: 'Our Goofy Vibe ✌️',
      date: 'May 7',
      quote:
        'I love that we can be completely ridiculous together. You are my favorite kind of silly and the cutest person ever.',
      detail:
        'Peace signs, cute pouting, and that sweet smile that never fails to brighten my day.',
    },
    {
      id: 3,
      src: img3,
      title: 'Coffee Dates & Upside Down Hugs',
      tag: 'Cozy Cafe ☕',
      date: 'May 31',
      quote:
        'No matter how upside down the world gets, leaning against you will always be my safest, coziest place.',
      detail:
        'Taking funny selfies across the cafe table, drinking sweet drinks and talking about everything and nothing.',
    },
    {
      id: 4,
      src: img4,
      title: 'Walking in Paradise',
      tag: 'Botanical Garden 🌸🌲',
      date: 'May 31',
      quote:
        'Surrounded by blooming flowers and tall pines, yet all I could look at was you. You make every adventure feel like a dream.',
      detail:
        'A romantic stroll across the wooden bridge among red leaves, holding onto each other with wide happy smiles.',
    },
    {
      id: 5,
      src: img5,
      title: 'Warm Hugs & Mirror Selfies',
      tag: 'Our Sweet Height Difference 🤳💙',
      date: 'September 7',
      quote:
        'Wrapped safely in my arms is exactly where you belong. Every hug from you melts all my worries away.',
      detail:
        'Matching in blue and white, catching a sweet reflection together that captured just how lucky I am to hold you.',
    },
    {
      id: 6,
      src: img6,
      title: 'Matching Red Beanies',
      tag: 'Thrift & Style 🧢✨',
      date: 'September 12',
      quote:
        'No one rocks a beanie like you do! Thank you for always making simple shopping trips feel like the funnest date.',
      detail:
        'Checking out hats, fixing sleeves, posing in the clothing aisles and making each other laugh out loud.',
    },
    {
      id: 7,
      src: img7,
      title: 'Rocking Life Hand in Hand',
      tag: 'Forever Duo 🤘❤️',
      date: 'September 12',
      quote:
        'Two weirdos who found each other. I would choose you in every lifetime, every universe, again and again.',
      detail:
        'Doing our rock-on pose together with our twin red beanies. We make the best team in the whole world.',
    },
    {
      id: 8,
      src: img8,
      title: 'The Cutest Pout Ever',
      tag: 'Dinner Date Cutie 🍜💖',
      date: 'September 25',
      quote:
        'How can someone look this impossibly adorable even while waiting for food? That cute little face owns my entire heart.',
      detail:
        'Hot food, delicious dinner, and the most charming girl across the table making the world’s most precious expression.',
    },
  ];

  useEffect(() => {
    let interval = null;
    if (viewMode === 'slideshow' && isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [viewMode, isAutoPlay, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhoto !== null) {
        if (e.key === 'Escape') setActivePhoto(null);
        if (e.key === 'ArrowRight') {
          setActivePhoto((prev) => (prev + 1) % photos.length);
        }
        if (e.key === 'ArrowLeft') {
          setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, photos.length]);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setUserLiked((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 20,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166'],
    });
  };

  const handleSendLoveToPhoto = (photo) => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff6b8b', '#ffd700'],
    });
    setLikes((prev) => ({ ...prev, [photo.id]: (prev[photo.id] || 0) + 1 }));
    setUserLiked((prev) => ({ ...prev, [photo.id]: true }));
  };

  return (
    <div className="gallery-section" id="gallery-section">
      <div className="gallery-nav-bar animate-fade-down">
        <button onClick={onBackToHome} className="back-home-btn">
          <ArrowLeft size={18} />
          <span>Back to Message 💌</span>
        </button>
        <div className="gallery-view-controls">
          <button
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Polaroid Grid (8)
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'slideshow' ? 'active' : ''}`}
            onClick={() => {
              setViewMode('slideshow');
              setIsAutoPlay(true);
            }}
          >
            Slideshow Movie 🎬
          </button>
        </div>
      </div>

      <div className="gallery-header animate-fade-up">
        <span className="gallery-badge">
          <Sparkles size={15} />
          <span>Our Precious Memory Album</span>
          <Sparkles size={15} />
        </span>
        <h2 className="gallery-title">Every Picture Tells Our Love Story 💕</h2>
        <p className="gallery-subtitle">
          Hover to tilt, click any photo to zoom in, and tap the heart to send love!
        </p>
      </div>

      {viewMode === 'grid' && (
        <div className="polaroid-grid">
          {photos.map((photo, index) => {
            const isLiked = userLiked[photo.id];
            const tiltClass = `tilt-${(index % 4) + 1}`;
            return (
              <div
                key={photo.id}
                className={`polaroid-card ${tiltClass} animate-fade-up delay-${(index % 4) + 1}`}
                onClick={() => setActivePhoto(index)}
              >
                <div className="polaroid-pin">{index % 2 === 0 ? '📌' : '❤️'}</div>
                <div className="polaroid-img-wrapper">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="polaroid-image"
                    loading="lazy"
                  />
                  <div className="img-overlay-hover">
                    <span className="zoom-tag">
                      <Maximize2 size={16} /> Click to view
                    </span>
                  </div>
                </div>
                <div className="polaroid-caption-area">
                  <div className="caption-top">
                    <span className="photo-tag-pill">{photo.tag}</span>
                    <span className="photo-date">{photo.date}</span>
                  </div>
                  <h3 className="polaroid-photo-title">{photo.title}</h3>
                  <p className="polaroid-quote">“{photo.quote}”</p>
                  <div className="polaroid-card-footer">
                    <button
                      className={`photo-like-btn ${isLiked ? 'loved' : ''}`}
                      onClick={(e) => handleLike(photo.id, e)}
                      title="Send a heart"
                    >
                      <Heart
                        size={16}
                        fill={isLiked ? '#ff4d6d' : 'none'}
                        color={isLiked ? '#ff4d6d' : '#888'}
                      />
                      <span>{likes[photo.id]}</span>
                    </button>
                    <span className="photo-number">#{photo.id} of 8</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'slideshow' && (
        <div className="slideshow-container animate-fade-up">
          <div className="slideshow-display-card">
            <div className="slideshow-image-wrapper">
              <img
                src={photos[currentSlide].src}
                alt={photos[currentSlide].title}
                className="slideshow-main-img"
              />
            </div>
            <div className="slideshow-info">
              <div className="caption-top">
                <span className="photo-tag-pill">{photos[currentSlide].tag}</span>
                <span className="photo-date">{photos[currentSlide].date}</span>
              </div>
              <h3 className="slideshow-title">{photos[currentSlide].title}</h3>
              <p className="slideshow-quote">“{photos[currentSlide].quote}”</p>
              <p className="slideshow-detail">{photos[currentSlide].detail}</p>
              <div className="slideshow-actions">
                <button
                  className="slideshow-like-btn"
                  onClick={() => handleSendLoveToPhoto(photos[currentSlide])}
                >
                  <Heart size={18} fill="#ff4d6d" color="#ff4d6d" />
                  <span>Send Love to this Memory ({likes[photos[currentSlide].id]})</span>
                </button>
              </div>
            </div>
          </div>

          <div className="slideshow-controls">
            <button
              className="ctrl-nav-btn"
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length)
              }
              title="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="ctrl-play-btn"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
            >
              {isAutoPlay ? (
                <>
                  <Pause size={18} /> <span>Pause Slideshow</span>
                </>
              ) : (
                <>
                  <Play size={18} /> <span>Auto Play</span>
                </>
              )}
            </button>
            <button
              className="ctrl-nav-btn"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % photos.length)}
              title="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="slideshow-thumbnails">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                className={`thumb-btn ${index === currentSlide ? 'active-thumb' : ''}`}
                onClick={() => setCurrentSlide(index)}
              >
                <img src={photo.src} alt={photo.title} />
              </button>
            ))}
          </div>
        </div>
      )}

      {activePhoto !== null && (
        <div
          className="lightbox-backdrop animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="lightbox-content animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setActivePhoto(null)}
              title="Close (Esc)"
            >
              <X size={24} />
            </button>

            <div className="lightbox-image-container">
              <img
                src={photos[activePhoto].src}
                alt={photos[activePhoto].title}
                className="lightbox-large-image"
              />
              <button
                className="lightbox-nav-btn prev-btn"
                onClick={() =>
                  setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)
                }
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                className="lightbox-nav-btn next-btn"
                onClick={() =>
                  setActivePhoto((prev) => (prev + 1) % photos.length)
                }
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            <div className="lightbox-details">
              <div className="lightbox-header-row">
                <span className="photo-tag-pill">{photos[activePhoto].tag}</span>
                <span className="lightbox-counter">
                  Photo {activePhoto + 1} of {photos.length}
                </span>
              </div>
              <h2 className="lightbox-title">{photos[activePhoto].title}</h2>
              <p className="lightbox-quote">“{photos[activePhoto].quote}”</p>
              <p className="lightbox-detail-text">{photos[activePhoto].detail}</p>
              <div className="lightbox-action-row">
                <button
                  className="lightbox-love-btn"
                  onClick={() => handleSendLoveToPhoto(photos[activePhoto])}
                >
                  <Heart size={20} fill="#ff4d6d" color="#ff4d6d" />
                  <span>Send Her A Heart ({likes[photos[activePhoto].id]})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
