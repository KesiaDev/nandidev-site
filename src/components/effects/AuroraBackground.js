import React from 'react';

/**
 * Animated mesh-gradient blobs (aurora effect) in the brand colors.
 * Pure CSS animation (translate + scale drift) — no canvas/WebGL needed.
 * variant controls blob placement/size so each section can look distinct.
 */
const AuroraBackground = ({ variant = 'hero', className = '' }) => {
  const blobs = variant === 'cta'
    ? [
        { cls: 'aurora-blob aurora-drift-1', style: { top: '-10%', left: '5%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)' } },
        { cls: 'aurora-blob aurora-drift-2', style: { bottom: '-15%', right: '5%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)' } },
        { cls: 'aurora-blob aurora-drift-3', style: { top: '30%', left: '50%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)' } },
      ]
    : [
        { cls: 'aurora-blob aurora-drift-1', style: { top: '-15%', left: '-10%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(124,58,237,0.30), transparent 70%)' } },
        { cls: 'aurora-blob aurora-drift-2', style: { bottom: '-20%', right: '-10%', width: 620, height: 620, background: 'radial-gradient(circle, rgba(34,211,238,0.26), transparent 70%)' } },
        { cls: 'aurora-blob aurora-drift-3', style: { top: '35%', left: '55%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(37,99,235,0.24), transparent 70%)' } },
        { cls: 'aurora-blob aurora-drift-2', style: { top: '5%', right: '20%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(249,115,22,0.16), transparent 70%)' } },
      ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {blobs.map((b, i) => (
        <div key={i} className={b.cls} style={{ position: 'absolute', filter: 'blur(90px)', borderRadius: '50%', ...b.style }} />
      ))}
    </div>
  );
};

export default AuroraBackground;
