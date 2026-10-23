import { useContent } from '../../content/ContentContext';

export default function Marquee() {
  const { moments = [] } = useContent('marquee') || {};
  const modelling = useContent('modelling') || [];
  if (!moments.length) return null;

  const photos = modelling.map((p) => p.src.replace(/w_\d+/, 'w_400'));
  const frames = moments.flatMap((text, i) => [
    ...(photos.length ? [{ type: 'photo', src: photos[i % photos.length] }] : []),
    { type: 'text', text },
  ]);
  const row = [...frames, ...frames];

  return (
    <div className="filmstrip" aria-hidden="true">
      <div className="filmstrip__track">
        {row.map((f, i) =>
          f.type === 'photo' ? (
            <div key={i} className="filmstrip__frame filmstrip__frame--photo">
              <img src={f.src} alt="" loading="lazy" />
            </div>
          ) : (
            <div key={i} className="filmstrip__frame filmstrip__frame--text">
              <span>{f.text}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
