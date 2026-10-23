import { useContent } from '../../content/ContentContext';

export default function Footer() {
  const profile = useContent('profile');
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__name">{profile.fullName}</span>
        <a href="#home" className="eyebrow footer__top">Back to top</a>
      </div>
    </footer>
  );
}
