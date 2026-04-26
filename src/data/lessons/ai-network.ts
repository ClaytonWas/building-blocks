import type { Lesson } from "../../types";

export const aiNetwork: Lesson = {
  id: "ai-network",
  trackId: "ai",
  title: "Stack Neurons into a Network",
  level: 5,
  intro:
    "One neuron can only learn really simple things. Stack a few of them in layers and they can learn shapes, patterns, even faces. That's a neural network.",
  concept: `A **layer** is just a row of neurons that all see the same inputs but each have their own weights. Each one ends up "specializing" — one might fire on slanted lines, another on round shapes, and so on.

A simple network has three layers:

- **Input layer** — the raw numbers coming in (e.g. the 25 pixels of a 5×5 drawing)
- **Hidden layer** — neurons that find patterns. Their outputs become the inputs to the next layer.
- **Output layer** — one neuron per category. The biggest output wins.

For our X-vs-O classifier, we'll use:

- 25 inputs (the 5×5 grid, 1 = drawn, 0 = blank)
- 4 hidden neurons (each one looks for a pattern)
- 2 outputs (one for "this is an O", one for "this is an X")

The whole network is just two big multiplications:

\`\`\`
hidden = sigmoid(W1 @ input + b1)   // 25 inputs in, 4 numbers out
output = softmax(W2 @ hidden + b2)  // 4 in, 2 out
\`\`\`

\`softmax\` is like sigmoid but for multiple outputs at once — it makes them sum to 1, so they read like probabilities.

### How does the network *learn*?

It starts with random weights — it guesses randomly. Then we show it examples ("this is an X", "this is an O") and after each one we nudge the weights a tiny bit to make the right answer slightly more likely. This is called **training**, and the nudging recipe is **gradient descent**.

After enough nudges, the hidden neurons stop being random and start being detectors for the specific patterns of X and O.`,
  examples: [
    {
      caption: "A two-layer forward pass in plain JS",
      code: `function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map((v) => Math.exp(v - max));
  const sum = exps.reduce((s, v) => s + v, 0);
  return exps.map((v) => v / sum);
}

function forward(input, W1, b1, W2, b2) {
  const hidden = W1.map((row, i) =>
    sigmoid(row.reduce((s, w, j) => s + w * input[j], 0) + b1[i])
  );
  const output = softmax(W2.map((row, i) =>
    row.reduce((s, w, j) => s + w * hidden[j], 0) + b2[i]
  ));
  return { hidden, output };
}`,
      note: "This is the WHOLE inference function for our 25→4→2 network. Real frameworks just hide this loop behind tensors.",
      tryIt: {
        js: `function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map((v) => Math.exp(v - max));
  const sum = exps.reduce((s, v) => s + v, 0);
  return exps.map((v) => v / sum);
}

// Tiny example: 2 inputs, 2 hidden, 2 outputs
const input = [1, 0];
const W1 = [[1, -1], [-1, 1]];
const b1 = [0, 0];
const W2 = [[1, 1], [-1, -1]];
const b2 = [0, 0];

const hidden = W1.map((row, i) =>
  sigmoid(row.reduce((s, w, j) => s + w * input[j], 0) + b1[i])
);
const z2 = W2.map((row, i) =>
  row.reduce((s, w, j) => s + w * hidden[j], 0) + b2[i]
);
const max = Math.max(...z2);
const exps = z2.map((v) => Math.exp(v - max));
const sum = exps.reduce((s, v) => s + v, 0);
const output = exps.map((v) => v / sum);

console.log("hidden:", hidden);
console.log("output:", output);`
      }
    }
  ],
  playground: { kind: "mininet" },
  exercise: {
    prompt:
      "Use the playground above to: (1) Click 'Reset weights' so the network starts random. (2) Predict an X — note how confused it is. (3) Click 'Train 50 steps'. Predict again. (4) Click 'Train 200 more'. (5) Look at the receptive fields — they should now look like X and O patterns. Then write three sentences in the editor describing what you saw.",
    files: {
      js: `// No code to write here — this is a watch-and-write exercise.
// In comments below, describe what you saw:
//
// 1. What did the predictions look like BEFORE training?
//
//
// 2. What did the predictions look like AFTER training?
//
//
// 3. What did the receptive fields look like before vs after?
//
`
    },
    hint: "It's totally OK if your network doesn't get every drawing right. With only 4 hidden neurons and a tiny dataset, that's expected.",
    expectedContains: ["//"]
  }
};
