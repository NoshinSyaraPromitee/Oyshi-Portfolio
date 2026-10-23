export default function Button({ href, children, variant = 'solid' }) {
  return (
    <a href={href} className={`btn btn--${variant}`}>
      <span>{children}</span>
    </a>
  );
}