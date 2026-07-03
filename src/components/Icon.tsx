interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, filled, className = "", style }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "fill" : ""} ${className}`}
      style={style}
    >
      {name}
    </span>
  );
}
