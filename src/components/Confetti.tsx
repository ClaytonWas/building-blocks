import { useEffect, useState } from "react";

const COLORS = ["#ff7a59", "#4dabf7", "#fcc419", "#69db7c", "#f783ac", "#9775fa"];
const PIECES = 80;

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  size: number;
}

function makePieces(): Piece[] {
  return Array.from({ length: PIECES }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 1.6 + Math.random() * 1.4,
    color: COLORS[i % COLORS.length],
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 8
  }));
}

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {
    if (!active) {
      setPieces(null);
      return;
    }
    setPieces(makePieces());
    const t = setTimeout(() => setPieces(null), 3500);
    return () => clearTimeout(t);
  }, [active]);

  if (!pieces) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--rot" as string]: `${p.rotation}deg`
          }}
        />
      ))}
    </div>
  );
}
