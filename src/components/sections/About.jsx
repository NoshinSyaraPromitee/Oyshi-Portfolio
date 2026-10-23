import Reveal from '../ui/Reveal';
import Cutout from '../ui/Cutout';
import SectionTitle from '../ui/SectionTitle';
import { useContent } from '../../content/ContentContext';

export default function About() {
  const profile = useContent('profile');
  const { firstName, fullName, bio, education, stats, cutouts, since } = profile;

  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal className="about__visual">
          <div className="about__arch" aria-hidden="true" />
          <Cutout src={cutouts.about} alt={`${firstName} portrait`} glow={false} />
          <span className="about__caption eyebrow">{since}</span>
        </Reveal>

        <div className="about__content">
          <SectionTitle title="About" />
          {bio.map((para, i) => (
            <Reveal as="p" key={i} delay={i * 120} className="about__text">
              {para}
            </Reveal>
          ))}
          <Reveal as="p" className="about__text" delay={200}>
            <span className="eyebrow">{education.label}</span>
            <br />
            {education.subject},{' '}
            <a href={education.url} target="_blank" rel="noreferrer" className="gold-text">
              {education.institute}
            </a>
          </Reveal>
          <Reveal className="about__stats" delay={260}>
            {stats.map((s) => (
              <div key={s.label}>
                <strong className="gold-text">{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="about__signature" delay={380}>
            {fullName}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
