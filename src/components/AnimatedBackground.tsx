import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.background = `radial-gradient(640px circle at ${e.clientX}px ${e.clientY}px, rgba(159, 18, 57, 0.11), rgba(128, 0, 32, 0.05) 40%, transparent 72%)`;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = Math.min(34, Math.floor((width * height) / 48000));
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.4 + 0.6,
      color:
        i % 3 === 0
          ? 'rgba(190, 18, 60, 0.36)'
          : i % 3 === 1
            ? 'rgba(128, 0, 32, 0.38)'
            : 'rgba(251, 113, 133, 0.3)',
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      animationId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="bg-architectural-grid absolute inset-0 opacity-70" />

      {/* Maroon ambient light pools (give the glass panels something to blur) */}
      <div
        className="absolute -top-40 left-[18%] h-[560px] w-[560px] rounded-full opacity-50 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #9F1239 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[28%] -right-40 h-[500px] w-[500px] rounded-full opacity-40 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #BE123C 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-48 -left-32 h-[520px] w-[520px] rounded-full opacity-40 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #7A0F2B 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[8%] right-[22%] h-[360px] w-[360px] rounded-full opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #FB7185 0%, transparent 70%)' }}
      />

      <div ref={spotlightRef} className="absolute inset-0 transition-opacity duration-300" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
