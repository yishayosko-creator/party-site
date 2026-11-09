const STAR_POINTS = '0,-10 3,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -3,-3';

function Star({ x, y, scale = 1, fill }: { x: number; y: number; scale?: number; fill: string }) {
  return <polygon points={STAR_POINTS} fill={fill} transform={`translate(${x} ${y}) scale(${scale})`} />;
}

const CONFETTI = [
  { x: 40, y: 120, w: 10, h: 5, rot: 30, fill: '#ff6b9d' },
  { x: 74, y: 190, w: 6, h: 6, rot: 0, fill: '#4dabf7' },
  { x: 330, y: 130, w: 9, h: 4, rot: -40, fill: '#63e6be' },
  { x: 360, y: 60, w: 6, h: 6, rot: 15, fill: '#ffd43b' },
  { x: 300, y: 36, w: 8, h: 4, rot: 70, fill: '#ff6b9d' },
  { x: 110, y: 40, w: 7, h: 4, rot: -25, fill: '#4dabf7' },
  { x: 20, y: 70, w: 5, h: 5, rot: 0, fill: '#63e6be' },
];

const SPRINKLES = [
  { x: 120, y: 172, rot: 35, fill: '#4dabf7' },
  { x: 150, y: 186, rot: -20, fill: '#ffd43b' },
  { x: 205, y: 180, rot: 60, fill: '#ffffff' },
  { x: 260, y: 190, rot: 10, fill: '#63e6be' },
  { x: 290, y: 170, rot: -50, fill: '#ffd43b' },
  { x: 170, y: 124, rot: 20, fill: '#ff6b9d' },
  { x: 235, y: 128, rot: -30, fill: '#ffffff' },
  { x: 200, y: 96, rot: 0, fill: '#ff6b9d' },
];

const CANDLES = [
  { x: 172, color: '#ff6b9d' },
  { x: 200, color: '#63e6be' },
  { x: 228, color: '#ff6b9d' },
];

export function CakeIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} role="img" aria-label="עוגת יום הולדת מאוירת עם נרות" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#fff4e6" />
      <circle cx="60" cy="50" r="90" fill="#ffe3ec" opacity="0.7" />
      <circle cx="350" cy="210" r="110" fill="#e0f2ff" opacity="0.8" />

      {CONFETTI.map((piece, index) => (
        <rect
          key={index}
          x={piece.x}
          y={piece.y}
          width={piece.w}
          height={piece.h}
          rx="1.5"
          fill={piece.fill}
          transform={`rotate(${piece.rot} ${piece.x} ${piece.y})`}
        />
      ))}

      <Star x={60} y={150} scale={1.4} fill="#ffd43b" />
      <Star x={345} y={95} scale={1.8} fill="#ff6b9d" />
      <Star x={330} y={200} scale={1.2} fill="#4dabf7" />
      <Star x={80} y={40} scale={1} fill="#63e6be" />

      <ellipse cx="200" cy="216" rx="150" ry="14" fill="#d0e7f7" />

      <rect x="95" y="150" width="210" height="66" rx="18" fill="#ff6b9d" />
      <path d="M95 158 Q110 142 125 158 T155 158 T185 158 T215 158 T245 158 T275 158 T305 158 V150 H95 Z" fill="#ffffff" />
      <rect x="125" y="105" width="150" height="52" rx="16" fill="#4dabf7" />
      <path d="M125 113 Q140 97 155 113 T185 113 T215 113 T245 113 T275 113 V105 H125 Z" fill="#ffffff" />
      <rect x="155" y="70" width="90" height="42" rx="14" fill="#ffd43b" />
      <path d="M155 78 Q170 62 185 78 T215 78 T245 78 V70 H155 Z" fill="#ffffff" />

      {SPRINKLES.map((sprinkle, index) => (
        <rect
          key={index}
          x={sprinkle.x}
          y={sprinkle.y}
          width="8"
          height="3"
          rx="1.5"
          fill={sprinkle.fill}
          transform={`rotate(${sprinkle.rot} ${sprinkle.x} ${sprinkle.y})`}
        />
      ))}

      {CANDLES.map((candle) => (
        <g key={candle.x}>
          <rect x={candle.x - 4} y="30" width="8" height="42" rx="2" fill={candle.color} />
          <rect x={candle.x - 4} y="30" width="8" height="8" rx="2" fill="#ffffff" opacity="0.6" />
          <ellipse cx={candle.x} cy="22" rx="5" ry="9" fill="#ff922b" />
          <ellipse cx={candle.x} cy="24" rx="2.5" ry="5" fill="#ffd43b" />
        </g>
      ))}
    </svg>
  );
}

const BALLOONS = [
  { x: 120, y: 150, rx: 42, ry: 52, fill: '#ff6b6b' },
  { x: 215, y: 105, rx: 40, ry: 50, fill: '#ffd43b' },
  { x: 295, y: 175, rx: 42, ry: 52, fill: '#4dabf7' },
  { x: 180, y: 225, rx: 38, ry: 47, fill: '#63e6be' },
  { x: 262, y: 262, rx: 36, ry: 44, fill: '#f783ac' },
];

function Balloon({ x, y, rx, ry, fill }: { x: number; y: number; rx: number; ry: number; fill: string }) {
  const knotY = y + ry;
  return (
    <g>
      <path
        d={`M${x} ${knotY + 6} C ${x - 14} ${knotY + 60}, ${x + 14} ${knotY + 100}, ${x - 4} ${knotY + 150}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={fill} />
      <ellipse cx={x - rx * 0.35} cy={y - ry * 0.35} rx={rx * 0.22} ry={ry * 0.28} fill="#ffffff" opacity="0.45" />
      <polygon points={`${x - 5},${knotY - 1} ${x + 5},${knotY - 1} ${x},${knotY + 7}`} fill={fill} />
    </g>
  );
}

export function BalloonsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="בלונים צבעוניים מאוירים" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="#eef6ff" />
      <circle cx="350" cy="60" r="70" fill="#ffffff" opacity="0.7" />
      <circle cx="40" cy="360" r="90" fill="#fff0f6" opacity="0.9" />

      <Star x={60} y={70} scale={1.6} fill="#ffd43b" />
      <Star x={340} y={250} scale={1.4} fill="#ff6b9d" />
      <Star x={90} y={300} scale={1} fill="#4dabf7" />
      <circle cx="340" cy="330" r="5" fill="#63e6be" />
      <circle cx="50" cy="200" r="4" fill="#ff6b6b" />
      <circle cx="370" cy="150" r="4" fill="#ffd43b" />

      {BALLOONS.map((balloon) => (
        <Balloon key={`${balloon.x}-${balloon.y}`} {...balloon} />
      ))}

      <path
        d="M20 372 Q 110 350 200 376 T 380 360"
        fill="none"
        stroke="#ff6b9d"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M20 372 Q 110 350 200 376 T 380 360"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
        opacity="0.8"
      />
    </svg>
  );
}
