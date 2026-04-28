import type { Classifier, Prediction } from "../classifier";

/**
 * A 25-input, 4-hidden-neuron, 2-output network for "X vs O" on a 5x5 grid.
 * Pure JS — no external library. Trains via gradient descent on a small
 * built-in dataset so kids can watch the weights change.
 */

const N_INPUT = 25;
const N_HIDDEN = 4;
const N_OUTPUT = 2;
const LABELS = ["O", "X"] as const;

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function softmax(arr: number[]): number[] {
  const max = Math.max(...arr);
  const exps = arr.map((v) => Math.exp(v - max));
  const sum = exps.reduce((s, v) => s + v, 0);
  return exps.map((v) => v / sum);
}

function randNormal(scale: number) {
  // Box-Muller; scale = std deviation
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * scale;
}

export interface NetState {
  W1: number[][]; // [N_HIDDEN][N_INPUT]
  b1: number[]; // [N_HIDDEN]
  W2: number[][]; // [N_OUTPUT][N_HIDDEN]
  b2: number[]; // [N_OUTPUT]
}

export interface ForwardResult {
  hidden: number[]; // [N_HIDDEN] post-sigmoid
  output: number[]; // [N_OUTPUT] post-softmax
}

export class TinyNet implements Classifier {
  state: NetState;

  constructor(seed?: number) {
    this.state = this.makeRandomState(seed);
  }

  private makeRandomState(_seed?: number): NetState {
    return {
      W1: Array.from({ length: N_HIDDEN }, () =>
        Array.from({ length: N_INPUT }, () => randNormal(0.3))
      ),
      b1: Array(N_HIDDEN).fill(0),
      W2: Array.from({ length: N_OUTPUT }, () =>
        Array.from({ length: N_HIDDEN }, () => randNormal(0.5))
      ),
      b2: Array(N_OUTPUT).fill(0)
    };
  }

  randomize() {
    this.state = this.makeRandomState();
  }

  async ready() {
    return;
  }

  async classify(input: HTMLImageElement | HTMLCanvasElement): Promise<Prediction[]> {
    const pixels = readGrid(input);
    const { output } = this.forward(pixels);
    return [
      { label: LABELS[0], score: output[0] },
      { label: LABELS[1], score: output[1] }
    ].sort((a, b) => b.score - a.score);
  }

  forward(input: number[]): ForwardResult {
    const { W1, b1, W2, b2 } = this.state;
    const z1 = W1.map((row, i) =>
      row.reduce((s, w, j) => s + w * input[j], 0) + b1[i]
    );
    const hidden = z1.map(sigmoid);
    const z2 = W2.map((row, i) =>
      row.reduce((s, w, j) => s + w * hidden[j], 0) + b2[i]
    );
    const output = softmax(z2);
    return { hidden, output };
  }

  /**
   * One epoch of full-batch gradient descent.
   * Returns the average cross-entropy loss across the batch.
   */
  trainStep(
    examples: { input: number[]; label: 0 | 1 }[],
    lr = 0.5
  ): number {
    const { W1, b1, W2, b2 } = this.state;
    const dW1: number[][] = W1.map((row) => row.map(() => 0));
    const db1 = b1.map(() => 0);
    const dW2: number[][] = W2.map((row) => row.map(() => 0));
    const db2 = b2.map(() => 0);

    let totalLoss = 0;

    for (const ex of examples) {
      const { hidden, output } = this.forward(ex.input);
      // cross-entropy loss
      totalLoss += -Math.log(Math.max(output[ex.label], 1e-9));

      // dL/dz2 = output - oneHot(label)
      const dz2 = output.map((o, i) => o - (i === ex.label ? 1 : 0));

      // dL/dW2 = dz2 outer hidden; dL/db2 = dz2
      for (let i = 0; i < N_OUTPUT; i++) {
        for (let j = 0; j < N_HIDDEN; j++) {
          dW2[i][j] += dz2[i] * hidden[j];
        }
        db2[i] += dz2[i];
      }

      // dL/dhidden = W2^T @ dz2
      const dhidden = Array(N_HIDDEN).fill(0);
      for (let j = 0; j < N_HIDDEN; j++) {
        for (let i = 0; i < N_OUTPUT; i++) {
          dhidden[j] += W2[i][j] * dz2[i];
        }
      }
      // dL/dz1 = dhidden * sigmoid'(z1) = dhidden * hidden * (1 - hidden)
      const dz1 = dhidden.map((d, j) => d * hidden[j] * (1 - hidden[j]));

      for (let i = 0; i < N_HIDDEN; i++) {
        for (let j = 0; j < N_INPUT; j++) {
          dW1[i][j] += dz1[i] * ex.input[j];
        }
        db1[i] += dz1[i];
      }
    }

    const n = examples.length;
    for (let i = 0; i < N_HIDDEN; i++) {
      for (let j = 0; j < N_INPUT; j++) {
        W1[i][j] -= (lr * dW1[i][j]) / n;
      }
      b1[i] -= (lr * db1[i]) / n;
    }
    for (let i = 0; i < N_OUTPUT; i++) {
      for (let j = 0; j < N_HIDDEN; j++) {
        W2[i][j] -= (lr * dW2[i][j]) / n;
      }
      b2[i] -= (lr * db2[i]) / n;
    }

    return totalLoss / n;
  }
}

/** Read a 5x5 binary grid from a canvas element. */
function readGrid(input: HTMLImageElement | HTMLCanvasElement): number[] {
  const canvas =
    input instanceof HTMLCanvasElement ? input : imageToCanvas(input, 5, 5);
  const ctx = canvas.getContext("2d")!;
  const data = ctx.getImageData(0, 0, 5, 5).data;
  const out: number[] = [];
  for (let i = 0; i < 25; i++) {
    // Use the alpha channel as the "filled" signal (drawn cells are opaque).
    out.push(data[i * 4 + 3] > 128 ? 1 : 0);
  }
  return out;
}

function imageToCanvas(img: HTMLImageElement, w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  c.getContext("2d")!.drawImage(img, 0, 0, w, h);
  return c;
}

/** Built-in training set — a few X and O patterns each. */
export const X_PATTERNS: number[][] = [
  // prettier-ignore
  [
    1,0,0,0,1,
    0,1,0,1,0,
    0,0,1,0,0,
    0,1,0,1,0,
    1,0,0,0,1
  ],
  [
    1,0,0,0,1,
    1,1,0,1,1,
    0,1,1,1,0,
    1,1,0,1,1,
    1,0,0,0,1
  ],
  [
    0,0,0,0,0,
    0,1,0,1,0,
    0,0,1,0,0,
    0,1,0,1,0,
    0,0,0,0,0
  ],
  [
    1,0,0,0,1,
    0,1,0,1,0,
    0,0,0,0,0,
    0,1,0,1,0,
    1,0,0,0,1
  ]
];

export const O_PATTERNS: number[][] = [
  [
    0,1,1,1,0,
    1,0,0,0,1,
    1,0,0,0,1,
    1,0,0,0,1,
    0,1,1,1,0
  ],
  [
    1,1,1,1,1,
    1,0,0,0,1,
    1,0,0,0,1,
    1,0,0,0,1,
    1,1,1,1,1
  ],
  [
    0,0,0,0,0,
    0,1,1,1,0,
    0,1,0,1,0,
    0,1,1,1,0,
    0,0,0,0,0
  ],
  [
    0,1,1,1,0,
    1,0,0,0,1,
    1,0,0,0,1,
    1,0,0,0,1,
    1,1,1,1,1
  ]
];

export const TRAINING_SET: { input: number[]; label: 0 | 1 }[] = [
  ...O_PATTERNS.map((p) => ({ input: p, label: 0 as 0 })),
  ...X_PATTERNS.map((p) => ({ input: p, label: 1 as 1 }))
];
