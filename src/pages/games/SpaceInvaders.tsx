import { useEffect, useRef, useCallback } from 'react';
import { GameLayout } from '@/components/GameLayout';

const W = 800;
const H = 480;
const SHIP_W = 36;
const SHIP_H = 24;
const ALIEN_COLS = 10;
const ALIEN_ROWS = 4;
const ALIEN_W = 32;
const ALIEN_H = 24;
const ALIEN_PAD_X = 14;
const ALIEN_PAD_Y = 16;

interface Bullet {
  x: number;
  y: number;
  vel: number;
}

interface Alien {
  x: number;
  y: number;
  alive: boolean;
  row: number;
}

interface GameSI {
  shipX: number;
  bullets: Bullet[];
  aliens: Alien[];
  alienDir: number;
  alienStep: number;
  alienTimer: number;
  lives: number;
  score: number;
  highScore: number;
  running: boolean;
  started: boolean;
  dead: boolean;
  won: boolean;
  wave: number;
  cooldown: number;
}

const ALIEN_COLORS = ['#ec4899', '#8b5cf6', '#22d3ee', '#fbbf24'];

function makeAliens(): Alien[] {
  const aliens: Alien[] = [];
  for (let r = 0; r < ALIEN_ROWS; r++) {
    for (let c = 0; c < ALIEN_COLS; c++) {
      aliens.push({
        x: 60 + c * (ALIEN_W + ALIEN_PAD_X),
        y: 60 + r * (ALIEN_H + ALIEN_PAD_Y),
        alive: true,
        row: r,
      });
    }
  }
  return aliens;
}

function makeSI(highScore = 0): GameSI {
  return {
    shipX: W / 2 - SHIP_W / 2,
    bullets: [],
    aliens: makeAliens(),
    alienDir: 1,
    alienStep: 0,
    alienTimer: 0,
    lives: 3,
    score: 0,
    highScore,
    running: false,
    started: false,
    dead: false,
    won: false,
    wave: 1,
    cooldown: 0,
  };
}

export function SpaceInvaders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameSI>(makeSI());
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);

  const fire = useCallback(() => {
    const s = stateRef.current;
    if (!s.started) { s.started = true; s.running = true; return; }
    if (s.dead || s.won) {
      stateRef.current = makeSI(s.highScore);
      stateRef.current.started = true;
      stateRef.current.running = true;
      return;
    }
    if (s.cooldown <= 0) {
      s.bullets.push({ x: s.shipX + SHIP_W / 2, y: H - SHIP_H - 16, vel: -10 });
      s.cooldown = 18;
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      keysRef.current.add(e.code);
      if (e.code === 'Space') { e.preventDefault(); fire(); }
    };
    const offKey = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', offKey);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', offKey); };
  }, [fire]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    function drawAlien(x: number, y: number, color: string, frame: number) {
      ctx.fillStyle = color;
      ctx.fillRect(x + 4, y, ALIEN_W - 8, ALIEN_H - 6);
      // antennae
      ctx.fillRect(x + 6, y - 5, 4, 5);
      ctx.fillRect(x + ALIEN_W - 10, y - 5, 4, 5);
      // legs
      const leg = frame % 2 === 0 ? 0 : 4;
      ctx.fillRect(x + 2, y + ALIEN_H - 6, 6, 4 + leg);
      ctx.fillRect(x + ALIEN_W - 8, y + ALIEN_H - 6, 6, 4 + leg);
      // eyes
      ctx.fillStyle = '#07070b';
      ctx.fillRect(x + 8, y + 6, 5, 5);
      ctx.fillRect(x + ALIEN_W - 13, y + 6, 5, 5);
    }

    function tick() {
      const s = stateRef.current;
      const keys = keysRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#07070b';
      ctx.fillRect(0, 0, W, H);

      const frame = Math.floor(Date.now() / 300);

      if (s.running && !s.dead && !s.won) {
        // Ship movement
        const speed = 5;
        if ((keys.has('ArrowLeft') || keys.has('KeyA')) && s.shipX > 0) s.shipX -= speed;
        if ((keys.has('ArrowRight') || keys.has('KeyD')) && s.shipX + SHIP_W < W) s.shipX += speed;

        // Cooldown
        if (s.cooldown > 0) s.cooldown--;

        // Bullets
        s.bullets = s.bullets
          .map(b => ({ ...b, y: b.y + b.vel }))
          .filter(b => b.y > 0 && b.y < H);

        // Aliens movement
        s.alienTimer++;
        const liveAliens = s.aliens.filter(a => a.alive);
        const alienSpeed = Math.max(4, 28 - liveAliens.length);
        if (s.alienTimer >= alienSpeed) {
          s.alienTimer = 0;
          s.alienStep++;
          // Check edge
          const hitEdge = liveAliens.some(
            a => a.x + s.alienDir * 18 < 10 || a.x + ALIEN_W + s.alienDir * 18 > W - 10,
          );
          if (hitEdge) {
            s.alienDir *= -1;
            s.aliens.forEach(a => { a.y += 20; });
          } else {
            s.aliens.forEach(a => { a.x += s.alienDir * 18; });
          }
        }

        // Bullet-alien collision
        for (const bullet of s.bullets) {
          for (const alien of s.aliens) {
            if (!alien.alive) continue;
            if (
              bullet.x > alien.x && bullet.x < alien.x + ALIEN_W &&
              bullet.y > alien.y && bullet.y < alien.y + ALIEN_H
            ) {
              alien.alive = false;
              bullet.y = -999;
              s.score += (ALIEN_ROWS - alien.row) * 10;
              if (s.score > s.highScore) s.highScore = s.score;
            }
          }
        }

        // Aliens reach bottom
        if (liveAliens.some(a => a.y + ALIEN_H >= H - SHIP_H - 20)) {
          s.dead = true;
        }

        // Win
        if (liveAliens.length === 0) {
          s.wave++;
          s.aliens = makeAliens().map(a => ({ ...a, y: a.y - 20 }));
          s.alienTimer = 0;
        }
      }

      // Draw aliens
      for (const alien of s.aliens) {
        if (!alien.alive) continue;
        drawAlien(alien.x, alien.y, ALIEN_COLORS[alien.row % ALIEN_COLORS.length], frame);
      }

      // Draw bullets
      ctx.fillStyle = '#a3e635';
      for (const b of s.bullets) {
        ctx.fillRect(b.x - 2, b.y, 4, 14);
      }

      // Draw ship
      const sx = s.shipX;
      const sy = H - SHIP_H - 10;
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.moveTo(sx + SHIP_W / 2, sy);
      ctx.lineTo(sx, sy + SHIP_H);
      ctx.lineTo(sx + SHIP_W, sy + SHIP_H);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(sx + SHIP_W / 2 - 3, sy - 6, 6, 6);

      // HUD
      ctx.fillStyle = '#8b8a96';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`WAVE ${s.wave}   SCORE ${s.score}`, 16, 22);
      ctx.textAlign = 'right';
      ctx.fillText(`BEST ${s.highScore}   ${'♥ '.repeat(s.lives).trim()}`, W - 16, 22);

      // Overlays
      if (!s.started || s.dead) {
        ctx.fillStyle = 'rgba(7,7,11,0.75)';
        ctx.fillRect(0, 0, W, H);
        ctx.textAlign = 'center';
        if (s.dead) {
          ctx.fillStyle = '#ec4899';
          ctx.font = '700 22px "JetBrains Mono", monospace';
          ctx.fillText('GAME OVER', W / 2, H / 2 - 18);
        } else {
          ctx.fillStyle = '#f4f3ee';
          ctx.font = '700 22px "JetBrains Mono", monospace';
          ctx.fillText('SPACE INVADERS', W / 2, H / 2 - 18);
        }
        ctx.fillStyle = '#8b8a96';
        ctx.font = '500 13px "JetBrains Mono", monospace';
        ctx.fillText('Press Space to ' + (s.dead ? 'restart' : 'start') + '   ←→ to move', W / 2, H / 2 + 14);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <GameLayout number="03" title="Space Invaders" subtitle="← → to move · Space to fire" accentColor="#ec4899">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={fire}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: W,
            borderRadius: 12,
            cursor: 'crosshair',
            border: '1px solid rgba(236,72,153,0.15)',
          }}
        />
        <p style={{ color: '#8b8a96', fontSize: 13, fontFamily: '"JetBrains Mono", monospace', margin: 0 }}>
          Arrow keys or A/D to move · Space to fire · Click canvas to start
        </p>
      </div>
    </GameLayout>
  );
}
