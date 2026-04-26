import { useState } from "react";

interface Effect {
  id: string;
  label: string;
  className: string;
  css: string;
}

const EFFECTS: Effect[] = [
  {
    id: "lift",
    label: "Lift up",
    className: "hover-demo-lift",
    css: `.card {
  transition: transform 200ms ease;
}
.card:hover {
  transform: translateY(-6px);
}`
  },
  {
    id: "scale",
    label: "Scale up",
    className: "hover-demo-scale",
    css: `.card {
  transition: transform 200ms ease;
}
.card:hover {
  transform: scale(1.06);
}`
  },
  {
    id: "rotate",
    label: "Rotate",
    className: "hover-demo-rotate",
    css: `.card {
  transition: transform 200ms ease;
}
.card:hover {
  transform: rotate(-3deg);
}`
  },
  {
    id: "glow",
    label: "Glow",
    className: "hover-demo-glow",
    css: `.card {
  transition: box-shadow 200ms ease;
}
.card:hover {
  box-shadow: 0 0 0 6px rgba(106, 92, 255, 0.3);
}`
  },
  {
    id: "swap",
    label: "Color swap",
    className: "hover-demo-swap",
    css: `.card {
  transition: background 200ms ease, color 200ms ease;
}
.card:hover {
  background: #1d1b2e;
  color: #fff;
}`
  },
  {
    id: "underline",
    label: "Underline grow",
    className: "hover-demo-underline",
    css: `.card {
  position: relative;
}
.card::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 3px;
  background: #6a5cff;
  transition: width 200ms ease, left 200ms ease;
}
.card:hover::after {
  width: 100%;
  left: 0;
}`
  }
];

export function HoverPlayground() {
  const [effect, setEffect] = useState<Effect>(EFFECTS[0]);

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a hover effect</label>
        <div className="playground-buttons">
          {EFFECTS.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`chip ${effect.id === e.id ? "chip-active" : ""}`}
              onClick={() => setEffect(e)}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Hover the card</label>
        <div className="hover-stage">
          <div className={`hover-demo ${effect.className}`}>
            Hover me
          </div>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Equivalent CSS</div>
          <pre className="playground-code"><code>{effect.css}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">What's happening</div>
          <div className="playground-output dom-explain">
            The <code>:hover</code> selector picks the element only when the
            mouse is over it. <code>transition</code> tells the browser to
            animate the change instead of snapping.
          </div>
        </div>
      </div>
    </div>
  );
}
