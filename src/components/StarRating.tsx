import Icon from "./Icon";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, size = 16, className = "" }: StarRatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const diff = rating - i;
    let name = "star";
    let filled = true;
    if (diff < -0.75) {
      name = "star";
      filled = false;
    } else if (diff < -0.25) {
      name = "star_half";
      filled = false;
    }
    stars.push(
      <Icon key={i} name={name} filled={filled} style={{ fontSize: size }} />
    );
  }
  return <div className={`flex text-rating-gold ${className}`}>{stars}</div>;
}
