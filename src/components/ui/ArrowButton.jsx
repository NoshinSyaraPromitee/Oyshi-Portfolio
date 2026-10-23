export default function ArrowButton({ dir = 'right', onClick, label, disabled = false }) {
  return (
    <button className="arrow-btn" onClick={onClick} aria-label={label} disabled={disabled}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
        {dir === 'left' ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
