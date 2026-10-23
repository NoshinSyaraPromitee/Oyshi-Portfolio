import { useCallback, useEffect, useRef, useState } from 'react';

export default function Tabs({ items, active, onChange }) {
  const ref = useRef(null);
  const [more, setMore] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setMore({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, items.length]);

  useEffect(() => {
    const el = ref.current;
    const btn = el && el.querySelector('.is-active');
    if (!btn || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: btn.offsetLeft - (el.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const nudge = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: 'smooth' });
  };

  return (
    <div className={`tabs-wrap ${more.left ? 'has-left' : ''} ${more.right ? 'has-right' : ''}`}>
      <div className="tabs" role="tablist" ref={ref} onScroll={measure}>
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={selected}
              className={`tabs__btn ${selected ? 'is-active' : ''}`}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <button type="button" className="tabs__more tabs__more--left" onClick={() => nudge(-1)} aria-label="More options on the left" tabIndex={-1}>
        &#8249;
      </button>
      <button type="button" className="tabs__more tabs__more--right" onClick={() => nudge(1)} aria-label="More options on the right" tabIndex={-1}>
        &#8250;
      </button>
    </div>
  );
}
