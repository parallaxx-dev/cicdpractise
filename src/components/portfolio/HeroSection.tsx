import heroImg from '@/assets/hero.jpg';

const pills = [
  { emoji: '🚀', label: 'Systems' },
  { emoji: '🐞', label: 'Real-Time Comm' },
  { emoji: '🐧', label: 'CI/CD' },
  { emoji: '🖥️', label: 'Scalable Web' },
  { emoji: '🔐', label: 'Cybersec' },
];

export function HeroSection() {
  return (
    <header
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 0 80px',
        position: 'relative',
      }}
    >
      <div className="hero-grid">
        {/* Left: text */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: '#8b8a96',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            <span style={{ color: '#22d3ee', fontSize: 14 }}>⚓</span>
            <span>Trying to hit my PR</span>
            <span style={{ color: '#444' }}>·</span>
            <span>Mumbai · IST</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(56px, 9vw, 132px)',
              lineHeight: 0.92,
              letterSpacing: '-0.045em',
              fontWeight: 800,
              margin: '0 0 24px',
              color: '#f4f3ee',
            }}
          >
            Aaditya
            <br />
            <span
              className="gradient-text"
              style={{
                fontStyle: 'italic',
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Pyarla.
            </span>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: '#f4f3ee',
              opacity: 0.85,
              maxWidth: 560,
              margin: '0 0 32px',
              lineHeight: 1.5,
            }}
          >
            Student &amp; developer building{' '}
            <em
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 22,
                color: '#f9a8d4',
              }}
            >
              scalable
            </em>{' '}
            web systems — real-time comms, CI/CD pipelines, and elegant architecture.
            Currently learning React, Node &amp; MySQL while shipping a personal project.
          </p>

          {/* Skill pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {pills.map(({ emoji, label }) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#f4f3ee',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                <span style={{ fontSize: 13 }}>{emoji}</span>
                {label}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a
              href="#work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 22px',
                borderRadius: 100,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                background: '#f4f3ee',
                color: '#07070b',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.transform = 'none')}
            >
              See the work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="mailto:aaditya.pyarla@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 22px',
                borderRadius: 100,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                background: 'rgba(255,255,255,0.04)',
                color: '#f4f3ee',
                border: '1px solid rgba(255,255,255,0.14)',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.08)';
                el.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.borderColor = 'rgba(255,255,255,0.14)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Send a mail
            </a>
          </div>
        </div>

        {/* Right: avatar */}
        <div className="avatar-wrap">
          {/* Spinning conic gradient ring */}
          <div
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #8b5cf6, #22d3ee, #ec4899, #fbbf24, #8b5cf6)',
              animation: 'ring-spin 18s linear infinite',
              filter: 'blur(1px)',
            }}
          />
          {/* Dark inner circle */}
          <div
            style={{
              position: 'absolute',
              inset: 6,
              borderRadius: '50%',
              background: '#07070b',
              padding: 4,
              overflow: 'hidden',
            }}
          >
            <img
              src={heroImg}
              alt="Aaditya Pyarla"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Tag: top-left */}
          <AvatarTag position="tl" label="role" value="Crazy Coder" />
          {/* Tag: bottom-right */}
          <AvatarTag position="br" label="currently" value="React · Node · MySQL" />
        </div>
      </div>
    </header>
  );
}

function AvatarTag({ position, label, value }: { position: 'tl' | 'br'; label: string; value: string }) {
  const style =
    position === 'tl'
      ? { top: 12, left: -28 }
      : { bottom: 16, right: -20 };

  return (
    <div
      style={{
        position: 'absolute',
        ...style,
        background: 'rgba(15, 14, 22, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 12,
        padding: '10px 14px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <span style={{ color: '#8b8a96', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ color: '#f4f3ee' }}>{value}</span>
    </div>
  );
}
