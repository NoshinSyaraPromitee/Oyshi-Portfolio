import { fallback } from '../../utils/fallback';

export default function WorkCard({ work, ratio, index }) {
  const { title, year, role, meta, platform, image, link } = work;
  const Wrap = link ? 'a' : 'div';
  const linkProps = link ? { href: link, target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Wrap className={`work-card work-card--${ratio}`} style={{ animationDelay: `${index * 90}ms` }} {...linkProps}>
      <div className="work-card__media">
        <img src={image} alt={title} loading="lazy" onError={fallback()} />
        <span className="work-card__platform">{platform}</span>
        {link && <span className="work-card__play">Watch</span>}
      </div>
      <div className="work-card__body">
        <span className="eyebrow">{year}</span>
        <h3 className="work-card__title">{title}</h3>
        <p className="work-card__role">{role}</p>
        <p className="work-card__meta">{meta}</p>
      </div>
    </Wrap>
  );
}