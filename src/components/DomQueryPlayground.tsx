import { useState } from "react";

type ElKey = "h1" | "p1" | "pNote" | "btn";

interface ElState {
  textContent?: string;
  color?: string;
  fontSize?: string;
}

interface DomState {
  h1: ElState;
  p1: ElState;
  pNote: ElState;
  btn: ElState;
}

interface Cmd {
  id: string;
  group: "find" | "change";
  label: string;
  code: string;
  target: ElKey;
  apply: (s: DomState) => DomState;
}

const INITIAL: DomState = { h1: {}, p1: {}, pNote: {}, btn: {} };

const COMMANDS: Cmd[] = [
  {
    id: "find-h1",
    group: "find",
    label: "querySelector('h1')",
    code: `document.querySelector('h1')`,
    target: "h1",
    apply: (s) => s
  },
  {
    id: "find-note",
    group: "find",
    label: "querySelector('.note')",
    code: `document.querySelector('.note')`,
    target: "pNote",
    apply: (s) => s
  },
  {
    id: "find-id",
    group: "find",
    label: "querySelector('#go')",
    code: `document.querySelector('#go')`,
    target: "btn",
    apply: (s) => s
  },
  {
    id: "set-h1-text",
    group: "change",
    label: "h1.textContent = 'Hi!'",
    code: `document.querySelector('h1')\n  .textContent = 'Hi!';`,
    target: "h1",
    apply: (s) => ({ ...s, h1: { ...s.h1, textContent: "Hi!" } })
  },
  {
    id: "color-note",
    group: "change",
    label: ".note color → red",
    code: `document.querySelector('.note')\n  .style.color = 'tomato';`,
    target: "pNote",
    apply: (s) => ({ ...s, pNote: { ...s.pNote, color: "tomato" } })
  },
  {
    id: "btn-text",
    group: "change",
    label: "#go textContent → 'GO!'",
    code: `document.querySelector('#go')\n  .textContent = 'GO!';`,
    target: "btn",
    apply: (s) => ({ ...s, btn: { ...s.btn, textContent: "GO!" } })
  },
  {
    id: "p-big",
    group: "change",
    label: "first p → big text",
    code: `document.querySelector('p')\n  .style.fontSize = '22px';`,
    target: "p1",
    apply: (s) => ({ ...s, p1: { ...s.p1, fontSize: "22px" } })
  }
];

export function DomQueryPlayground() {
  const [state, setState] = useState<DomState>(INITIAL);
  const [last, setLast] = useState<Cmd | null>(null);
  const [hover, setHover] = useState<ElKey | null>(null);

  const reset = () => {
    setState(INITIAL);
    setLast(null);
  };
  const click = (c: Cmd) => {
    setState((s) => c.apply(s));
    setLast(c);
  };

  const targetKey = hover ?? last?.target ?? null;
  const ring = (k: ElKey) => (k === targetKey ? "domq-target" : "");
  const findCmds = COMMANDS.filter((c) => c.group === "find");
  const changeCmds = COMMANDS.filter((c) => c.group === "change");

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">
          Just look — querySelector finds an element but doesn't change it
        </label>
        <div className="playground-buttons">
          {findCmds.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${last?.id === c.id ? "chip-active" : ""}`}
              onMouseEnter={() => setHover(c.target)}
              onMouseLeave={() => setHover(null)}
              onClick={() => click(c)}
            >
              <code>{c.label}</code>
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          Now change something on the page
        </label>
        <div className="playground-buttons">
          {changeCmds.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${last?.id === c.id ? "chip-active" : ""}`}
              onMouseEnter={() => setHover(c.target)}
              onMouseLeave={() => setHover(null)}
              onClick={() => click(c)}
            >
              <code>{c.label}</code>
            </button>
          ))}
          <button type="button" className="chip" onClick={reset}>
            reset page
          </button>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Live page</label>
        <div className="domq-page">
          <h1 className={ring("h1")} style={state.h1}>
            {state.h1.textContent ?? "About me"}
          </h1>
          <p className={ring("p1")} style={state.p1}>
            {state.p1.textContent ?? "Hi, I'm Sam."}
          </p>
          <p className={`note ${ring("pNote")}`} style={state.pNote}>
            {state.pNote.textContent ?? "I like pizza."}
          </p>
          <button
            type="button"
            className={ring("btn")}
            style={state.btn}
            disabled
          >
            {state.btn.textContent ?? "Click me"}
          </button>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Code that ran</div>
          <pre className="playground-code"><code>{last?.code ?? "// hover or click a command above"}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">What's happening</div>
          <div className="playground-output dom-explain">
            <strong>querySelector</strong> takes a CSS-style selector and returns the
            FIRST matching element. Once you have it, <code>.textContent</code> reads
            or sets its text, and <code>.style.<em>property</em></code> sets one CSS
            property at a time.
          </div>
        </div>
      </div>
    </div>
  );
}
