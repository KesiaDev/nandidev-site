import React, { useRef, useEffect } from 'react';

/**
 * Radial glow that follows the cursor within its parent section.
 * Renders an absolutely-positioned overlay div whose position is driven by
 * CSS custom properties updated on mousemove (no React re-render).
 */
const Spotlight = ({ size = 500, color = 'rgba(124,58,237,0.14)', className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return;

    const handleMove = (e) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--sy', `${e.clientY - rect.top}px`);
      el.style.opacity = '1';
    };
    const handleLeave = () => { el.style.opacity = '0'; };

    parent.addEventListener('mousemove', handleMove);
    parent.addEventListener('mouseleave', handleLeave);
    return () => {
      parent.removeEventListener('mousemove', handleMove);
      parent.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 50%), ${color}, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
};

export default Spotlight;
