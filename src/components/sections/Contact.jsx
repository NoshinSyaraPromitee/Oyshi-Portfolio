import Reveal from '../ui/Reveal';
import Cutout from '../ui/Cutout';
import SectionTitle from '../ui/SectionTitle';
import { useContent } from '../../content/ContentContext';

export default function Contact() {
  const profile = useContent('profile');
  const { contact, socials, cutouts, firstName } = profile;

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__content">
          <SectionTitle title="Contact" />
          <Reveal as="a" href={`mailto:${contact.email}`} className="contact__email gold-text">
            {contact.email}
          </Reveal>
          <Reveal className="contact__details" delay={150}>
            <div>
              <small className="eyebrow">Phone</small>
              <p>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </p>
            </div>
            <div>
              <small className="eyebrow">Based in</small>
              <p>{contact.address}</p>
            </div>
          </Reveal>
          <Reveal className="contact__socials" delay={250}>
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </Reveal>
        </div>
        <div className="contact__visual">
          <Cutout src={cutouts.contact} alt={`${firstName} contact portrait`} fade />
        </div>
      </div>
    </section>
  );
}
