import { SectionHead, GradientEm } from './SectionHead';

interface Project {
  title: string;
  href: string;
  summary: string;
  lang: string;
  langColor: string;
  meta: string[];
  glow: string;
  variant: 'feature' | 'wide' | 'regular';
}

const projects: Project[] = [
  {
    title: 'examinationportal-gradify',
    href: 'https://github.com/parallaxx-dev/examinationportal-gradify',
    summary:
      'A full-stack exam & grading portal — typed end-to-end with TypeScript. Handles student flow, question banks, automated scoring and result dashboards.',
    lang: 'TypeScript',
    langColor: '#3178c6',
    meta: ['⭐ 1 star', '● Public', 'Pinned'],
    glow: 'rgba(139, 92, 246, 0.35)',
    variant: 'feature',
  },
  {
    title: 'mediasoup-v1',
    href: 'https://github.com/parallaxx-dev/mediasoup-v1',
    summary:
      'An SFU-based real-time media server built on Mediasoup. Multi-peer audio/video routing with low-latency WebRTC transport — the backbone of any live comms product.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    meta: ['📡 WebRTC', '● Public', 'Pinned'],
    glow: 'rgba(34, 211, 238, 0.3)',
    variant: 'feature',
  },
  {
    title: 'webrtc-coursera',
    href: 'https://github.com/parallaxx-dev/webrtc-coursera',
    summary:
      'Working through Coursera\'s WebRTC track — peer connections, signaling, ICE/STUN/TURN, and the gritty bits that make real-time browser comms actually reliable.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    meta: ['🎓 Learning', '● Public', 'Pinned'],
    glow: 'rgba(236, 72, 153, 0.25)',
    variant: 'wide',
  },
  {
    title: 'femnodejs-restapi',
    href: 'https://github.com/parallaxx-dev/femnodejs-restapi',
    summary:
      'A Frontend Masters–style Node.js REST API — routing, middleware, auth, and the patterns that scale past the toy example.',
    lang: 'JavaScript',
    langColor: '#f1e05a',
    meta: ['🛠 Express', '● Public'],
    glow: 'rgba(251, 191, 36, 0.25)',
    variant: 'regular',
  },
  {
    title: 'dotfiles',
    href: 'https://github.com/parallaxx-dev/dotfiles',
    summary:
      'My carefully-tuned dev environment — Neovim config, shell aliases, tmux, and every keybind that earns its place in muscle memory.',
    lang: 'Shell',
    langColor: '#89e051',
    meta: ['⚙️ Shell', '● Public', 'Pinned'],
    glow: 'rgba(163, 230, 53, 0.25)',
    variant: 'regular',
  },
  {
    title: 'paisekidukaan',
    href: 'https://github.com/parallaxx-dev/paisekidukaan',
    summary:
      '"The money shop." A storefront concept — CSS-forward, exploring layout, typography and product page rhythm.',
    lang: 'CSS',
    langColor: '#563d7c',
    meta: ['💸 Frontend', '● Public', 'Pinned'],
    glow: 'rgba(139, 92, 246, 0.25)',
    variant: 'regular',
  },
];

export function WorkSection() {
  return (
    <section id="work" style={{ padding: '120px 0', position: 'relative' }}>
      <SectionHead
        number="/ 03"
        title={<>Selected <GradientEm>work</GradientEm></>}
        blurb={
          <>
            Six pinned projects from{' '}
            <a
              href="https://github.com/parallaxx-dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#67e8f9', textDecoration: 'none', borderBottom: '1px solid rgba(103,232,249,0.3)' }}
            >
              @parallaxx-dev
            </a>{' '}
            — exam portals, real-time servers, REST APIs, and the dotfiles that hold it all together.
          </>
        }
      />

      {/* CSS grid with named areas for feature/wide/regular variants */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto auto',
          gap: 16,
        }}
        className="project-grid"
      >
        {projects.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

function ProjectCard({ title, href, summary, lang, langColor, meta, glow, variant }: Project) {
  const isWide = variant === 'wide';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        gridColumn: isWide ? '1 / -1' : 'span 1',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '28px 28px 24px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = 'rgba(255,255,255,0.18)';
        el.style.boxShadow = `0 0 40px ${glow}`;
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            color: '#8b8a96',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: langColor,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          {lang}
        </span>
        <span style={{ color: '#8b8a96', opacity: 0.7 }}>
          <ArrowIcon />
        </span>
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#f4f3ee',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      <p style={{ margin: 0, fontSize: 14, color: '#8b8a96', lineHeight: 1.6 }}>{summary}</p>

      <div
        style={{
          display: 'flex',
          gap: 16,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          color: '#8b8a96',
          marginTop: 'auto',
          paddingTop: 8,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {meta.map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </a>
  );
}
