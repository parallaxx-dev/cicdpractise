import { Link } from 'react-router-dom';
import { SectionHead, GradientEm } from '@/components/portfolio/SectionHead';

interface GameCard {
  to: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  glow: string;
  icon: React.ReactNode;
}

const games: GameCard[] = [
  {
    to: '/games/dino',
    number: '01',
    title: 'Chrome Dinosaur',
    description:
      'The classic endless runner. Press Space to jump, dodge the cacti, beat your high score.',
    tags: ['Canvas', 'Endless runner', 'Space to jump'],
    glow: 'rgba(34, 211, 238, 0.3)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    to: '/games/tic-tac-toe',
    number: '02',
    title: 'Tic Tac Toe',
    description:
      'Battle an unbeatable minimax AI. Or try to — it has never lost a match.',
    tags: ['Minimax AI', '3×3 grid', 'Player vs CPU'],
    glow: 'rgba(139, 92, 246, 0.3)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
        <line x1="8" y1="2" x2="8" y2="22" />
        <line x1="16" y1="2" x2="16" y2="22" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <line x1="2" y1="16" x2="22" y2="16" />
      </svg>
    ),
  },
  {
    to: '/games/space-invaders',
    number: '03',
    title: 'Space Invaders',
    description:
      'Hold off waves of alien invaders. Move with arrow keys, fire with Space.',
    tags: ['Canvas', 'Shoot \'em up', 'Arrow + Space'],
    glow: 'rgba(236, 72, 153, 0.3)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5">
        <path d="M12 2l3 7H9l3-7z" />
        <rect x="4" y="9" width="16" height="6" rx="2" />
        <path d="M4 15l-2 4M20 15l2 4M8 15v4M16 15v4" />
      </svg>
    ),
  },
  {
    to: '/games/hangman',
    number: '04',
    title: 'Hangman',
    description:
      'Guess the hidden word one letter at a time before the figure is complete.',
    tags: ['Word game', '50 word bank', '6 lives'],
    glow: 'rgba(251, 191, 36, 0.3)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5">
        <line x1="4" y1="22" x2="20" y2="22" />
        <line x1="8" y1="22" x2="8" y2="2" />
        <line x1="8" y1="2" x2="16" y2="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <circle cx="16" cy="9" r="3" />
        <line x1="16" y1="12" x2="16" y2="18" />
        <line x1="16" y1="14" x2="12" y2="17" />
        <line x1="16" y1="14" x2="20" y2="17" />
        <line x1="16" y1="18" x2="13" y2="22" />
        <line x1="16" y1="18" x2="19" y2="22" />
      </svg>
    ),
  },
];

export function GamesHub() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 32px',
      }}
    >
      <section style={{ padding: '140px 0 120px' }}>
        {/* Back to portfolio */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            color: '#8b8a96',
            textDecoration: 'none',
            marginBottom: 48,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#f4f3ee')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#8b8a96')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          back to portfolio
        </Link>

        <SectionHead
          number="/ games"
          title={<>Playable <GradientEm>arcade</GradientEm></>}
          blurb="Four hand-coded browser games built in React. No dependencies, just pixels and logic."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
          className="games-grid"
        >
          {games.map(game => (
            <GameCard key={game.to} {...game} />
          ))}
        </div>
      </section>
    </div>
  );
}

function GameCard({ to, number, title, description, tags, glow, icon }: GameCard) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: '32px 32px 28px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = 'rgba(255,255,255,0.2)';
        el.style.boxShadow = `0 0 48px ${glow}`;
        el.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
      }}
    >
      {/* Decorative glow in corner */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            padding: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: '#8b8a96',
            letterSpacing: '0.12em',
          }}
        >
          / {number}
        </span>
      </div>

      <div>
        <h3
          style={{
            margin: '0 0 10px',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#f4f3ee',
          }}
        >
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: '#8b8a96', lineHeight: 1.6 }}>{description}</p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
        {tags.map(tag => (
          <span
            key={tag}
            style={{
              padding: '4px 12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 500,
              color: '#8b8a96',
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Play CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          color: '#f4f3ee',
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        Play now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
