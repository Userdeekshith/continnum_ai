import { useState } from 'react';

export default function HoverLetters({ text, className = '' }) {
  const [near, setNear] = useState(-1);
  const chars = Array.from(text);

  return (
    <span className={`display select-none ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className={`letter-hover ${near === i - 1 || near === i + 1 ? 'is-near' : ''}`}
          onMouseEnter={() => setNear(i)}
          onMouseLeave={() => setNear(-1)}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </span>
  );
}
