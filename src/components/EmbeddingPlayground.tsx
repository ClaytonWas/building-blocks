import { useState } from "react";

interface Word {
  text: string;
  x: number;
  y: number;
  group: "animal" | "fruit" | "vehicle" | "number";
}

const WIDTH = 480;
const HEIGHT = 300;

const WORDS: Word[] = [
  // Animals (top-left)
  { text: "cat", x: 90, y: 70, group: "animal" },
  { text: "dog", x: 130, y: 90, group: "animal" },
  { text: "bird", x: 80, y: 110, group: "animal" },
  { text: "fish", x: 140, y: 50, group: "animal" },
  { text: "mouse", x: 60, y: 150, group: "animal" },

  // Fruits (top-right)
  { text: "apple", x: 350, y: 60, group: "fruit" },
  { text: "banana", x: 410, y: 90, group: "fruit" },
  { text: "cherry", x: 380, y: 130, group: "fruit" },
  { text: "grape", x: 330, y: 110, group: "fruit" },

  // Vehicles (bottom-left)
  { text: "car", x: 100, y: 220, group: "vehicle" },
  { text: "train", x: 60, y: 250, group: "vehicle" },
  { text: "bike", x: 130, y: 250, group: "vehicle" },
  { text: "boat", x: 80, y: 200, group: "vehicle" },

  // Numbers (bottom-right)
  { text: "one", x: 360, y: 220, group: "number" },
  { text: "two", x: 410, y: 240, group: "number" },
  { text: "three", x: 380, y: 260, group: "number" }
];

const GROUP_COLORS: Record<Word["group"], string> = {
  animal: "#ff7a59",
  fruit: "#69db7c",
  vehicle: "#4dabf7",
  number: "#fcc419"
};

function distance(a: Word, b: Word) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function EmbeddingPlayground() {
  const [a, setA] = useState<Word>(WORDS[0]);
  const [b, setB] = useState<Word>(WORDS[5]);

  const select = (w: Word) => {
    // Toggle: clicking the existing 'a' moves nothing; otherwise rotate.
    if (w.text === a.text) return;
    if (w.text === b.text) {
      setB(a);
      setA(w);
      return;
    }
    setB(a);
    setA(w);
  };

  const d = distance(a, b);
  const sameGroup = a.group === b.group;

  const code = `// Each word lives at a (x, y) position in "word space".
const a = { text: "${a.text}", x: ${a.x}, y: ${a.y} };
const b = { text: "${b.text}", x: ${b.x}, y: ${b.y} };

const dx = a.x - b.x;
const dy = a.y - b.y;
const distance = Math.sqrt(dx * dx + dy * dy);
console.log(distance); // ${d.toFixed(1)}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">
          Word space — words near each other have similar meanings.
          Click any word to compare it with the previously selected one.
        </label>
        <div className="embedding-stage">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="embedding-svg"
            role="img"
            aria-label="Word embedding scatter"
          >
            {/* Axis hint */}
            <line
              x1={0}
              y1={HEIGHT / 2}
              x2={WIDTH}
              y2={HEIGHT / 2}
              stroke="#e6e6e1"
              strokeDasharray="4 4"
            />
            <line
              x1={WIDTH / 2}
              y1={0}
              x2={WIDTH / 2}
              y2={HEIGHT}
              stroke="#e6e6e1"
              strokeDasharray="4 4"
            />
            {/* Connection between selected pair */}
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#6a5cff"
              strokeWidth={2}
              strokeDasharray="4 3"
              opacity={0.6}
            />
            {WORDS.map((w) => {
              const isA = w.text === a.text;
              const isB = w.text === b.text;
              const radius = isA || isB ? 8 : 5;
              return (
                <g
                  key={w.text}
                  className="embedding-word"
                  onClick={() => select(w)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={w.x}
                    cy={w.y}
                    r={radius}
                    fill={GROUP_COLORS[w.group]}
                    stroke={isA || isB ? "#1d1b2e" : "transparent"}
                    strokeWidth={2}
                  />
                  <text
                    x={w.x + 12}
                    y={w.y + 4}
                    fontSize="13"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={isA || isB ? 700 : 500}
                    fill="#1d1b2e"
                  >
                    {w.text}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Selected pair</label>
        <div className="embedding-pair">
          <div className="embedding-chip" style={{ background: GROUP_COLORS[a.group] }}>
            {a.text}
          </div>
          <span className="embedding-arrow">↔</span>
          <div className="embedding-chip" style={{ background: GROUP_COLORS[b.group] }}>
            {b.text}
          </div>
          <div className="embedding-distance">
            distance: <strong>{d.toFixed(1)}</strong>
            <span className={`embedding-tag ${sameGroup ? "same" : "diff"}`}>
              {sameGroup ? "same group — close" : "different groups — farther apart"}
            </span>
          </div>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">How the distance was computed</div>
          <pre className="playground-code"><code>{code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Why this matters</div>
          <div className="playground-output dom-explain">
            Real AI models give every word coordinates in hundreds of dimensions.
            Words that mean similar things end up close together. That's how a
            model can "know" that <em>cat</em> and <em>dog</em> are more alike
            than <em>cat</em> and <em>train</em>.
          </div>
        </div>
      </div>
    </div>
  );
}
