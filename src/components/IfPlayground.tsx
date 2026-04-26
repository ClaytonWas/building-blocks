import { useState } from "react";

interface Props {
  language: "js" | "python";
}

interface Cond {
  id: string;
  label: string;
  jsExpr: (n: number) => string;
  pyExpr: (n: number) => string;
  test: (n: number) => boolean;
  truePath: string;
  falsePath: string;
}

const CONDITIONS: Cond[] = [
  {
    id: "gt10",
    label: "n > 10",
    jsExpr: () => "n > 10",
    pyExpr: () => "n > 10",
    test: (n) => n > 10,
    truePath: '"big number"',
    falsePath: '"small number"'
  },
  {
    id: "even",
    label: "n is even",
    jsExpr: () => "n % 2 === 0",
    pyExpr: () => "n % 2 == 0",
    test: (n) => n % 2 === 0,
    truePath: '"even"',
    falsePath: '"odd"'
  },
  {
    id: "positive",
    label: "n > 0",
    jsExpr: () => "n > 0",
    pyExpr: () => "n > 0",
    test: (n) => n > 0,
    truePath: '"positive"',
    falsePath: '"zero or negative"'
  },
  {
    id: "eq5",
    label: "n equals 5",
    jsExpr: () => "n === 5",
    pyExpr: () => "n == 5",
    test: (n) => n === 5,
    truePath: '"that is 5!"',
    falsePath: '"not 5"'
  }
];

export function IfPlayground({ language }: Props) {
  const [n, setN] = useState(7);
  const [cond, setCond] = useState<Cond>(CONDITIONS[0]);

  const isJs = language === "js";
  const result = cond.test(n);
  const expr = isJs ? cond.jsExpr(n) : cond.pyExpr(n);

  const code = isJs
    ? `let n = ${n};
if (${expr}) {
  console.log(${cond.truePath});
} else {
  console.log(${cond.falsePath});
}`
    : `n = ${n}
if ${expr}:
    print(${cond.truePath})
else:
    print(${cond.falsePath})`;

  const printedValue = result ? cond.truePath : cond.falsePath;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a condition</label>
        <div className="playground-buttons">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${cond.id === c.id ? "chip-active" : ""}`}
              onClick={() => setCond(c)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          Set the value of <code>n</code>
        </label>
        <div className="if-slider-row">
          <input
            type="range"
            min={-20}
            max={30}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
          <input
            type="number"
            className="playground-input if-number-input"
            value={n}
            onChange={(e) => setN(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          The condition <code>{expr}</code> is{" "}
          <span className={`pill ${result ? "pill-on" : "pill-off"}`}>
            {result ? (isJs ? "true" : "True") : isJs ? "false" : "False"}
          </span>
        </label>
        <div className="if-branches">
          <div className={`if-branch ${result ? "active" : "dim"}`}>
            <div className="if-branch-label">
              {isJs ? "if branch" : "if branch"}
            </div>
            <pre className="playground-code">
              <code>
                {isJs
                  ? `console.log(${cond.truePath});`
                  : `print(${cond.truePath})`}
              </code>
            </pre>
            {result && (
              <div className="if-branch-fired">↑ this one runs</div>
            )}
          </div>
          <div className={`if-branch ${!result ? "active" : "dim"}`}>
            <div className="if-branch-label">else branch</div>
            <pre className="playground-code">
              <code>
                {isJs
                  ? `console.log(${cond.falsePath});`
                  : `print(${cond.falsePath})`}
              </code>
            </pre>
            {!result && (
              <div className="if-branch-fired">↑ this one runs</div>
            )}
          </div>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">
            Equivalent {isJs ? "JavaScript" : "Python"}
          </div>
          <pre className="playground-code"><code>{code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Output</div>
          <div className="playground-output">{printedValue}</div>
        </div>
      </div>
    </div>
  );
}
