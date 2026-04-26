import { useState } from "react";

interface State {
  bg: string;
  text: string;
  fontSize: number;
  padding: number;
  radius: number;
  weight: number;
}

const PRESETS: Array<{ label: string; value: State }> = [
  { label: "Sticky note", value: { bg: "#ffe066", text: "#1d1b2e", fontSize: 22, padding: 20, radius: 4, weight: 600 } },
  { label: "Pill button", value: { bg: "#6a5cff", text: "#ffffff", fontSize: 16, padding: 12, radius: 999, weight: 700 } },
  { label: "Card", value: { bg: "#ffffff", text: "#1d1b2e", fontSize: 18, padding: 28, radius: 16, weight: 500 } },
  { label: "Tag", value: { bg: "#e0fbfc", text: "#0a3d44", fontSize: 13, padding: 6, radius: 6, weight: 600 } }
];

export function CSSPlayground() {
  const [s, setS] = useState<State>(PRESETS[0].value);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setS((prev) => ({ ...prev, [key]: value }));

  const css = `.box {
  background: ${s.bg};
  color: ${s.text};
  font-size: ${s.fontSize}px;
  padding: ${s.padding}px;
  border-radius: ${s.radius}px;
  font-weight: ${s.weight};
}`;

  const previewStyle: React.CSSProperties = {
    background: s.bg,
    color: s.text,
    fontSize: `${s.fontSize}px`,
    padding: `${s.padding}px`,
    borderRadius: `${s.radius}px`,
    fontWeight: s.weight,
    display: "inline-block"
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Presets</label>
        <div className="playground-buttons">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="chip"
              onClick={() => setS(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="css-knobs">
        <label className="knob">
          <span className="knob-label">background</span>
          <input
            type="color"
            value={s.bg}
            onChange={(e) => set("bg", e.target.value)}
          />
          <code className="knob-value">{s.bg}</code>
        </label>
        <label className="knob">
          <span className="knob-label">text color</span>
          <input
            type="color"
            value={s.text}
            onChange={(e) => set("text", e.target.value)}
          />
          <code className="knob-value">{s.text}</code>
        </label>
        <label className="knob">
          <span className="knob-label">font-size</span>
          <input
            type="range"
            min={10}
            max={48}
            value={s.fontSize}
            onChange={(e) => set("fontSize", Number(e.target.value))}
          />
          <code className="knob-value">{s.fontSize}px</code>
        </label>
        <label className="knob">
          <span className="knob-label">padding</span>
          <input
            type="range"
            min={0}
            max={48}
            value={s.padding}
            onChange={(e) => set("padding", Number(e.target.value))}
          />
          <code className="knob-value">{s.padding}px</code>
        </label>
        <label className="knob">
          <span className="knob-label">border-radius</span>
          <input
            type="range"
            min={0}
            max={48}
            value={s.radius}
            onChange={(e) => set("radius", Number(e.target.value))}
          />
          <code className="knob-value">{s.radius}px</code>
        </label>
        <label className="knob">
          <span className="knob-label">font-weight</span>
          <input
            type="range"
            min={300}
            max={900}
            step={100}
            value={s.weight}
            onChange={(e) => set("weight", Number(e.target.value))}
          />
          <code className="knob-value">{s.weight}</code>
        </label>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Live preview</div>
          <div className="css-preview-stage">
            <span style={previewStyle}>The quick fox</span>
          </div>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Equivalent CSS</div>
          <pre className="playground-code"><code>{css}</code></pre>
        </div>
      </div>
    </div>
  );
}
