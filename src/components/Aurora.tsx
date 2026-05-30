export function Aurora() {
  return (
    <>
      <div
        aria-hidden
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
      >
        {/* Violet blob — top-left */}
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            top: -200,
            left: -150,
            opacity: 0.55,
            filter: 'blur(110px)',
            animation: 'drift-1 22s ease-in-out infinite alternate',
          }}
        />
        {/* Cyan blob — right */}
        <div
          style={{
            position: 'absolute',
            width: 640,
            height: 640,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            top: '30%',
            right: -180,
            opacity: 0.4,
            filter: 'blur(110px)',
            animation: 'drift-2 26s ease-in-out infinite alternate',
          }}
        />
        {/* Magenta blob — bottom-center */}
        <div
          style={{
            position: 'absolute',
            width: 580,
            height: 580,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            bottom: -180,
            left: '30%',
            opacity: 0.35,
            filter: 'blur(110px)',
            animation: 'drift-3 30s ease-in-out infinite alternate',
          }}
        />
      </div>
      <div aria-hidden className="grain" />
      <div aria-hidden className="vignette" />
    </>
  );
}
