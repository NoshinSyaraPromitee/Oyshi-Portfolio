import { useEffect, useState } from 'react';
import { useRive } from '@rive-app/react-canvas';
import { useContent, useContentReady } from '../../content/ContentContext';

const MIN_TIME = 2200;
const MAX_TIME = 8000;

export default function Loader() {
  const profile = useContent('profile');
  const ready = useContentReady();
  const [pageLoaded, setPageLoaded] = useState(document.readyState === 'complete');
  const [minDone, setMinDone] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [gone, setGone] = useState(false);
  const { RiveComponent } = useRive({ src: '/animation/film.riv', autoplay: true });

  useEffect(() => {
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    const min = setTimeout(() => setMinDone(true), MIN_TIME);
    const max = setTimeout(() => setTimedOut(true), MAX_TIME);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(min);
      clearTimeout(max);
    };
  }, []);

  const hiding = timedOut || (pageLoaded && ready && minDone);

  useEffect(() => {
    document.body.style.overflow = hiding ? '' : 'hidden';
    if (!hiding) return;
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, [hiding]);

  if (gone) return null;

  return (
    <div className={`loader ${hiding ? 'loader--hide' : ''}`} aria-hidden="true">
      <div className="loader__anim">
        <RiveComponent />
      </div>
      <p className="loader__name eyebrow">{profile.fullName}</p>
    </div>
  );
}
