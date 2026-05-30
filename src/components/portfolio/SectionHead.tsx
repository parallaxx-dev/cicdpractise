interface SectionHeadProps {
  number: string;
  title: React.ReactNode;
  blurb?: React.ReactNode;
}

export function SectionHead({ number, title, blurb }: SectionHeadProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 56,
        gap: 32,
        flexWrap: 'wrap',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700,
          letterSpacing: '-0.035em',
          margin: 0,
          lineHeight: 1,
          color: '#f4f3ee',
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            fontWeight: 500,
            color: '#8b8a96',
            marginRight: 16,
            verticalAlign: 'middle',
            letterSpacing: 0,
          }}
        >
          {number}
        </span>
        {title}
      </h2>
      {blurb && (
        <p style={{ maxWidth: 380, color: '#8b8a96', fontSize: 15, margin: 0 }}>{blurb}</p>
      )}
    </div>
  );
}

export function GradientEm({ children }: { children: React.ReactNode }) {
  return (
    <em
      style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        background: 'linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </em>
  );
}
