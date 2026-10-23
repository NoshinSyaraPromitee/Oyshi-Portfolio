import { useState } from 'react';
import Reveal from '../ui/Reveal';
import SectionTitle from '../ui/SectionTitle';
import ReelScreen from '../ui/ReelScreen';
import ReelItem from '../ui/ReelItem';
import { useContent } from '../../content/ContentContext';
import { drive } from '../../utils/drive';

const dot = (...parts) => parts.filter(Boolean).join(' \u00b7 ');

export default function Showreel() {
  const reel = useContent('reel') || [];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  if (!reel.length) return null;
  const item = reel[active] || reel[0];

  const select = (i) => {
    setActive(i);
    setPlaying(true);
  };

  return (
    <section className="section reel" id="reel">
      <div className="container">
        <SectionTitle title="Showreel" />
        <div className="reel__grid">
          <Reveal className="reel__stage">
            <ReelScreen item={item} playing={playing} onPlay={() => setPlaying(true)} />
            <div className="reel__caption">
              <div>
                <span className="eyebrow">{dot(item.type, item.platform)}</span>
                <h3>{item.title}</h3>
                {(item.role || item.meta) && <p>{dot(item.role, item.meta)}</p>}
              </div>
              <a className="reel__open eyebrow" href={drive.view(item.id)} target="_blank" rel="noreferrer">
                Open in Drive
              </a>
            </div>
          </Reveal>
          <Reveal className="reel__list" delay={150}>
            {reel.map((r, i) => (
              <ReelItem key={`${r.id}-${i}`} item={r} active={i === active} onSelect={() => select(i)} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
