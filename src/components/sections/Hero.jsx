import Cutout from '../ui/Cutout';
import Button from '../ui/Button';
import { useContent } from '../../content/ContentContext';

export default function Hero() {
  const profile = useContent('profile');
  const { firstName, lastName, fullName, tagline, cutouts } = profile;

  return (
    <section className="hero" id="home">
      <div className="hero__aura" aria-hidden="true" />
      <h1 className="hero__name hero__name--back gold-text">
        <span>{firstName}</span>
        <span>{lastName}</span>
      </h1>
      <div className="hero__figure">
        <Cutout src={cutouts.hero} alt={fullName} fade />
      </div>

      <div className="hero__meta">
        <p className="eyebrow">{fullName}</p>
        <p className="hero__tagline">{tagline}</p>
        <div className="hero__actions">
          <Button href="#reel">Watch Showreel</Button>
          <Button href="#contact" variant="ghost">Contact Me</Button>
        </div>
      </div>

      <a href="#about" className="hero__scroll">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
