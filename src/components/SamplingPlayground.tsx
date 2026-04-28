import { useMemo, useState } from "react";

const TRAINING =
  "the cat sat on the mat the cat ran the dog sat the bird flew the cat watched the bird sing the dog barked the cat slept";

type Mode = "predict" | "balanced" | "wild";

const MODES: Array<{ id: Mode; label: string; description: string }> = [
  {
    id: "predict",
    label: "Predictable (T = 0)",
    description: "Always pick the most common next word. Boring but safe."
  },
  {
    id: "balanced",
    label: "Balanced (T ≈ 0.5)",
    description:
      "Pick from common followers, weighted by how often they appeared."
  },
  {
    id: "wild",
    label: "Wild (T = 1)",
    description: "Pick any follower at random. Surprising but often weird."
  }
];

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildFollowers(tokens: string[]) {
  const map = new Map<string, Map<string, number>>();
  for (let i = 0; i < tokens.length - 1; i++) {
    const w = tokens[i];
    const next = tokens[i + 1];
    if (!map.has(w)) map.set(w, new Map());
    const inner = map.get(w)!;
    inner.set(next, (inner.get(next) ?? 0) + 1);
  }
  return map;
}

function pick(followers: Map<string, number>, mode: Mode): string | null {
  const entries = Array.from(followers.entries());
  if (entries.length === 0) return null;

  if (mode === "predict") {
    let best = entries[0];
    for (const e of entries) if (e[1] > best[1]) best = e;
    return best[0];
  }
  if (mode === "wild") {
    return entries[Math.floor(Math.random() * entries.length)][0];
  }
  // balanced: weighted random
  const total = entries.reduce((s, e) => s + e[1], 0);
  let r = Math.random() * total;
  for (const [word, count] of entries) {
    r -= count;
    if (r <= 0) return word;
  }
  return entries[entries.length - 1][0];
}

export function SamplingPlayground() {
  const [mode, setMode] = useState<Mode>("predict");
  const [seed] = useState("the");
  const [generated, setGenerated] = useState<string[] | null>(null);

  const tokens = useMemo(() => tokenize(TRAINING), []);
  const followers = useMemo(() => buildFollowers(tokens), [tokens]);

  const generate = () => {
    const out: string[] = [seed];
    let current = seed;
    for (let i = 0; i < 12; i++) {
      const next = pick(followers.get(current) ?? new Map(), mode);
      if (!next) break;
      out.push(next);
      current = next;
    }
    setGenerated(out);
  };

  const activeMode = MODES.find((m) => m.id === mode)!;

  const code = `function pickNext(followers, mode) {
  const entries = Array.from(followers.entries());
  if (mode === "predict") {
    // pick the highest count
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }
  if (mode === "wild") {
    // pick any follower at random
    return entries[Math.floor(Math.random() * entries.length)][0];
  }
  // balanced: weighted random by count
  const total = entries.reduce((s, e) => s + e[1], 0);
  let r = Math.random() * total;
  for (const [word, count] of entries) {
    r -= count;
    if (r <= 0) return word;
  }
}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">
          Training text (the model only knows these words)
        </label>
        <pre className="playground-code"><code>{TRAINING}</code></pre>
      </div>

      <div className="playground-row">
        <label className="playground-label">How creative should the model be?</label>
        <div className="playground-buttons">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`chip ${mode === m.id ? "chip-active" : ""}`}
              onClick={() => {
                setMode(m.id);
                setGenerated(null);
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <small className="playground-hint">{activeMode.description}</small>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          Generate 12 words starting from <code>the</code>
        </label>
        <div className="playground-inline">
          <button
            type="button"
            className="chip chip-primary"
            onClick={generate}
          >
            Generate
          </button>
          <small className="playground-hint">
            Try the same mode several times — the wild and balanced modes use
            randomness, so you'll get different results each click.
          </small>
        </div>
        {generated && (
          <div className="playground-output">{generated.join(" ")}</div>
        )}
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">How a sampler works</div>
          <pre className="playground-code"><code>{code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Why this matters</div>
          <div className="playground-output dom-explain">
            Real language models have a setting called <strong>temperature</strong>.
            Low temperature makes them safe and repetitive. High temperature
            makes them creative but sometimes nonsensical. Same model, totally
            different feel — just by changing one number.
          </div>
        </div>
      </div>
    </div>
  );
}
