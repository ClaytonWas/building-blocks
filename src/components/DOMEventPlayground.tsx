import { useState } from "react";

type ActionId = "count" | "color" | "rotate" | "shrink";

interface Action {
  id: ActionId;
  label: string;
  code: string;
  apply: (state: ButtonState) => ButtonState;
}

interface ButtonState {
  text: string;
  bg: string;
  rotation: number;
  scale: number;
  count: number;
}

const INITIAL: ButtonState = {
  text: "Click me",
  bg: "#6a5cff",
  rotation: 0,
  scale: 1,
  count: 0
};

const COLORS = ["#6a5cff", "#ff7a59", "#fcc419", "#69db7c", "#4dabf7", "#f783ac"];

const ACTIONS: Action[] = [
  {
    id: "count",
    label: "Count clicks",
    code: `let count = 0;
btn.addEventListener("click", () => {
  count = count + 1;
  btn.textContent = "Clicked " + count + " times";
});`,
    apply: (s) => ({
      ...s,
      count: s.count + 1,
      text: `Clicked ${s.count + 1} time${s.count + 1 === 1 ? "" : "s"}`
    })
  },
  {
    id: "color",
    label: "Cycle colors",
    code: `const colors = ["#6a5cff", "#ff7a59", "#fcc419", "#69db7c"];
let i = 0;
btn.addEventListener("click", () => {
  i = (i + 1) % colors.length;
  btn.style.background = colors[i];
});`,
    apply: (s) => {
      const idx = (COLORS.indexOf(s.bg) + 1) % COLORS.length;
      return { ...s, bg: COLORS[idx] };
    }
  },
  {
    id: "rotate",
    label: "Rotate",
    code: `let angle = 0;
btn.addEventListener("click", () => {
  angle = angle + 15;
  btn.style.transform = "rotate(" + angle + "deg)";
});`,
    apply: (s) => ({ ...s, rotation: s.rotation + 15 })
  },
  {
    id: "shrink",
    label: "Shrink and grow",
    code: `let big = true;
btn.addEventListener("click", () => {
  big = !big;
  btn.style.transform = "scale(" + (big ? 1 : 0.7) + ")";
});`,
    apply: (s) => ({ ...s, scale: s.scale === 1 ? 0.7 : 1 })
  }
];

export function DOMEventPlayground() {
  const [action, setAction] = useState<Action>(ACTIONS[0]);
  const [state, setState] = useState<ButtonState>(INITIAL);

  const reset = () => setState(INITIAL);

  const onClick = () => setState(action.apply(state));

  const buttonStyle: React.CSSProperties = {
    background: state.bg,
    color: "#fff",
    border: 0,
    padding: "14px 22px",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transform: `rotate(${state.rotation}deg) scale(${state.scale})`,
    transition: "transform 200ms ease, background 200ms ease",
    fontFamily: "inherit"
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick what clicking does</label>
        <div className="playground-buttons">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`chip ${action.id === a.id ? "chip-active" : ""}`}
              onClick={() => {
                setAction(a);
                reset();
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Demo button (click it)</label>
        <div className="dom-stage">
          <button type="button" style={buttonStyle} onClick={onClick}>
            {state.text}
          </button>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Equivalent JavaScript</div>
          <pre className="playground-code"><code>{action.code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">What's happening</div>
          <div className="playground-output dom-explain">
            addEventListener wires a function to the button. Every click runs
            that function, which changes something on the page.
          </div>
        </div>
      </div>
    </div>
  );
}
