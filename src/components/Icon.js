export default function Icon({ name, className }) {
  return (
    <svg viewBox='0 0 1 1' className={className}>
      <use href={`#${name}`} />
    </svg>
  );
}

export function getIconSource() {
  return (
    <svg>
      <defs>
        <svg id="blank" viewBox="0 0 100 100">
        </svg>
        <svg id="cross" viewBox="0 0 100 100">
          <path d="M55 50 l16 -16 l-5 -5 l-16 16 l-16 -16 l-5 5 l16 16 l-16 16 l5 5 l16 -16 l16 16 l5 -5 l-16 -16" />
        </svg>
        <svg id="menu" viewBox="0 0 100 100">
          <path d="M25 31 h50 v6 h-50 v-6" />
          <path d="M25 47 h50 v6 h-50 v-6" />
          <path d="M25 63 h50 v6 h-50 v-6" />
        </svg>
        <svg id="plus" viewBox="0 0 100 100">
          <path d="M53 53 v14 h-6 v-14 h-14 v-6 h14 v-14 h6 v14 h14 v6 h-14" />
        </svg>
      </defs>
    </svg>
  );
}
