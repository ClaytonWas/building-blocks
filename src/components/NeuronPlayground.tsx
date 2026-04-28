import { useState } from "react";

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

const PRESETS: Array<{ label: string; w: [number, number, number]; b: number; description: string }> = [
  {
    label: "AND gate",
    w: [2, 2, 0],
    b: -3,
    description: "Fires only when BOTH inputs 1 and 2 are high."
  },
  {
    label: "OR gate",
    w: [2, 2, 0],
    b: -1,
    description: "Fires when at least ONE of inputs 1 or 2 is high."
  },
  {
    label: "NOT 3",
    w: [0, 0, -2],
    b: 1,
    description: "Fires when input 3 is LOW (a negative weight inverts the signal)."
  },
  {
    label: "Random",
    w: [0.5, -0.3, 0.8],
    b: -0.2,
    description: "A made-up neuron — see what fires it."
  }
];

export function NeuronPlayground() {
  const [inputs, setInputs] = useState<[number, number, number]>([1, 0, 1]);
  const [weights, setWeights] = useState<[number, number, number]>([2, 2, 0]);
  const [bias, setBias] = useState<number>(-3);

  const setInput = (i: number, v: number) => {
    const next = [...inputs] as [number, number, number];
    next[i] = v;
    setInputs(next);
  };
  const setWeight = (i: number, v: number) => {
    const next = [...weights] as [number, number, number];
    next[i] = v;
    setWeights(next);
  };

  const loadPreset = (p: typeof PRESETS[number]) => {
    setWeights(p.w);
    setBias(p.b);
  };

  const products = inputs.map((v, i) => v * weights[i]);
  const z = products.reduce((a, b) => a + b, 0) + bias;
  const out = sigmoid(z);
  const fired = out > 0.5;

  const formula = `(${inputs[0].toFixed(2)} × ${weights[0].toFixed(2)}) + (${inputs[1].toFixed(2)} × ${weights[1].toFixed(2)}) + (${inputs[2].toFixed(2)} × ${weights[2].toFixed(2)}) + ${bias.toFixed(2)}`;
  const formulaResult = `= ${z.toFixed(3)}`;
  const sigmoidResult = `sigmoid(${z.toFixed(3)}) = ${out.toFixed(3)}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Try a preset</label>
        <div className="playground-buttons">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="chip"
              onClick={() => loadPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="neuron-stage">
        <div className="neuron-side neuron-inputs">
          <div className="neuron-side-label">Inputs</div>
          {inputs.map((v, i) => (
            <div key={i} className="neuron-knob">
              <span className="neuron-knob-name">in {i + 1}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={v}
                onChange={(e) => setInput(i, Number(e.target.value))}
              />
              <span className="neuron-knob-value">{v.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="neuron-side neuron-weights">
          <div className="neuron-side-label">Weights</div>
          {weights.map((w, i) => (
            <div key={i} className="neuron-knob">
              <span className="neuron-knob-name">w {i + 1}</span>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.1}
                value={w}
                onChange={(e) => setWeight(i, Number(e.target.value))}
              />
              <span className="neuron-knob-value">{w.toFixed(2)}</span>
            </div>
          ))}
          <div className="neuron-knob">
            <span className="neuron-knob-name">bias</span>
            <input
              type="range"
              min={-3}
              max={3}
              step={0.1}
              value={bias}
              onChange={(e) => setBias(Number(e.target.value))}
            />
            <span className="neuron-knob-value">{bias.toFixed(2)}</span>
          </div>
        </div>

        <div className="neuron-side neuron-cell-side">
          <div className="neuron-side-label">Neuron</div>
          <div className={`neuron-cell ${fired ? "neuron-fired" : "neuron-quiet"}`}>
            <div className="neuron-cell-output">{out.toFixed(2)}</div>
            <div className="neuron-cell-state">{fired ? "FIRED" : "quiet"}</div>
          </div>
          <div className="neuron-bar-track">
            <div
              className="neuron-bar-fill"
              style={{ width: `${out * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">The math, step by step</div>
          <pre className="playground-code">
<code>{`weighted sum:
${formula}
${formulaResult}

activation:
${sigmoidResult}

fires when output > 0.5  →  ${fired ? "YES" : "no"}`}</code>
          </pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">What's happening</div>
          <div className="playground-output dom-explain">
            A neuron multiplies each input by its weight, adds a bias, and runs
            the result through a squashing function (here, <code>sigmoid</code>).
            The output is between 0 and 1. Above 0.5, we say the neuron "fired."
            That's it. That's the whole thing. Networks are millions of these
            wired together.
          </div>
        </div>
      </div>
    </div>
  );
}
