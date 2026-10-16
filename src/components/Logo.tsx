export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`} aria-label="Cyberspace">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path d="M20 5 9 16l11 11" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
        <path d="M27 9 20 16l7 7" fill="none" stroke="var(--blue-bright)" strokeWidth="4" strokeLinecap="square" />
      </svg>
      <span className="logo__text">CYBERSPACE</span>
    </span>
  );
}
