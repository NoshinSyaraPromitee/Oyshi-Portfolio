import { useEffect, useState } from 'react';
import useScrolled from '../../hooks/useScrolled';
import { navLinks } from '../../data/profile';

export default function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const quick = navLinks.filter((l) => l.primary);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <nav className="nav__quick" aria-label="Main">
          {quick.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="nav__links" aria-label="All sections">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={close} className={link.primary ? 'is-primary' : ''}>
              {link.label}
            </a>
          ))}
        </nav>
        <button className="nav__toggle" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'More sections'} aria-expanded={open}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
