import { useState, useEffect } from 'react';

export default function FloatingHearts() {
  const [ambientHearts] = useState(() => {
    const symbols = ['❤️', '💖', '💕', '✨', '🌸', '💗', '🥰', '💐'];
    return Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      size: Math.random() * 18 + 14,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.45 + 0.25,
    }));
  });

  const [burstHearts, setBurstHearts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const clickSymbols = ['💖', '💕', '✨', '🌸', '❤️', '💋'];
      const newBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol: clickSymbols[Math.floor(Math.random() * clickSymbols.length)],
      };
      setBurstHearts((prev) => [...prev.slice(-15), newBurst]);
      setTimeout(() => {
        setBurstHearts((prev) => prev.filter((item) => item.id !== newBurst.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {ambientHearts.map((heart) => (
        <span
          key={heart.id}
          className="ambient-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.symbol}
        </span>
      ))}
      {burstHearts.map((burst) => (
        <span
          key={burst.id}
          className="click-burst-heart"
          style={{
            left: `${burst.x}px`,
            top: `${burst.y}px`,
          }}
        >
          {burst.symbol}
        </span>
      ))}
    </div>
  );
}
