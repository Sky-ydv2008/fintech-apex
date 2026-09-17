import React, { useEffect, useRef, useState } from 'react';

export const TriNodeOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeNode, setActiveNode] = useState<string>('AI');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system
    const numParticles = 70;
    const particles = Array.from({ length: numParticles }, () => ({
      x: (Math.random() - 0.5) * width * 0.8,
      y: (Math.random() - 0.5) * height * 0.8,
      z: (Math.random() - 0.5) * 400,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      speedZ: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.001;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let angleY = 0;
    let angleX = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      angleY += 0.008 + mouseX;
      angleX += 0.003 + mouseY;

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw background core radial glow
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.35
      );
      radialGlow.addColorStop(0, 'rgba(255, 94, 0, 0.25)');
      radialGlow.addColorStop(0.5, 'rgba(255, 94, 0, 0.06)');
      radialGlow.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Node Positions (3 nodes equilateral triangle in 3D)
      const baseRadius = Math.min(width, height) * 0.28;
      const rawNodes = [
        { name: 'DATA', subtitle: 'Realtime Feeds', angle: 0, color: '#FF8000' },
        { name: 'AI', subtitle: 'Intelligence Core', angle: (2 * Math.PI) / 3, color: '#FF5E00' },
        { name: 'USER', subtitle: 'Actionable Insights', angle: (4 * Math.PI) / 3, color: '#FF3300' },
      ];

      const projectedNodes = rawNodes.map((node) => {
        const curAngle = node.angle + angleY;
        const x3d = Math.cos(curAngle) * baseRadius;
        const y3d = Math.sin(curAngle * 0.5 + angleX) * (baseRadius * 0.4);
        const z3d = Math.sin(curAngle) * baseRadius;

        // 3D perspective projection
        const scale = 400 / (400 + z3d);
        const px = centerX + x3d * scale;
        const py = centerY + y3d * scale;

        return {
          ...node,
          px,
          py,
          z3d,
          scale,
        };
      });

      // Sort nodes by depth for proper z-index rendering
      projectedNodes.sort((a, b) => a.z3d - b.z3d);

      // Draw connecting energy triangle lines
      ctx.beginPath();
      for (let i = 0; i < projectedNodes.length; i++) {
        const nextIdx = (i + 1) % projectedNodes.length;
        ctx.moveTo(projectedNodes[i].px, projectedNodes[i].py);
        ctx.lineTo(projectedNodes[nextIdx].px, projectedNodes[nextIdx].py);
      }
      ctx.strokeStyle = 'rgba(255, 128, 0, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw pulsed energy particles along connecting lines
      const time = Date.now() * 0.002;
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        const p2 = projectedNodes[(i + 1) % projectedNodes.length];
        const t = (time + i * 0.33) % 1;
        const lx = p1.px + (p2.px - p1.px) * t;
        const ly = p1.py + (p2.py - p1.py) * t;

        ctx.beginPath();
        ctx.arc(lx, ly, 4 * Math.max(p1.scale, p2.scale), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FF8000';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw background ambient particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;

        if (Math.abs(p.x) > width / 2) p.speedX *= -1;
        if (Math.abs(p.y) > height / 2) p.speedY *= -1;
        if (Math.abs(p.z) > 200) p.speedZ *= -1;

        const pScale = 400 / (400 + p.z);
        const pScreenX = centerX + p.x * pScale;
        const pScreenY = centerY + p.y * pScale;

        ctx.beginPath();
        ctx.arc(pScreenX, pScreenY, p.radius * pScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 0, ${p.alpha * 0.6})`;
        ctx.fill();
      });

      // Draw Central Tri-Node Mark Orb
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        2,
        centerX,
        centerY,
        22
      );
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.5, '#FF8000');
      coreGrad.addColorStop(1, '#FF3300');
      ctx.fillStyle = coreGrad;
      ctx.shadowColor = '#FF5E00';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Nodes
      projectedNodes.forEach((node) => {
        const radius = 24 * node.scale;

        // Node Glow Ring
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 94, 0, 0.15)';
        ctx.fill();

        // Node Inner Circle
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
        const nodeGrad = ctx.createRadialGradient(
          node.px - radius * 0.3,
          node.py - radius * 0.3,
          2,
          node.px,
          node.py,
          radius
        );
        nodeGrad.addColorStop(0, '#FFFFFF');
        nodeGrad.addColorStop(0.6, node.color);
        nodeGrad.addColorStop(1, '#0B0C12');

        ctx.fillStyle = nodeGrad;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 20 * node.scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label Tag
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 ${Math.max(12, 14 * node.scale)}px 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.px, node.py + radius + 18);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = `400 ${Math.max(9, 10 * node.scale)}px 'JetBrains Mono', monospace`;
        ctx.fillText(node.subtitle, node.px, node.py + radius + 32);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      {/* Overlay badge info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 px-4 py-2 rounded-full glass-card border-orange-500/20 text-xs font-mono text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>TRI-NODE CORE ACTIVE</span>
        </span>
        <span className="text-white/30">•</span>
        <span className="text-orange-400 font-semibold">DATA × AI × USER</span>
      </div>
    </div>
  );
};
