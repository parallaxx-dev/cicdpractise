import { SectionHead, GradientEm } from './SectionHead';

interface Tech {
  glyph: string;
  name: string;
  level: number;
}

const stack: Tech[] = [
  { glyph: '.cpp', name: 'C++', level: 4 },
  { glyph: '.java', name: 'Java', level: 4 },
  { glyph: '.js / .ts', name: 'JavaScript & TS', level: 4 },
  { glyph: '.py', name: 'Python', level: 3 },
  { glyph: 'runtime', name: 'Node + Express', level: 4 },
  { glyph: 'ui', name: 'React', level: 3 },
  { glyph: 'db', name: 'MySQL', level: 3 },
  { glyph: 'vcs', name: 'Git', level: 5 },
  { glyph: 'editor', name: 'Neovim', level: 4 },
  { glyph: 'os', name: 'Linux · Kali', level: 3 },
  { glyph: 'rtc', name: 'WebRTC · Mediasoup', level: 3 },
  { glyph: 'ops', name: 'CI/CD · Docker', level: 3 },
];

export function StackSection() {
  return (
    <section id="stack" className="portfolio-section">
      <SectionHead
        number="/ 02"
        title={<>The <GradientEm>toolbelt</GradientEm></>}
        blurb="Languages, frameworks, and tools I reach for — ranked by how often they're in my terminal."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}
      >
        {stack.map(tech => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </div>
    </section>
  );
}

function TechCard({ glyph, name, level }: Tech) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '20px 20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.18)';
        el.style.background = 'rgba(255,255,255,0.04)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.background = 'rgba(255,255,255,0.025)';
      }}
    >
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: '#8b8a96',
          letterSpacing: '0.04em',
        }}
      >
        {glyph}
      </span>
      <span style={{ fontSize: 15, fontWeight: 600, color: '#f4f3ee' }}>{name}</span>
      <LevelDots level={level} />
    </div>
  );
}

function LevelDots({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background:
              i < level
                ? 'linear-gradient(135deg, #8b5cf6, #22d3ee)'
                : 'rgba(255,255,255,0.1)',
            transition: 'background 0.2s',
          }}
        />
      ))}
    </div>
  );
}
