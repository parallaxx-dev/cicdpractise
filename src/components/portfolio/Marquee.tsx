const items = [
  'systems thinking',
  'real-time comms',
  'ci / cd pipelines',
  'elegant code',
  'scalable architecture',
  'cybersecurity',
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '18px 0',
        marginBottom: 0,
      }}
    >
      <div
        className="marquee-track"
        style={{ display: 'flex', gap: 0, width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              fontWeight: 500,
              color: '#8b8a96',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0 40px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
