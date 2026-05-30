const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34v-7.18H6V18.34h2.34Zm-1.17-8.17a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72ZM18 18.34v-3.94c0-2.1-1.13-3.08-2.64-3.08a2.28 2.28 0 0 0-2.07 1.14v-.98h-2.34V18.34h2.34v-4.02c0-.96.65-1.59 1.5-1.59.82 0 1.21.57 1.21 1.59v4.02H18Z" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2H21l-6.52 7.45L22 22h-6.51l-5.1-6.66L4.5 22H1.75l6.97-7.97L1.5 2h6.66l4.61 6.1L18.244 2Zm-1.14 18.4h1.5L7.02 3.5H5.45l11.654 16.9Z" />
  </svg>
);

const BarsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="4" height="10" rx="1" />
    <rect x="10" y="6" width="4" height="15" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 12h12M12 6v12M8 8l8 8M16 8l-8 8" />
  </svg>
);

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '14px 22px',
  borderRadius: 100,
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  transition: 'transform 0.2s, background 0.2s, border-color 0.2s',
};

const socials = [
  { href: 'https://github.com/parallaxx-dev', label: 'GitHub', handle: '@parallaxx-dev', icon: <GitHubIcon /> },
  { href: 'https://www.linkedin.com/in/aaditya-pyarla/', label: 'LinkedIn', handle: 'aaditya-pyarla', icon: <LinkedInIcon /> },
  { href: 'https://x.com/aadityap_003', label: 'X / Twitter', handle: '@aadityap_003', icon: <XIcon /> },
  { href: 'https://codeforces.com/profile/pyarlax', label: 'Codeforces', handle: 'pyarlax', icon: <BarsIcon /> },
  { href: 'https://codechef.com/users/pyarllax', label: 'CodeChef', handle: 'pyarllax', icon: <CrossIcon /> },
];

export function ContactSection() {
  return (
    <>
      <section id="contact" style={{ padding: '120px 0 0', position: 'relative' }}>
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(139,92,246,0.08), rgba(34,211,238,0.04))',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 32,
            padding: '72px 56px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Radial violet glow at top */}
          <div
            style={{
              position: 'absolute',
              top: -100,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 500,
              height: 200,
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.4), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              margin: '0 0 16px',
              lineHeight: 1,
              color: '#f4f3ee',
              position: 'relative',
            }}
          >
            Let&apos;s build{' '}
            <em
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontWeight: 400,
                background: 'linear-gradient(135deg, #c4b5fd, #f9a8d4)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              something
            </em>
            .
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 18,
              color: '#8b8a96',
              maxWidth: 500,
              margin: '0 auto 36px',
              lineHeight: 1.6,
              position: 'relative',
            }}
          >
            Open to collabs, internships, dumb ideas, and long talks about distributed systems.
            Reach out — I usually reply fast.
          </p>

          {/* CTA row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
              position: 'relative',
              marginBottom: 24,
            }}
          >
            <a
              href="mailto:aaditya.pyarla@gmail.com"
              style={{ ...btnBase, background: '#f4f3ee', color: '#07070b' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.transform = 'none')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              aaditya.pyarla@gmail.com
            </a>
            <a
              href="https://github.com/parallaxx-dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...btnBase,
                background: 'rgba(255,255,255,0.04)',
                color: '#f4f3ee',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.08)';
                el.style.borderColor = 'rgba(255,255,255,0.28)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.borderColor = 'rgba(255,255,255,0.14)';
              }}
            >
              <GitHubIcon />
              @parallaxx-dev
            </a>
          </div>

          {/* Socials grid — 5 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 12,
              marginTop: 24,
            }}
            className="socials-grid"
          >
            {socials.map(({ href, label, handle, icon }) => (
              <SocialCard key={href} href={href} label={label} handle={handle} icon={icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '60px 0 40px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: 80,
          color: '#8b8a96',
          fontSize: 13,
          fontFamily: '"JetBrains Mono", monospace',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span>
          © 2026 Aaditya Pyarla · made with{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ♥
          </span>{' '}
          in Mumbai
        </span>
        <span>
          parallaxx-dev/<span style={{ color: '#f4f3ee' }}>portfolio</span> · v1.0
        </span>
      </footer>
    </>
  );
}

function SocialCard({ href, label, handle, icon }: { href: string; label: string; handle: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 20,
        textDecoration: 'none',
        color: '#f4f3ee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 14,
        transition: 'transform 0.2s, border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = 'translateY(-4px)';
        el.style.borderColor = 'rgba(255,255,255,0.18)';
        el.style.background = 'rgba(255,255,255,0.05)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = 'none';
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.background = 'rgba(255,255,255,0.025)';
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.06)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: '#8b8a96',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{handle}</div>
      </div>
    </a>
  );
}
