import Reveal from './Reveal';

export default function SectionTitle({ title }) {
  return (
    <Reveal className="section-title">
      <h2 className="section-title__heading">
        <em className="gold-text">{title}</em>
      </h2>
    </Reveal>
  );
}
