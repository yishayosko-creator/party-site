import { Star } from 'lucide-react';

const STAR_SPOTS = [
  { top: '10%', insetInlineStart: '6%', size: 14 },
  { top: '18%', insetInlineEnd: '10%', size: 10 },
  { top: '62%', insetInlineStart: '3%', size: 9 },
  { top: '70%', insetInlineEnd: '5%', size: 13 },
];

export default function ThemeStars() {
  return (
    <>
      {STAR_SPOTS.map((spot, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute text-[var(--theme-star)] opacity-70"
          fill="currentColor"
          style={{
            top: spot.top,
            insetInlineStart: spot.insetInlineStart,
            insetInlineEnd: spot.insetInlineEnd,
            width: spot.size,
            height: spot.size,
          }}
        />
      ))}
    </>
  );
}
