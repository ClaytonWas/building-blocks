import { useMemo, useRef, useState } from "react";
import {
  TinyNet,
  TRAINING_SET,
  X_PATTERNS,
  O_PATTERNS
} from "../ai/classifiers/tinynet";

const GRID_SIZE = 5;
const BLANK = Array(GRID_SIZE * GRID_SIZE).fill(0);

function gridFromBits(bits: number[]) {
  return bits.slice();
}

export function MiniNetworkPlayground() {
  const [grid, setGrid] = useState<number[]>(gridFromBits(X_PATTERNS[0]));
  const [, force] = useState(0);
  const [loss, setLoss] = useState<number | null>(null);
  const [steps, setSteps] = useState(0);
  const [training, setTraining] = useState(false);
  const netRef = useRef(new TinyNet());

  const { hidden, output } = useMemo(() => {
    return netRef.current.forward(grid);
  }, [grid]);

  const oScore = output[0];
  const xScore = output[1];
  const guess = xScore > oScore ? "X" : "O";
  const confidence = Math.max(xScore, oScore);

  const toggleCell = (i: number) => {
    const next = [...grid];
    next[i] = next[i] ? 0 : 1;
    setGrid(next);
  };

  const clear = () => setGrid(BLANK.slice());
  const loadX = () =>
    setGrid(X_PATTERNS[Math.floor(Math.random() * X_PATTERNS.length)]);
  const loadO = () =>
    setGrid(O_PATTERNS[Math.floor(Math.random() * O_PATTERNS.length)]);
  const reset = () => {
    netRef.current.randomize();
    setSteps(0);
    setLoss(null);
    force((n) => n + 1);
  };

  const train = async (n: number) => {
    setTraining(true);
    let last = 0;
    for (let i = 0; i < n; i++) {
      last = netRef.current.trainStep(TRAINING_SET, 0.6);
      if (i % 10 === 0) {
        await new Promise((r) => setTimeout(r, 0));
        force((v) => v + 1);
      }
    }
    setLoss(last);
    setSteps((s) => s + n);
    setTraining(false);
    force((v) => v + 1);
  };

  // Hidden-neuron receptive fields (their input weights as 5x5 grids)
  const receptiveFields = netRef.current.state.W1.map((row) => {
    const max = Math.max(1e-6, ...row.map(Math.abs));
    return row.map((w) => w / max); // -1..1
  });

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Draw an X or an O on the 5×5 grid</label>
        <div className="mini-grid-row">
          <div className="mini-grid">
            {grid.map((v, i) => (
              <button
                key={i}
                type="button"
                className={`mini-cell ${v ? "on" : ""}`}
                onClick={() => toggleCell(i)}
                aria-label={`pixel ${i + 1}`}
              />
            ))}
          </div>
          <div className="mini-grid-actions">
            <button type="button" className="chip" onClick={loadX}>Load an X</button>
            <button type="button" className="chip" onClick={loadO}>Load an O</button>
            <button type="button" className="chip" onClick={clear}>Clear</button>
          </div>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          What the network thinks
        </label>
        <div className="net-prediction">
          <div className={`net-guess ${guess === "X" ? "guess-x" : "guess-o"}`}>
            {guess}
          </div>
          <div className="net-bars">
            <div className="net-bar-row">
              <span className="net-bar-name">X</span>
              <div className="net-bar-track">
                <div
                  className="net-bar-fill x"
                  style={{ width: `${xScore * 100}%` }}
                />
              </div>
              <span className="net-bar-value">{(xScore * 100).toFixed(0)}%</span>
            </div>
            <div className="net-bar-row">
              <span className="net-bar-name">O</span>
              <div className="net-bar-track">
                <div
                  className="net-bar-fill o"
                  style={{ width: `${oScore * 100}%` }}
                />
              </div>
              <span className="net-bar-value">{(oScore * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="net-confidence">{(confidence * 100).toFixed(0)}% sure</div>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          Inside the network — what each hidden neuron has "learned" to look for
        </label>
        <div className="receptive-fields">
          {receptiveFields.map((rf, i) => (
            <div key={i} className="receptive-field">
              <div className="rf-grid">
                {rf.map((w, j) => (
                  <div
                    key={j}
                    className="rf-cell"
                    style={{
                      background:
                        w >= 0
                          ? `rgba(106, 92, 255, ${Math.abs(w)})`
                          : `rgba(255, 122, 89, ${Math.abs(w)})`
                    }}
                  />
                ))}
              </div>
              <div className="rf-label">
                neuron {i + 1} <span className="rf-act">act: {hidden[i].toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <small className="playground-hint">
          Blue = positive weight (this pixel makes the neuron fire). Orange =
          negative weight (this pixel makes it quiet). Before training, these
          look like static. After training, real patterns appear.
        </small>
      </div>

      <div className="playground-row">
        <label className="playground-label">Train the network</label>
        <div className="playground-inline">
          <button
            type="button"
            className="chip chip-primary"
            onClick={() => train(50)}
            disabled={training}
          >
            {training ? "Training…" : "Train 50 steps"}
          </button>
          <button
            type="button"
            className="chip"
            onClick={() => train(200)}
            disabled={training}
          >
            Train 200 more
          </button>
          <button type="button" className="chip" onClick={reset} disabled={training}>
            Reset weights
          </button>
          <small className="playground-hint">
            Steps trained: <strong>{steps}</strong>
            {loss !== null && (
              <>
                {" · "}loss: <strong>{loss.toFixed(3)}</strong>
              </>
            )}
          </small>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">What "training" actually means</div>
          <div className="playground-output dom-explain">
            The network starts with random weights — it guesses randomly.
            Training shows it many examples of X and O. After each one, it
            nudges the weights a tiny bit so it would have guessed better.
            After enough nudges, the receptive fields above stop looking
            random and start looking like the patterns of an X and an O.
          </div>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Why so few neurons?</div>
          <div className="playground-output dom-explain">
            Real networks have millions of neurons in hundreds of layers. We
            use 4 neurons here so you can see what each one is doing. The math
            is identical — just scaled up.
          </div>
        </div>
      </div>
    </div>
  );
}
