import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
  color: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const colors = [
      'rgba(6, 182, 212, ',   // cyan
      'rgba(59, 130, 246, ',  // blue
      'rgba(139, 92, 246, ',  // purple
      'rgba(16, 185, 129, '   // emerald
    ];

    // Generate stochastic particles
    const particleCount = Math.min(100, Math.floor((width * height) / 12000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render subtle stochastic vector field lines (Markov field)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Stochastic update with subtle drift
        p1.x += p1.vx + Math.sin(time + p1.y * 0.01) * 0.25;
        p1.y += p1.vy + Math.cos(time + p1.x * 0.01) * 0.25;

        // Boundary wrap
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Mouse interaction (repulsion field)
        const dx = p1.x - mouseX;
        const dy = p1.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p1.x += (dx / dist) * force * 3;
          p1.y += (dy / dist) * force * 3;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes to form empirical network graph
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distBetween < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - distBetween / 110) * 0.15;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto w-full h-full opacity-70 z-0"
    />
  );
}
