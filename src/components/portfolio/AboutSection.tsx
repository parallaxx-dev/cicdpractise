import { SectionHead, GradientEm } from './SectionHead';

const stats = [
  { n: '16', label: 'Public repos' },
  { n: '31', label: 'Stars given' },
  { n: '4', label: 'Spoken languages' },
  { n: '∞', label: 'PRs to hit' },
];

const langChips = ['EN', 'తె', 'हि', 'मर'];

export function AboutSection() {
  return (
    <section id="about" style={{ padding: '120px 0', position: 'relative' }}>
      <SectionHead
        number="/ 01"
        title={<>About <GradientEm>me</GradientEm></>}
        blurb="A snapshot of who I am, where I'm at, and what I'm chasing."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 48,
          alignItems: 'start',
          marginBottom: 64,
        }}
        className="about-grid"
      >
        {/* Bio text */}
        <div style={{ fontSize: 19, lineHeight: 1.6, color: '#f4f3ee', opacity: 0.88 }}>
          <p style={{ margin: '0 0 22px' }}>
            Hey, I'm Aaditya — a{' '}
            <StrongGradient>student and developer</StrongGradient> from Mumbai who goes by{' '}
            <em style={{ fontFamily: '"Instrument Serif", serif', color: '#f9a8d4' }}>Crazy Coder</em>{' '}
            online. I'm fascinated by what makes systems work under load — the wiring behind real-time
            communication, the discipline of clean CI/CD, and the quiet beauty of a well-architected stack.
          </p>
          <p style={{ margin: '0 0 22px' }}>
            On any given day you'll find me deep in a <StrongGradient>WebRTC stream</StrongGradient>, tightening a Node.js
            REST API, or sharpening my Neovim setup. Outside of code, I'm a cybersecurity nerd
            learning networking and OS internals from the ground up — and writing the occasional
            blog post on{' '}
            <a
              href="https://sundaystack.odoo.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#67e8f9', textDecoration: 'none', borderBottom: '1px solid rgba(103,232,249,0.3)' }}
            >
              Sunday Stack
            </a>
            .
          </p>
          <p style={{ margin: 0 }}>
            I'm always down to talk shop — open source, weird bugs, or anything under the sun.
          </p>
        </div>

        {/* Info card */}
        <aside
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: 28,
            backdropFilter: 'blur(10px)',
          }}
        >
          <InfoRow label="name" value="Aaditya Pyarla" />
          <InfoRow label="based" value="Mumbai, India" />
          <InfoRow label="role" value="Student · Dev" />
          <InfoRow label="pronouns" value="he / him" />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#8b8a96', letterSpacing: '0.08em' }}>languages</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {langChips.map(l => (
                <span
                  key={l}
                  style={{
                    padding: '2px 8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 6,
                    fontSize: 12,
                    color: '#f4f3ee',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <InfoRow label="status" value="● open to collab" valueStyle={{ color: '#a3e635' }} noBorder />
        </aside>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="stats-grid">
        {stats.map(({ n, label }) => (
          <div
            key={label}
            style={{
              padding: '28px 24px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 50%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {n}
            </div>
            <div style={{ fontSize: 13, color: '#8b8a96', fontFamily: '"JetBrains Mono", monospace' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StrongGradient({ children }: { children: React.ReactNode }) {
  return (
    <strong
      style={{
        background: 'linear-gradient(120deg, #c4b5fd 0%, #67e8f9 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 600,
      }}
    >
      {children}
    </strong>
  );
}

function InfoRow({
  label,
  value,
  valueStyle,
  noBorder,
}: {
  label: string;
  value: string;
  valueStyle?: React.CSSProperties;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: noBorder ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#8b8a96', letterSpacing: '0.08em' }}>
        {label}
      </span>
      <span style={{ fontSize: 14, color: '#f4f3ee', ...valueStyle }}>{value}</span>
    </div>
  );
}
