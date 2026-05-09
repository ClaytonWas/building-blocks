import { useEffect, useMemo, useState } from "react";
import type { TrackId } from "../types";

interface Props {
  trackId: TrackId;
}

export function TrackPreview({ trackId }: Props) {
  switch (trackId) {
    case "html":
      return <HtmlPreview />;
    case "css":
      return <CssPreview />;
    case "js":
      return <JsPreview />;
    case "web":
      return <WebComboPreview />;
    case "python":
      return <PythonPreview />;
    case "ai":
      return <AiPreview />;
  }
}

/* -----------------------------------------------------------------
   HTML — cycle through real-world HTML page examples in an iframe
   ----------------------------------------------------------------- */

const HTML_BASE_STYLE = `
  * { box-sizing: border-box; }
  body { font: 14px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; color: #1d1b2e; margin: 0; padding: 20px; background: #fff; }
  h1, h2, h3 { margin: 0 0 8px; line-height: 1.2; }
  p { margin: 0 0 10px; }
  ul, ol { margin: 0 0 10px; padding-left: 22px; }
  li { margin-bottom: 4px; }
  a { color: #6a5cff; }
  img { max-width: 100%; display: block; border-radius: 8px; }
  button { font: inherit; cursor: pointer; }
`;

interface HtmlDemo {
  name: string;
  emoji: string;
  body: string;
  extraStyle?: string;
}

const HTML_DEMOS: HtmlDemo[] = [
  {
    name: "Profile card",
    emoji: "👤",
    extraStyle: `
      body { background: linear-gradient(135deg, #ffe5d9 0%, #ffd6e0 100%); padding: 24px; }
      .card { background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); max-width: 360px; margin: 0 auto; }
      .avatar { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #ff7a59, #ff5470); display: flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 12px; }
      h1 { font-size: 22px; }
      .tag { display: inline-block; background: #fff0e8; color: #ff7a59; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 999px; margin-right: 4px; margin-top: 2px; }
      .links a { display: inline-block; margin-right: 10px; text-decoration: none; font-weight: 600; font-size: 13px; }
    `,
    body: `<div class="card">
  <div class="avatar">🦊</div>
  <h1>Alex the Builder</h1>
  <p>11 years old &middot; Learning to code 🚀</p>
  <p>I love making games and drawing pixel art!</p>
  <div>
    <span class="tag">🎮 games</span>
    <span class="tag">🎨 art</span>
    <span class="tag">🐕 dogs</span>
  </div>
  <p class="links" style="margin-top:14px;">
    <a href="#">My projects →</a>
    <a href="#">Say hi →</a>
  </p>
</div>`
  },
  {
    name: "Recipe page",
    emoji: "🍪",
    extraStyle: `
      body { background: #fffaf0; padding: 24px; }
      .recipe { max-width: 420px; margin: 0 auto; }
      .hero { font-size: 64px; text-align: center; padding: 18px; background: #ffe8d6; border-radius: 14px; margin-bottom: 14px; }
      h1 { font-size: 24px; color: #6b4423; }
      h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #b08968; margin-top: 14px; }
      .meta { color: #8b6f55; font-size: 13px; margin-bottom: 14px; }
      ol li::marker { color: #ff7a59; font-weight: 700; }
    `,
    body: `<div class="recipe">
  <div class="hero">🍪</div>
  <h1>Chocolate Chip Cookies</h1>
  <p class="meta">⏱️ 25 min &middot; 👨‍🍳 easy &middot; 🍪 makes 12</p>

  <h2>Ingredients</h2>
  <ul>
    <li>1 cup butter</li>
    <li>¾ cup brown sugar</li>
    <li>2 eggs</li>
    <li>2 cups flour</li>
    <li>1 cup chocolate chips 🍫</li>
  </ul>

  <h2>Steps</h2>
  <ol>
    <li>Mix butter and sugar.</li>
    <li>Add eggs and stir.</li>
    <li>Mix in flour, then chocolate chips.</li>
    <li>Bake at 350°F for 12 minutes.</li>
  </ol>
</div>`
  },
  {
    name: "Game character sheet",
    emoji: "🎮",
    extraStyle: `
      body { background: #0f172a; color: #e2e8f0; padding: 24px; font-family: "Courier New", ui-monospace, monospace; }
      .sheet { max-width: 420px; margin: 0 auto; border: 2px solid #6a5cff; border-radius: 12px; padding: 20px; background: linear-gradient(135deg, #1e293b 0%, #312e81 100%); }
      h1 { color: #fbbf24; text-shadow: 0 0 12px rgba(251,191,36,0.5); font-size: 24px; }
      h2 { color: #6a5cff; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 14px; border-bottom: 1px solid #6a5cff; padding-bottom: 4px; }
      .stat { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
      .stat strong { color: #4ade80; }
      .bar { height: 8px; background: #334155; border-radius: 4px; overflow: hidden; margin: 4px 0; }
      .bar-fill { height: 100%; background: linear-gradient(90deg, #ef4444, #fbbf24, #4ade80); }
      ul { list-style: none; padding-left: 0; }
      li::before { content: "⚔️ "; }
    `,
    body: `<div class="sheet">
  <h1>⚡ Zara the Wizard</h1>
  <p>Level 7 &middot; Fire Mage</p>

  <h2>Health</h2>
  <div class="bar"><div class="bar-fill" style="width:78%"></div></div>
  <p style="font-size:12px;margin:0;">78 / 100 HP</p>

  <h2>Stats</h2>
  <div class="stat"><span>Strength</span><strong>14</strong></div>
  <div class="stat"><span>Magic</span><strong>22</strong></div>
  <div class="stat"><span>Speed</span><strong>17</strong></div>

  <h2>Abilities</h2>
  <ul>
    <li>Fireball</li>
    <li>Lightning Strike</li>
    <li>Healing Spell</li>
  </ul>
</div>`
  },
  {
    name: "Event poster",
    emoji: "🎉",
    extraStyle: `
      body { background: #1d1b2e; padding: 0; }
      .poster { max-width: 380px; margin: 0 auto; padding: 28px 24px; background: linear-gradient(160deg, #ff7a59 0%, #f783ac 60%, #6a5cff 100%); color: #fff; min-height: 100%; }
      .badge { display: inline-block; background: #fff; color: #1d1b2e; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 999px; }
      h1 { font-size: 38px; line-height: 1; margin: 14px 0; text-shadow: 0 4px 14px rgba(0,0,0,0.25); }
      h2 { font-size: 16px; opacity: 0.95; }
      .info { background: rgba(255,255,255,0.18); backdrop-filter: blur(8px); border-radius: 12px; padding: 14px; margin: 14px 0; }
      .info p { margin: 4px 0; font-size: 14px; }
      .cta { display: inline-block; background: #fff; color: #ff5470; font-weight: 700; padding: 12px 22px; border-radius: 999px; text-decoration: none; margin-top: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
    `,
    body: `<div class="poster">
  <span class="badge">🎟️ FRIDAY NIGHT</span>
  <h1>SUMMER<br/>JAM '26</h1>
  <h2>The biggest party of the year! 🎶</h2>

  <div class="info">
    <p>📅 <strong>July 19, 2026</strong></p>
    <p>📍 Riverside Park</p>
    <p>🎤 Live music + food trucks</p>
    <p>🎁 Free for kids under 12</p>
  </div>

  <a class="cta" href="#">Get tickets →</a>
</div>`
  },
  {
    name: "News article",
    emoji: "📰",
    extraStyle: `
      body { background: #fafaf7; padding: 24px; font-family: Georgia, serif; }
      .article { max-width: 460px; margin: 0 auto; }
      .kicker { font-family: system-ui, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #ff7a59; }
      h1 { font-size: 26px; line-height: 1.2; margin: 6px 0 8px; }
      .byline { font-family: system-ui, sans-serif; font-size: 12px; color: #6c6b7a; margin-bottom: 14px; }
      .hero-img { height: 140px; border-radius: 10px; background: linear-gradient(135deg, #4dabf7 0%, #69db7c 100%); display: flex; align-items: center; justify-content: center; font-size: 64px; margin-bottom: 14px; }
      p { font-size: 15px; line-height: 1.65; }
      blockquote { border-left: 3px solid #ff7a59; padding-left: 14px; margin: 14px 0; font-style: italic; color: #3b3a4a; }
    `,
    body: `<article class="article">
  <div class="kicker">🔬 Science</div>
  <h1>Kids Discover New Way to Make Robots Smarter</h1>
  <p class="byline">By Sam Reporter &middot; May 9, 2026</p>

  <div class="hero-img">🤖</div>

  <p>A team of <strong>fifth graders</strong> from Lincoln Elementary built a robot that can learn to navigate mazes <em>three times faster</em> than older designs.</p>

  <blockquote>"We just kept asking 'what if?' until something worked!" — Maya, age 11</blockquote>

  <p>The project will be presented at the science fair next month.</p>
</article>`
  }
];

function HtmlPreview() {
  const [idx, setIdx] = useState(0);
  const [styled, setStyled] = useState(true);

  useEffect(() => {
    if (!styled) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % HTML_DEMOS.length), 4500);
    return () => clearInterval(t);
  }, [styled]);

  const demo = HTML_DEMOS[idx];

  const srcDoc = useMemo(
    () => `<!doctype html>
<html>
<head>
${styled ? `<style>${HTML_BASE_STYLE}${demo.extraStyle ?? ""}</style>` : ""}
</head>
<body>
${demo.body}
</body>
</html>`,
    [demo, styled]
  );

  return (
    <PreviewShell label={`Live HTML — ${demo.emoji} ${demo.name}`}>
      <div className="tp-html-toolbar">
        <button
          type="button"
          className={`tp-html-toggle ${styled ? "" : "raw"}`}
          onClick={() => setStyled((s) => !s)}
        >
          {styled ? "👀 See raw HTML" : "🎨 Make it pretty"}
        </button>
        {!styled && (
          <span className="tp-html-hint">
            ← this is what HTML looks like by itself. CSS adds the magic ✨
          </span>
        )}
      </div>
      <iframe
        key={`${idx}-${styled}`}
        title={`HTML preview — ${demo.name}`}
        srcDoc={srcDoc}
        sandbox=""
        className="tp-frame tp-html-frame"
      />
      <div className="tp-css-dots">
        {HTML_DEMOS.map((d, i) => (
          <button
            key={d.name}
            type="button"
            className={`tp-dot ${i === idx ? "on" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Show ${d.name}`}
            title={d.name}
          />
        ))}
      </div>
    </PreviewShell>
  );
}

/* -----------------------------------------------------------------
   CSS — a styled card cycling through presets
   ----------------------------------------------------------------- */

interface CssPreset {
  name: string;
  bg: string;
  fg: string;
  radius: number;
  padding: number;
  weight: number;
  size: number;
  text: string;
}

const CSS_PRESETS: CssPreset[] = [
  { name: "Sticky note", bg: "#ffe066", fg: "#1d1b2e", radius: 4, padding: 22, weight: 600, size: 22, text: "remember me" },
  { name: "Pill button", bg: "#6a5cff", fg: "#ffffff", radius: 999, padding: 14, weight: 700, size: 16, text: "Click me" },
  { name: "Card", bg: "#ffffff", fg: "#1d1b2e", radius: 16, padding: 26, weight: 500, size: 18, text: "A friendly card" },
  { name: "Tag", bg: "#e0fbfc", fg: "#0a3d44", radius: 6, padding: 8, weight: 600, size: 13, text: "tag-style" }
];

function CssPreview() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % CSS_PRESETS.length), 2400);
    return () => clearInterval(t);
  }, []);
  const p = CSS_PRESETS[idx];

  return (
    <PreviewShell label={`Live CSS — ${p.name}`}>
      <div className="tp-css-stage">
        <span
          className="tp-css-chip"
          style={{
            background: p.bg,
            color: p.fg,
            borderRadius: p.radius,
            padding: `${Math.max(6, p.padding / 2)}px ${p.padding}px`,
            fontWeight: p.weight,
            fontSize: p.size,
            boxShadow:
              p.name === "Card" ? "0 8px 24px rgba(0,0,0,0.08)" : "none"
          }}
        >
          {p.text}
        </span>
      </div>
      <div className="tp-css-dots">
        {CSS_PRESETS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`tp-dot ${i === idx ? "on" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Show preset ${i + 1}`}
          />
        ))}
      </div>
    </PreviewShell>
  );
}

/* -----------------------------------------------------------------
   JavaScript — live clock + counter button (real JS running)
   ----------------------------------------------------------------- */

function JsPreview() {
  const [now, setNow] = useState(() => new Date());
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString();

  return (
    <PreviewShell label="Live JavaScript">
      <div className="tp-js-grid">
        <div className="tp-js-readout">
          <span className="tp-js-readout-label">Date.now</span>
          <span className="tp-js-readout-value">{time}</span>
        </div>
        <button
          type="button"
          className="tp-js-button"
          onClick={() => setCount((c) => c + 1)}
        >
          Clicked <strong>{count}</strong>{count === 1 ? " time" : " times"}
        </button>
        <pre className="tp-js-code">
{`setInterval(() => {
  clock.textContent = new Date()
    .toLocaleTimeString();
}, 1000);`}
        </pre>
      </div>
    </PreviewShell>
  );
}

/* -----------------------------------------------------------------
   Web Combo — HTML + CSS + JS together in one sandboxed iframe
   ----------------------------------------------------------------- */

function WebComboPreview() {
  const srcDoc = `<!doctype html>
<html>
<head>
<style>
  body { font: 14px/1.5 system-ui, -apple-system, sans-serif; margin:0; padding:18px; background:#fff; color:#1d1b2e; }
  h2 { margin: 0 0 12px; font-size: 16px; }
  .row { display:flex; gap:8px; align-items:center; margin-bottom: 10px; flex-wrap:wrap; }
  button {
    appearance:none; font:inherit; font-size:13px; font-weight:600;
    border:1px solid #d3d3c4; background:#f4f3ec; color:#1d1b2e;
    padding:6px 12px; border-radius:999px; cursor:pointer;
  }
  button:hover { border-color:#6a5cff; }
  button.on { background:#6a5cff; color:#fff; border-color:#6a5cff; }
  .stage {
    height: 90px; border-radius: 10px; display:flex; align-items:center; justify-content:center;
    color:#fff; font-weight:700; letter-spacing:0.04em; font-size:18px;
    transition: background 220ms ease, transform 220ms ease;
    background: #ff7a59;
  }
  .stage.calm    { background:#4dabf7; }
  .stage.happy   { background:#69db7c; color:#0d2e16; }
  .stage.cozy    { background:#ffa94d; }
  .stage.bouncy  { background:#f783ac; transform: translateY(-4px) rotate(-2deg); }
  .count { font-family: ui-monospace, monospace; color:#6c6b7a; font-size:12px; }
</style>
</head>
<body>
  <h2>Pick a mood</h2>
  <div class="row" id="moods">
    <button data-m="">default</button>
    <button data-m="calm">calm</button>
    <button data-m="happy">happy</button>
    <button data-m="cozy">cozy</button>
    <button data-m="bouncy">bouncy</button>
  </div>
  <div class="stage" id="stage">hello</div>
  <p class="count">clicks: <span id="c">0</span></p>
<script>
  let clicks = 0;
  const stage = document.getElementById('stage');
  const count = document.getElementById('c');
  document.getElementById('moods').addEventListener('click', (e) => {
    const t = e.target;
    if (t.tagName !== 'BUTTON') return;
    document.querySelectorAll('#moods button').forEach(b => b.classList.remove('on'));
    t.classList.add('on');
    stage.className = 'stage ' + (t.dataset.m || '');
    clicks++; count.textContent = clicks;
  });
<\/script>
</body>
</html>`;

  return (
    <PreviewShell label="Live HTML + CSS + JS">
      <iframe
        title="Web combo preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="tp-frame tp-frame-tall"
      />
    </PreviewShell>
  );
}

/* -----------------------------------------------------------------
   Python — simulated REPL that animates output line by line.
   (Pyodide is ~10MB; we avoid loading it just for a track preview
   and instead show an authentic Python program with its real output
   streamed in.)
   ----------------------------------------------------------------- */

const PY_CODE = `# fizzbuzz, the classic
for i in range(1, 11):
    if i % 15 == 0:
        print("fizzbuzz")
    elif i % 3 == 0:
        print("fizz")
    elif i % 5 == 0:
        print("buzz")
    else:
        print(i)`;

function pyOutput() {
  const lines: string[] = [];
  for (let i = 1; i <= 10; i++) {
    if (i % 15 === 0) lines.push("fizzbuzz");
    else if (i % 3 === 0) lines.push("fizz");
    else if (i % 5 === 0) lines.push("buzz");
    else lines.push(String(i));
  }
  return lines;
}

function PythonPreview() {
  const expected = useMemo(pyOutput, []);
  const [shown, setShown] = useState<string[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setShown([]);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(expected.slice(0, i));
      if (i >= expected.length) {
        clearInterval(t);
        setTimeout(() => setTick((n) => n + 1), 1400);
      }
    }, 220);
    return () => clearInterval(t);
  }, [tick, expected]);

  return (
    <PreviewShell label="Live Python">
      <div className="tp-py-grid">
        <pre className="tp-py-code">{PY_CODE}</pre>
        <div className="tp-py-console">
          <div className="tp-py-console-label">output</div>
          <div className="tp-py-console-body">
            {shown.length === 0 ? (
              <span className="tp-py-cursor">▌</span>
            ) : (
              shown.map((line, i) => (
                <div key={i} className="tp-py-line">
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

/* -----------------------------------------------------------------
   AI & Transformers — a small, working ConvNet whose neuron
   activations are visible at every layer (CS231n-style):
     input (10×10)  →  conv (4 hand-designed 3×3 filters)  →  ReLU
                    →  2×2 max-pool  →  dense  →  softmax
   Hand-designed filters detect vertical / horizontal / diagonal
   edges. Class weights (also hand-designed) combine those features
   into 4 shape categories: X, +, |, —.
   ----------------------------------------------------------------- */

const CNN_GRID = 10;
const CNN_FILTER = 3;
const CNN_CONV_SIZE = CNN_GRID - CNN_FILTER + 1; // 8
const CNN_POOL_SIZE = CNN_CONV_SIZE / 2; // 4
const CNN_BLANK = Array(CNN_GRID * CNN_GRID).fill(0);

interface Kernel {
  name: string;
  hint: string;
  k: number[];
}

const FILTERS: Kernel[] = [
  {
    name: "│",
    hint: "vertical edges",
    // prettier-ignore
    k: [
      -1,  2, -1,
      -1,  2, -1,
      -1,  2, -1
    ]
  },
  {
    name: "─",
    hint: "horizontal edges",
    // prettier-ignore
    k: [
      -1, -1, -1,
       2,  2,  2,
      -1, -1, -1
    ]
  },
  {
    name: "╱",
    hint: "diagonal /",
    // prettier-ignore
    k: [
      -1, -1,  2,
      -1,  2, -1,
       2, -1, -1
    ]
  },
  {
    name: "╲",
    hint: "diagonal \\",
    // prettier-ignore
    k: [
       2, -1, -1,
      -1,  2, -1,
      -1, -1,  2
    ]
  }
];

// Class weights over the 4 pooled-feature totals.
const CNN_CLASSES: { label: string; w: number[] }[] = [
  { label: "X", w: [0.0, 0.0, 1.0, 1.0] },
  { label: "+", w: [1.0, 1.0, 0.0, 0.0] },
  { label: "│", w: [1.2, 0.0, 0.0, 0.0] },
  { label: "─", w: [0.0, 1.2, 0.0, 0.0] }
];

const CNN_PRESETS: { label: string; pattern: number[] }[] = [
  {
    label: "X",
    // prettier-ignore
    pattern: [
      1,1,0,0,0,0,0,0,1,1,
      1,1,1,0,0,0,0,1,1,1,
      0,1,1,1,0,0,1,1,1,0,
      0,0,1,1,1,1,1,1,0,0,
      0,0,0,1,1,1,1,0,0,0,
      0,0,0,1,1,1,1,0,0,0,
      0,0,1,1,1,1,1,1,0,0,
      0,1,1,1,0,0,1,1,1,0,
      1,1,1,0,0,0,0,1,1,1,
      1,1,0,0,0,0,0,0,1,1
    ]
  },
  {
    label: "+",
    // prettier-ignore
    pattern: [
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0
    ]
  },
  {
    label: "│",
    // prettier-ignore
    pattern: [
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0,
      0,0,0,0,1,1,0,0,0,0
    ]
  },
  {
    label: "─",
    // prettier-ignore
    pattern: [
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0
    ]
  }
];

function convolve(input: number[], kernel: number[]): number[] {
  const out: number[] = [];
  for (let y = 0; y < CNN_CONV_SIZE; y++) {
    for (let x = 0; x < CNN_CONV_SIZE; x++) {
      let sum = 0;
      for (let ky = 0; ky < CNN_FILTER; ky++) {
        for (let kx = 0; kx < CNN_FILTER; kx++) {
          sum +=
            input[(y + ky) * CNN_GRID + (x + kx)] *
            kernel[ky * CNN_FILTER + kx];
        }
      }
      // ReLU
      out.push(sum > 0 ? sum : 0);
    }
  }
  return out;
}

function maxPool2(map: number[]): number[] {
  const out: number[] = [];
  for (let y = 0; y < CNN_POOL_SIZE; y++) {
    for (let x = 0; x < CNN_POOL_SIZE; x++) {
      const a = map[(y * 2) * CNN_CONV_SIZE + x * 2];
      const b = map[(y * 2) * CNN_CONV_SIZE + x * 2 + 1];
      const c = map[(y * 2 + 1) * CNN_CONV_SIZE + x * 2];
      const d = map[(y * 2 + 1) * CNN_CONV_SIZE + x * 2 + 1];
      out.push(Math.max(a, b, c, d));
    }
  }
  return out;
}

function softmax(arr: number[]): number[] {
  const max = Math.max(...arr);
  const exps = arr.map((v) => Math.exp(v - max));
  const sum = exps.reduce((s, v) => s + v, 0);
  return exps.map((v) => v / sum);
}

function normalize(map: number[]): number[] {
  const max = Math.max(1e-6, ...map);
  return map.map((v) => v / max);
}

function AiPreview() {
  const [grid, setGrid] = useState<number[]>(CNN_PRESETS[0].pattern.slice());

  const result = useMemo(() => {
    const featureMaps = FILTERS.map((f) => convolve(grid, f.k));
    const pooled = featureMaps.map(maxPool2);
    const totals = pooled.map((m) => m.reduce((s, v) => s + v, 0));
    const maxTotal = Math.max(1e-6, ...totals);
    const normTotals = totals.map((t) => t / maxTotal);
    const logits = CNN_CLASSES.map((c) =>
      c.w.reduce((s, w, i) => s + w * normTotals[i], 0)
    );
    // Sharpen — handcrafted weights are small, scale up for confident softmax
    const probs = softmax(logits.map((l) => l * 6));
    const top = probs.indexOf(Math.max(...probs));
    return {
      featureMaps: featureMaps.map(normalize),
      pooled: pooled.map(normalize),
      totals: normTotals,
      probs,
      top
    };
  }, [grid]);

  const toggleCell = (i: number) => {
    const next = grid.slice();
    next[i] = next[i] ? 0 : 1;
    setGrid(next);
  };

  const loadPreset = (i: number) => setGrid(CNN_PRESETS[i].pattern.slice());
  const clear = () => setGrid(CNN_BLANK.slice());

  const drawing = grid.some((v) => v > 0);
  const guess = drawing ? CNN_CLASSES[result.top].label : "?";

  return (
    <PreviewShell label="Live ConvNet — drawn pixels flow through filters into a guess">
      <div className="tp-cnn">
        {/* Stage 1: input */}
        <div className="tp-cnn-stage">
          <div className="tp-cnn-stage-label">
            <span className="tp-cnn-stage-num">1</span>
            <span>input</span>
            <span className="tp-cnn-stage-shape">10 × 10</span>
          </div>
          <div className="tp-cnn-input">
            {grid.map((v, i) => (
              <button
                key={i}
                type="button"
                className={`tp-cnn-pixel ${v ? "on" : ""}`}
                onClick={() => toggleCell(i)}
                aria-label={`pixel ${i + 1}`}
              />
            ))}
          </div>
          <div className="tp-cnn-presets">
            {CNN_PRESETS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                className="chip"
                onClick={() => loadPreset(i)}
              >
                {p.label}
              </button>
            ))}
            <button type="button" className="chip" onClick={clear}>
              clear
            </button>
          </div>
        </div>

        <div className="tp-cnn-arrow" aria-hidden="true">
          →
        </div>

        {/* Stage 2: conv + ReLU activations */}
        <div className="tp-cnn-stage">
          <div className="tp-cnn-stage-label">
            <span className="tp-cnn-stage-num">2</span>
            <span>conv + ReLU</span>
            <span className="tp-cnn-stage-shape">4 × 8 × 8</span>
          </div>
          <div className="tp-cnn-feature-row">
            {FILTERS.map((f, idx) => (
              <FeatureMap
                key={idx}
                name={f.name}
                hint={f.hint}
                size={CNN_CONV_SIZE}
                values={result.featureMaps[idx]}
                strength={result.totals[idx]}
              />
            ))}
          </div>
        </div>

        <div className="tp-cnn-arrow" aria-hidden="true">
          →
        </div>

        {/* Stage 3: pooled */}
        <div className="tp-cnn-stage">
          <div className="tp-cnn-stage-label">
            <span className="tp-cnn-stage-num">3</span>
            <span>max-pool</span>
            <span className="tp-cnn-stage-shape">4 × 4 × 4</span>
          </div>
          <div className="tp-cnn-feature-row">
            {result.pooled.map((m, idx) => (
              <FeatureMap
                key={idx}
                name={FILTERS[idx].name}
                size={CNN_POOL_SIZE}
                values={m}
                strength={result.totals[idx]}
              />
            ))}
          </div>
        </div>

        <div className="tp-cnn-arrow" aria-hidden="true">
          →
        </div>

        {/* Stage 4: classify */}
        <div className="tp-cnn-stage tp-cnn-stage-output">
          <div className="tp-cnn-stage-label">
            <span className="tp-cnn-stage-num">4</span>
            <span>classify</span>
          </div>
          <div className={`tp-cnn-guess ${drawing ? "" : "tp-cnn-guess-empty"}`}>
            {guess}
          </div>
          <div className="tp-cnn-probs">
            {CNN_CLASSES.map((c, i) => (
              <div
                key={c.label}
                className={`tp-cnn-prob-row ${i === result.top && drawing ? "top" : ""}`}
              >
                <span className="tp-cnn-prob-name">{c.label}</span>
                <div className="tp-cnn-prob-track">
                  <div
                    className="tp-cnn-prob-fill"
                    style={{ width: `${(result.probs[i] * 100).toFixed(1)}%` }}
                  />
                </div>
                <span className="tp-cnn-prob-pct">
                  {(result.probs[i] * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function FeatureMap({
  name,
  hint,
  size,
  values,
  strength
}: {
  name: string;
  hint?: string;
  size: number;
  values: number[];
  strength: number;
}) {
  return (
    <div
      className="tp-cnn-feature"
      style={{ opacity: 0.35 + 0.65 * strength }}
      title={hint}
    >
      <div
        className="tp-cnn-feature-grid"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`
        }}
      >
        {values.map((v, i) => (
          <div
            key={i}
            className="tp-cnn-feature-cell"
            style={{ background: `rgba(106, 92, 255, ${v.toFixed(3)})` }}
          />
        ))}
      </div>
      <div className="tp-cnn-feature-name">{name}</div>
    </div>
  );
}

/* -----------------------------------------------------------------
   Shared shell
   ----------------------------------------------------------------- */

function PreviewShell({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="track-preview" aria-label={label}>
      <div className="track-preview-label">{label}</div>
      <div className="track-preview-body">{children}</div>
    </section>
  );
}
