import { Link, NavLink, useLocation } from 'react-router-dom';

const portfolioLinks = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 10px 8px 18px',
        background: 'rgba(15, 14, 22, 0.6)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Brand */}
      <Link
        to="/"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          fontWeight: 600,
          color: '#f4f3ee',
          letterSpacing: '0.02em',
          paddingRight: 14,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          marginRight: 8,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            background: '#22c55e',
            borderRadius: '50%',
            boxShadow: '0 0 8px #22c55e',
            animation: 'dot-pulse 2.4s ease-in-out infinite',
            flexShrink: 0,
          }}
        />
        aaditya · MUM
      </Link>

      {/* Portfolio anchor links — only shown on home */}
      {isHome &&
        portfolioLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#8b8a96',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: 100,
              transition: 'color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLAnchorElement).style.color = '#f4f3ee';
              (e.target as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLAnchorElement).style.color = '#8b8a96';
              (e.target as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            {label}
          </a>
        ))}

      {/* Games route link */}
      <NavLink
        to="/games"
        style={({ isActive }) => ({
          fontSize: 13,
          fontWeight: 500,
          color: isActive ? '#f4f3ee' : '#8b8a96',
          textDecoration: 'none',
          padding: '8px 14px',
          borderRadius: 100,
          background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
          transition: 'color 0.2s, background 0.2s',
        })}
        onMouseEnter={e => {
          const el = e.target as HTMLAnchorElement;
          el.style.color = '#f4f3ee';
          el.style.background = 'rgba(255,255,255,0.05)';
        }}
        onMouseLeave={e => {
          const el = e.target as HTMLAnchorElement;
          const isActive = el.classList.contains('active') || el.getAttribute('aria-current') === 'page';
          el.style.color = isActive ? '#f4f3ee' : '#8b8a96';
          el.style.background = isActive ? 'rgba(255,255,255,0.05)' : 'transparent';
        }}
      >
        Games
      </NavLink>
    </nav>
  );
}
