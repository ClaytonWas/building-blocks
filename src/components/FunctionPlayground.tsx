import { useState } from "react";

interface FnDef {
  id: string;
  label: string;
  signature: string;
  body: string;
  defaultArg: string;
  call: (arg: string) => string;
}

const FUNCTIONS: FnDef[] = [
  {
    id: "double",
    label: "double(n)",
    signature: "function double(n)",
    body: "  return n * 2;",
    defaultArg: "5",
    call: (arg) => {
      const n = Number(arg);
      return Number.isNaN(n) ? "NaN" : String(n * 2);
    }
  },
  {
    id: "square",
    label: "square(n)",
    signature: "function square(n)",
    body: "  return n * n;",
    defaultArg: "4",
    call: (arg) => {
      const n = Number(arg);
      return Number.isNaN(n) ? "NaN" : String(n * n);
    }
  },
  {
    id: "greet",
    label: "greet(name)",
    signature: "function greet(name)",
    body: '  return "Hi, " + name + "!";',
    defaultArg: '"Ada"',
    call: (arg) => {
      const stripped = arg.replace(/^"|"$/g, "");
      return `"Hi, ${stripped}!"`;
    }
  },
  {
    id: "shout",
    label: "shout(text)",
    signature: "function shout(text)",
    body: '  return text.toUpperCase() + "!";',
    defaultArg: '"hello"',
    call: (arg) => {
      const stripped = arg.replace(/^"|"$/g, "");
      return `"${stripped.toUpperCase()}!"`;
    }
  },
  {
    id: "isBig",
    label: "isBig(n)",
    signature: "function isBig(n)",
    body: "  return n > 100;",
    defaultArg: "42",
    call: (arg) => {
      const n = Number(arg);
      return Number.isNaN(n) ? "false" : String(n > 100);
    }
  }
];

export function FunctionPlayground() {
  const [fn, setFn] = useState<FnDef>(FUNCTIONS[0]);
  const [arg, setArg] = useState<string>(FUNCTIONS[0].defaultArg);
  const [result, setResult] = useState<string | null>(null);

  const pick = (next: FnDef) => {
    setFn(next);
    setArg(next.defaultArg);
    setResult(null);
  };

  const callIt = () => {
    setResult(fn.call(arg));
  };

  const callName = fn.label.split("(")[0];
  const definition = `${fn.signature} {
${fn.body}
}`;
  const usage = `${callName}(${arg})${result !== null ? `  // → ${result}` : ""}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a function</label>
        <div className="playground-buttons">
          {FUNCTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip ${fn.id === f.id ? "chip-active" : ""}`}
              onClick={() => pick(f)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Argument to pass in</label>
        <div className="playground-inline">
          <input
            className="playground-input"
            value={arg}
            onChange={(e) => {
              setArg(e.target.value);
              setResult(null);
            }}
            spellCheck={false}
            onKeyDown={(e) => e.key === "Enter" && callIt()}
          />
          <button type="button" className="chip chip-primary" onClick={callIt}>
            Call {callName}
          </button>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Function definition</div>
          <pre className="playground-code"><code>{definition}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Calling it</div>
          <pre className="playground-code"><code>{usage}</code></pre>
        </div>
      </div>
    </div>
  );
}
