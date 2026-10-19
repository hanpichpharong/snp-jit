import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.4);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const noteIndexRef = useRef(0);

  const notes = [
    { note: 523.25, dur: 0.6 },
    { note: 659.25, dur: 0.6 },
    { note: 783.99, dur: 0.6 },
    { note: 987.77, dur: 0.8 },
    { note: 880.00, dur: 0.6 },
    { note: 659.25, dur: 0.6 },
    { note: 587.33, dur: 0.6 },
    { note: 523.25, dur: 0.8 },
    { note: 440.00, dur: 0.6 },
    { note: 523.25, dur: 0.6 },
    { note: 659.25, dur: 0.6 },
    { note: 783.99, dur: 0.8 },
    { note: 698.46, dur: 0.6 },
    { note: 659.25, dur: 0.6 },
    { note: 587.33, dur: 0.6 },
    { note: 523.25, dur: 0.8 },
    { note: 349.23, dur: 0.6 },
    { note: 440.00, dur: 0.6 },
    { note: 523.25, dur: 0.6 },
    { note: 659.25, dur: 0.8 },
    { note: 587.33, dur: 0.6 },
    { note: 523.25, dur: 0.6 },
    { note: 493.88, dur: 0.6 },
    { note: 523.25, dur: 1.0 },
  ];

  const playTone = (freq, duration) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * 0.35, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.8);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration * 2);
  };

  const scheduleNextNote = () => {
    const currentNote = notes[noteIndexRef.current];
    playTone(currentNote.note, currentNote.dur);
    noteIndexRef.current = (noteIndexRef.current + 1) % notes.length;
    timerRef.current = setTimeout(scheduleNextNote, currentNote.dur * 850);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
      noteIndexRef.current = 0;
      scheduleNextNote();
    }
  };

  return (
    <div className="music-player-widget">
      <button
        onClick={toggleMusic}
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? 'Pause romantic music' : 'Play romantic music box'}
        aria-label="Toggle romantic music"
      >
        <span className="music-icon-wrap">
          {isPlaying ? (
            <Volume2 size={18} className="pulse-icon" />
          ) : (
            <VolumeX size={18} />
          )}
        </span>
        <span className="music-label">
          {isPlaying ? 'Romantic Melody Playing ♪' : 'Play Sweet Melody ♫'}
        </span>
        {isPlaying && (
          <div className="music-bars">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </div>
        )}
      </button>
    </div>
  );
}
