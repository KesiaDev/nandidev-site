import React, { useRef, useEffect } from 'react';

const BRAND = ['#7c3aed', '#2563eb', '#22d3ee', '#f97316'];

/**
 * Animated glowing "AI core" — a pulsing sphere with rotating orbital
 * rings and node satellites, echoing the connected-node motif of the
 * NandiDev logo. Canvas-based, brand-colored, no external assets —
 * stands in for a literal 3D render/photo as the hero's visual centerpiece.
 */
const NeuralCore = ({ size = 480, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    const coreR = size * 0.16;

    const rings = [
      { rx: size * 0.30, ry: size * 0.11, speed: 0.006, tilt: -0.25, color: BRAND[1], nodes: 3 },
      { rx: size * 0.40, ry: size * 0.16, speed: -0.004, tilt: 0.35, color: BRAND[2], nodes: 4 },
      { rx: size * 0.47, ry: size * 0.08, speed: 0.003, tilt: 0.05, color: BRAND[3], nodes: 2 },
    ];

    let t = 0;
    let raf;

    const drawRing = (ring, time) => {
      const angle = time * ring.speed;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ring.tilt);
      ctx.strokeStyle = ring.color;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      for (let i = 0; i < ring.nodes; i++) {
        const a = angle + (i / ring.nodes) * Math.PI * 2;
        const nx = Math.cos(a) * ring.rx;
        const ny = Math.sin(a) * ring.ry;
        const depth = (Math.sin(a) + 1) / 2; // 0..1, front/back illusion
        ctx.globalAlpha = 0.5 + depth * 0.5;
        ctx.fillStyle = ring.color;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5 + depth * 2, 0, Math.PI * 2);
        ctx.fill();
        // connecting spoke to core
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = 0.12 + depth * 0.1;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Core glow
      const pulse = 1 + Math.sin(t * 0.02) * 0.06;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.4 * pulse);
      grad.addColorStop(0, 'rgba(124,58,237,0.55)');
      grad.addColorStop(0.35, 'rgba(37,99,235,0.28)');
      grad.addColorStop(0.7, 'rgba(34,211,238,0.10)');
      grad.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 2.4 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Core solid
      const coreGrad = ctx.createRadialGradient(cx - coreR * 0.3, cy - coreR * 0.3, coreR * 0.1, cx, cy, coreR);
      coreGrad.addColorStop(0, '#e9d5ff');
      coreGrad.addColorStop(0.4, BRAND[0]);
      coreGrad.addColorStop(1, BRAND[1]);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * pulse, 0, Math.PI * 2);
      ctx.fill();

      rings.forEach((r) => drawRing(r, t));

      t += 1;
      if (!prefersReducedMotion) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default NeuralCore;
