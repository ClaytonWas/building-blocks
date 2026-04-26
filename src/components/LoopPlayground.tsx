import { useState } from "react";

interface Props {
  language: "js" | "python";
}

type LoopKind = "counter" | "forEach" | "while";

const ITEMS = ["apple", "banana", "cherry", "date", "fig"];

interface Frame {
  i: number;
  item: string;
  output: string;
}

function buildCounterFrames(): Frame[] {
  return Array.from({ length: 5 }, (_, i) => ({
    i,
    item: String(i + 1),
    output: `${i + 1}`
  }));
}

function buildForEachFrames(): Frame[] {
  return ITEMS.map((item, i) => ({
    i,
    item,
    output: item
  }));
}

function buildWhileFrames(): Frame[] {
  return Array.from({ length: 4 }, (_, idx) => {
    const i = idx * 2;
    return { i, item: String(i), output: `${i}` };
  });
}

const KINDS: Record<
  LoopKind,
  { label: string; codeJs: string; codePython: string; frames: () => Frame[] }
> = {
  counter: {
    label: "Counter loop",
    codeJs: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
    codePython: `for i in range(1, 6):
    print(i)`,
    frames: buildCounterFrames
  },
  forEach: {
    label: "Walk an array",
    codeJs: `const fruits = ${JSON.stringify(ITEMS)};
for (const fruit of fruits) {
  console.log(fruit);
}`,
    codePython: `fruits = ${JSON.stringify(ITEMS)}
for fruit in fruits:
    print(fruit)`,
    frames: buildForEachFrames
  },
  while: {
    label: "While condition",
    codeJs: `let i = 0;
while (i < 8) {
  console.log(i);
  i = i + 2;
}`,
    codePython: `i = 0
while i < 8:
    print(i)
    i = i + 2`,
    frames: buildWhileFrames
  }
};

export function LoopPlayground({ language }: Props) {
  const [kind, setKind] = useState<LoopKind>("counter");
  const [step, setStep] = useState(0);

  const cfg = KINDS[kind];
  const frames = cfg.frames();
  const code = language === "js" ? cfg.codeJs : cfg.codePython;
  const printed = frames.slice(0, step).map((f) => f.output);
  const current = step > 0 ? frames[step - 1] : null;
  const isDone = step >= frames.length;

  const reset = (newKind?: LoopKind) => {
    if (newKind) setKind(newKind);
    setStep(0);
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a loop kind</label>
        <div className="playground-buttons">
          {(Object.keys(KINDS) as LoopKind[]).map((k) => (
            <button
              key={k}
              type="button"
              className={`chip ${kind === k ? "chip-active" : ""}`}
              onClick={() => reset(k)}
            >
              {KINDS[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Step through it</label>
        <div className="loop-vis">
          {kind !== "counter" && kind !== "while" ? (
            ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`loop-cell ${
                  current && idx === current.i ? "loop-cell-active" : ""
                } ${current && idx < current.i + 1 ? "loop-cell-done" : ""}`}
              >
                <div className="loop-cell-label">[{idx}]</div>
                <div className="loop-cell-value">{item}</div>
              </div>
            ))
          ) : (
            frames.map((f, idx) => (
              <div
                key={idx}
                className={`loop-cell ${
                  current && idx === step - 1 ? "loop-cell-active" : ""
                } ${idx < step ? "loop-cell-done" : ""}`}
              >
                <div className="loop-cell-label">step {idx + 1}</div>
                <div className="loop-cell-value">{f.output}</div>
              </div>
            ))
          )}
        </div>
        <div className="playground-inline">
          <button
            type="button"
            className="chip chip-primary"
            onClick={() => setStep((s) => Math.min(s + 1, frames.length))}
            disabled={isDone}
          >
            {step === 0 ? "Start" : isDone ? "Done" : "Next step"}
          </button>
          <button type="button" className="chip" onClick={() => reset()}>
            Reset
          </button>
          <small className="playground-hint">
            {step === 0
              ? "Click Start to run the first iteration."
              : isDone
              ? "All iterations finished."
              : `Iteration ${step} of ${frames.length}.`}
          </small>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">
            Equivalent {language === "js" ? "JavaScript" : "Python"}
          </div>
          <pre className="playground-code"><code>{code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Output so far</div>
          <pre className="playground-code">
            <code>{printed.length === 0 ? "(nothing yet)" : printed.join("\n")}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
