import { useState } from "react";

interface Op {
  label: string;
  /** Returns [resultDisplay, codeJs, codePython]. */
  run: (s: string) => { display: string; js: string; python: string };
}

const OPS: Op[] = [
  {
    label: "ALL CAPS",
    run: (s) => ({
      display: s.toUpperCase(),
      js: `${quote(s)}.toUpperCase()`,
      python: `${quote(s)}.upper()`
    })
  },
  {
    label: "all lower",
    run: (s) => ({
      display: s.toLowerCase(),
      js: `${quote(s)}.toLowerCase()`,
      python: `${quote(s)}.lower()`
    })
  },
  {
    label: "length",
    run: (s) => ({
      display: String(s.length),
      js: `${quote(s)}.length`,
      python: `len(${quote(s)})`
    })
  },
  {
    label: "reverse",
    run: (s) => ({
      display: [...s].reverse().join(""),
      js: `${quote(s)}.split("").reverse().join("")`,
      python: `${quote(s)}[::-1]`
    })
  },
  {
    label: "first 3",
    run: (s) => ({
      display: s.slice(0, 3),
      js: `${quote(s)}.slice(0, 3)`,
      python: `${quote(s)}[:3]`
    })
  },
  {
    label: "contains 'o'",
    run: (s) => ({
      display: String(s.includes("o")),
      js: `${quote(s)}.includes("o")`,
      python: `"o" in ${quote(s)}`
    })
  },
  {
    label: "repeat × 2",
    run: (s) => ({
      display: s.repeat(2),
      js: `${quote(s)}.repeat(2)`,
      python: `${quote(s)} * 2`
    })
  }
];

function quote(s: string) {
  return `"${s.replace(/"/g, '\\"')}"`;
}

interface Props {
  language: "js" | "python";
  initial?: string;
}

export function StringPlayground({ language, initial = "Building Blocks" }: Props) {
  const [text, setText] = useState(initial);
  const [op, setOp] = useState<Op>(OPS[0]);
  const result = op.run(text);
  const code = language === "js" ? result.js : result.python;
  const printed =
    language === "js" ? `console.log(${code});` : `print(${code})`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Your string</label>
        <input
          className="playground-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className="playground-row">
        <label className="playground-label">Try a method</label>
        <div className="playground-buttons">
          {OPS.map((o) => (
            <button
              key={o.label}
              type="button"
              className={`chip ${op.label === o.label ? "chip-active" : ""}`}
              onClick={() => setOp(o)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Code</div>
          <pre className="playground-code">
            <code>{printed}</code>
          </pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Output</div>
          <div className="playground-output">{result.display || " "}</div>
        </div>
      </div>
    </div>
  );
}
