import { useEffect, useRef, useState, useCallback } from 'react';
import { GameLayout } from '@/components/GameLayout';

const W = 800;
const H = 200;
const GROUND = 160;
const DINO_W = 44;
const DINO_H = 52;
const DINO_X = 80;
const GRAVITY = 0.6;
const JUMP_VEL = -13;

interface Obstacle {
  x: number;
  w: number;
  h: number;
}

interface GameState {
  dinoY: number;
  velY: number;
  onGround: boolean;
  obstacles: Obstacle[];
  score: number;
  highScore: number;
  speed: number;
  frame: number;
  running: boolean;
  dead: boolean;
  started: boolean;
}

function makeState(highScore = 0): GameState {
  return {
    dinoY: GROUND - DINO_H,
    velY: 0,
    onGround: true,
    obstacles: [],
    score: 0,
    highScore,
    speed: 5,
    frame: 0,
    running: false,
    dead: false,
    started: false,
  };
}

export function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(makeState());
  const rafRef = useRef<number>(0);
  const [display, setDisplay] = useState({ score: 0, highScore: 0, dead: false, started: false });

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s.started) {
      s.started = true;
      s.running = true;
    }
    if (s.dead) {
      stateRef.current = makeState(s.highScore);
      stateRef.current.started = true;
      stateRef.current.running = true;
      return;
    }
    if (s.onGround) {
      s.velY = JUMP_VEL;
      s.onGround = false;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function spawnObstacle(obstacles: Obstacle[]): Obstacle[] {
      if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < W - 300 - Math.random() * 250) {
        const h = 30 + Math.floor(Math.random() * 28);
        obstacles.push({ x: W + 20, w: 18 + Math.floor(Math.random() * 14), h });
      }
      return obstacles;
    }

    function tick() {
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#07070b';
      ctx.fillRect(0, 0, W, H);

      // Ground line
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND);
      ctx.lineTo(W, GROUND);
      ctx.stroke();

      if (s.running && !s.dead) {
        s.frame++;
        s.score++;
        if (s.score % 500 === 0) s.speed = Math.min(s.speed + 0.5, 14);

        // Physics
        s.velY += GRAVITY;
        s.dinoY += s.velY;
        if (s.dinoY >= GROUND - DINO_H) {
          s.dinoY = GROUND - DINO_H;
          s.velY = 0;
          s.onGround = true;
        }

        // Obstacles
        s.obstacles = spawnObstacle(s.obstacles);
        s.obstacles = s.obstacles
          .map(o => ({ ...o, x: o.x - s.speed }))
          .filter(o => o.x + o.w > 0);

        // Collision
        for (const o of s.obstacles) {
          const margin = 6;
          if (
            DINO_X + DINO_W - margin > o.x + margin &&
            DINO_X + margin < o.x + o.w - margin &&
            s.dinoY + DINO_H - margin > GROUND - o.h
          ) {
            s.dead = true;
            if (s.score > s.highScore) s.highScore = s.score;
          }
        }
      }

      // Draw obstacles (cacti — cyan)
      ctx.fillStyle = '#22d3ee';
      for (const o of s.obstacles) {
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
        // cactus arms
        const armH = Math.floor(o.h * 0.35);
        ctx.fillRect(o.x - 8, GROUND - o.h + armH, 8, 10);
        ctx.fillRect(o.x + o.w, GROUND - o.h + armH + 5, 8, 10);
      }

      // Draw dino (violet)
      const legOffset = s.onGround && s.running ? (Math.floor(s.frame / 6) % 2) * 8 : 0;
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.roundRect(DINO_X, s.dinoY, DINO_W, DINO_H - 10, 6);
      ctx.fill();
      // legs
      ctx.fillRect(DINO_X + 6, s.dinoY + DINO_H - 10 - legOffset, 12, 10 + legOffset);
      ctx.fillRect(DINO_X + 22, s.dinoY + DINO_H - 10 + legOffset, 12, 10 - legOffset);
      // eye
      ctx.fillStyle = '#07070b';
      ctx.beginPath();
      ctx.arc(DINO_X + DINO_W - 10, s.dinoY + 12, 4, 0, Math.PI * 2);
      ctx.fill();

      // Score
      ctx.fillStyle = '#8b8a96';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`HI ${String(s.highScore).padStart(5, '0')}  ${String(Math.floor(s.score / 10)).padStart(5, '0')}`, W - 16, 28);

      // Start / Dead overlay
      if (!s.started || s.dead) {
        ctx.fillStyle = 'rgba(7,7,11,0.7)';
        ctx.fillRect(0, 0, W, H);

        ctx.textAlign = 'center';
        if (s.dead) {
          ctx.fillStyle = '#ec4899';
          ctx.font = '700 22px "JetBrains Mono", monospace';
          ctx.fillText('GAME OVER', W / 2, H / 2 - 16);
          ctx.fillStyle = '#8b8a96';
          ctx.font = '500 13px "JetBrains Mono", monospace';
          ctx.fillText('Press Space or tap to restart', W / 2, H / 2 + 16);
        } else {
          ctx.fillStyle = '#f4f3ee';
          ctx.font = '700 22px "JetBrains Mono", monospace';
          ctx.fillText('CHROME DINOSAUR', W / 2, H / 2 - 16);
          ctx.fillStyle = '#8b8a96';
          ctx.font = '500 13px "JetBrains Mono", monospace';
          ctx.fillText('Press Space or tap to start', W / 2, H / 2 + 16);
        }
      }

      setDisplay({ score: Math.floor(s.score / 10), highScore: s.highScore, dead: s.dead, started: s.started });
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <GameLayout number="01" title="Chrome Dinosaur" subtitle="Dodge the cacti. Press Space or tap to jump." accentColor="#22d3ee">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={jump}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: W,
            borderRadius: 12,
            cursor: 'pointer',
            border: '1px solid rgba(34,211,238,0.15)',
          }}
        />
        <p style={{ color: '#8b8a96', fontSize: 13, fontFamily: '"JetBrains Mono", monospace', margin: 0 }}>
          Score: {display.score} &nbsp;·&nbsp; Best: {display.highScore}
        </p>
      </div>
    </GameLayout>
  );
}
