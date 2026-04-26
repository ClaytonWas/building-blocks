import { useMemo, useState } from "react";

interface Props {
  initial?: string;
}

const DEFAULT =
  "the cat sat the cat ran the dog sat the cat sat the bird flew the cat watched";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
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

function pickMostLikely(followers: Map<string, number>): string | null {
  let best: string | null = null;
  let bestCount = 0;
  for (const [word, count] of followers) {
    if (count > bestCount) {
      best = word;
      bestCount = count;
    }
  }
  return best;
}

export function TokenizerPlayground({ initial = DEFAULT }: Props) {
  const [text, setText] = useState(initial);
  const [selected, setSelected] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[] | null>(null);

  const tokens = useMemo(() => tokenize(text), [text]);
  const unique = useMemo(() => {
    const seen = new Set<string>();
    const order: string[] = [];
    for (const t of tokens) {
      if (!seen.has(t)) {
        seen.add(t);
        order.push(t);
      }
    }
    return order;
  }, [tokens]);
  const followers = useMemo(() => buildFollowers(tokens), [tokens]);

  const followersOf = selected
    ? Array.from(followers.get(selected)?.entries() ?? []).sort(
        (a, b) => b[1] - a[1]
      )
    : [];

  const generate = () => {
    const startWord = selected ?? unique[0];
    if (!startWord) return;
    const out: string[] = [startWord];
    let current = startWord;
    for (let i = 0; i < 8; i++) {
      const next = pickMostLikely(followers.get(current) ?? new Map());
      if (!next) break;
      out.push(next);
      current = next;
    }
    setGenerated(out);
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Training text</label>
        <textarea
          className="playground-input playground-textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSelected(null);
            setGenerated(null);
          }}
          rows={3}
          spellCheck={false}
        />
      </div>

      <div className="playground-row">
        <label className="playground-label">
          Tokens ({tokens.length} total, {unique.length} unique) — click one to
          see what usually comes after it
        </label>
        <div className="token-list">
          {unique.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${selected === t ? "chip-active" : ""}`}
              onClick={() => {
                setSelected(t);
                setGenerated(null);
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="playground-row">
          <label className="playground-label">
            What comes after <code>{selected}</code>?
          </label>
          {followersOf.length === 0 ? (
            <div className="playground-output">
              <em>It's the last word in the text — nothing follows it.</em>
            </div>
          ) : (
            <div className="follower-list">
              {followersOf.map(([word, count]) => (
                <div key={word} className="follower">
                  <span className="follower-word">{word}</span>
                  <span className="follower-count">×{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="playground-row">
        <label className="playground-label">Tiny generator</label>
        <div className="playground-inline">
          <button type="button" className="chip chip-primary" onClick={generate}>
            Generate 8 words
          </button>
          <small className="playground-hint">
            Starts at <code>{selected ?? unique[0] ?? "—"}</code> and walks the
            most-likely chain.
          </small>
        </div>
        {generated && (
          <div className="playground-output">{generated.join(" ")}</div>
        )}
      </div>
    </div>
  );
}
