import { createElement, useState } from "react";

interface El {
  tag: "h1" | "p";
  text: string;
  classes: string[];
  id?: string;
}

interface Selector {
  id: string;
  sel: string;
  desc: string;
  match: (el: El) => boolean;
}

const ELEMENTS: El[] = [
  { tag: "h1", text: "All About Cats", classes: [] },
  { tag: "p", text: "Cats are great pets.", classes: [] },
  { tag: "p", text: "Watch out — they bite!", classes: ["warn"] },
  { tag: "p", text: "Best cat: orange.", classes: [], id: "hero" },
  { tag: "p", text: "Don't pull their tail.", classes: ["warn"] }
];

const SELECTORS: Selector[] = [
  { id: "h1", sel: "h1", desc: "every <h1> tag", match: (e) => e.tag === "h1" },
  { id: "p", sel: "p", desc: "every <p> tag", match: (e) => e.tag === "p" },
  {
    id: "warn",
    sel: ".warn",
    desc: 'every element with class="warn"',
    match: (e) => e.classes.includes("warn")
  },
  {
    id: "hero",
    sel: "#hero",
    desc: 'the one element with id="hero"',
    match: (e) => e.id === "hero"
  },
  {
    id: "p-warn",
    sel: "p.warn",
    desc: '<p> tags that ALSO have class="warn"',
    match: (e) => e.tag === "p" && e.classes.includes("warn")
  },
  { id: "all", sel: "*", desc: "literally every element", match: () => true }
];

function elMeta(el: El) {
  const parts: string[] = [];
  el.classes.forEach((c) => parts.push(`.${c}`));
  if (el.id) parts.push(`#${el.id}`);
  return parts.length > 0 ? parts.join(" ") : "";
}

export function CssSelectorPlayground() {
  const [active, setActive] = useState<Selector>(SELECTORS[0]);
  const cssRule = `${active.sel} {\n  color: #6a5cff;\n  font-weight: 700;\n}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a selector</label>
        <div className="playground-buttons">
          {SELECTORS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip ${active.id === s.id ? "chip-active" : ""}`}
              onClick={() => setActive(s)}
            >
              <code>{s.sel}</code>
            </button>
          ))}
        </div>
        <small className="playground-hint">{active.desc}</small>
      </div>

      <div className="playground-row">
        <label className="playground-label">The page</label>
        <div className="cssel-stage">
          {ELEMENTS.map((el, i) => {
            const meta = elMeta(el);
            const matches = active.match(el);
            const className = `cssel-el ${matches ? "match" : ""}`;
            return (
              <div key={i} className="cssel-row">
                {createElement(
                  el.tag,
                  { className, id: el.id },
                  el.text
                )}
                {meta && <span className="cssel-meta">{meta}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">CSS rule</div>
          <pre className="playground-code"><code>{cssRule}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">What's happening</div>
          <div className="playground-output dom-explain">
            <strong>Tag</strong> selectors target every tag of that name.{" "}
            <strong>.class</strong> selectors target every element with that
            class. <strong>#id</strong> selectors target the one element with
            that id. <code>p.warn</code> means BOTH must be true.
          </div>
        </div>
      </div>
    </div>
  );
}
