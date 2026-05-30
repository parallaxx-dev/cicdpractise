import { Link, type To } from 'react-router-dom';

function BackLink({ to, label }: { to: To; label: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        color: '#8b8a96',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#f4f3ee')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#8b8a96')}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M11 5l-7 7 7 7" />
      </svg>
      {label}
    </Link>
  );
}

interface GameLayoutProps {
  number: string;
  title: string;
  subtitle: string;
  accentColor: string;
  children: React.ReactNode;
}

export function GameLayout({ number, title, subtitle, accentColor, children }: GameLayoutProps) {
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
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        {/* Navigation breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 48 }}>
          <BackLink to="/" label="portfolio" />
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 13, fontFamily: '"JetBrains Mono", monospace' }}>/</span>
          <BackLink to="/games" label="games" />
        </div>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              display: 'block',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: '#8b8a96',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            / {number}
          </span>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              margin: '0 0 12px',
              color: '#f4f3ee',
              lineHeight: 1,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 17, color: '#8b8a96', margin: 0 }}>{subtitle}</p>
        </div>

        {/* Game canvas / content */}
        <div
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${accentColor}30`,
            borderRadius: 24,
            padding: 32,
            boxShadow: `0 0 60px ${accentColor}18`,
          }}
        >
          {children}
        </div>
      </section>
    </div>
  );
}
