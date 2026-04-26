import type { Lesson } from "../../types";

export const aiNeuron: Lesson = {
  id: "ai-neuron",
  trackId: "ai",
  title: "A Neuron is a Tiny Calculator",
  level: 4,
  intro:
    "Underneath every AI — image classifiers, chatbots, the works — sits one boring little thing: the neuron. Once you see what it does, the rest is just a lot of them stacked together.",
  concept: `A neuron has three parts:

- **Inputs** — numbers coming in (could be pixels, words-as-numbers, or other neurons' outputs)
- **Weights** — one number per input. They say "how much do I care about this input?"
- **A bias** — a number added at the end. It says "how easily do I fire?"

The neuron does this in order:

1. Multiply each input by its weight
2. Add all those products together
3. Add the bias
4. Run that through a "squashing" function (we'll use sigmoid) so the result is between 0 and 1

\`\`\`
output = sigmoid(in1 * w1 + in2 * w2 + in3 * w3 + bias)
\`\`\`

That's it. No magic. The output is between 0 and 1 — we usually say the neuron "fired" if it's above 0.5.

By choosing different weights, the same neuron can compute very different things. With weights \`[2, 2]\` and bias \`-3\`, it acts like an **AND gate** (fires only when both inputs are high). With weights \`[2, 2]\` and bias \`-1\`, it's an **OR gate**. Different weights, different behavior — same math.`,
  examples: [
    {
      caption: "A neuron in plain JavaScript",
      code: `function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function neuron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) {
    sum = sum + inputs[i] * weights[i];
  }
  return sigmoid(sum);
}

// AND-gate-ish neuron
console.log(neuron([1, 1], [2, 2], -3));  // ~0.73 (fired)
console.log(neuron([1, 0], [2, 2], -3));  // ~0.27 (quiet)
console.log(neuron([0, 0], [2, 2], -3));  // ~0.05 (quiet)`,
      note: "Same neuron, three different inputs. Notice it 'learned' an AND gate just by picking the right weights and bias.",
      tryIt: {
        js: `function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function neuron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) {
    sum = sum + inputs[i] * weights[i];
  }
  return sigmoid(sum);
}

console.log(neuron([1, 1], [2, 2], -3));
console.log(neuron([1, 0], [2, 2], -3));
console.log(neuron([0, 0], [2, 2], -3));`
      }
    },
    {
      caption: "Negative weights mean 'don't fire on this'",
      code: `function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function neuron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) sum += inputs[i] * weights[i];
  return sigmoid(sum);
}

// Fires only when input 3 is LOW
console.log(neuron([0, 0, 1], [0, 0, -2], 1));  // ~0.27
console.log(neuron([0, 0, 0], [0, 0, -2], 1));  // ~0.73`,
      note: "A negative weight inverts the signal. This is how a neuron can say 'I want this input to be quiet.'",
      tryIt: {
        js: `function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function neuron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) sum += inputs[i] * weights[i];
  return sigmoid(sum);
}

console.log(neuron([0, 0, 1], [0, 0, -2], 1));
console.log(neuron([0, 0, 0], [0, 0, -2], 1));`
      }
    }
  ],
  playground: { kind: "neuron" },
  exercise: {
    prompt:
      "Write a neuron function. Then find weights and a bias that make it act like an OR gate: it should fire (output > 0.5) when EITHER of two inputs is 1, and stay quiet when both are 0.",
    files: {
      js: `function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function neuron(inputs, weights, bias) {
  // 1. Multiply each input by its weight
  // 2. Add them together
  // 3. Add the bias
  // 4. Run sigmoid on the result and return it
}

// Test it like an OR gate
console.log(neuron([0, 0], /* weights */, /* bias */));  // should be < 0.5
console.log(neuron([1, 0], /* weights */, /* bias */));  // should be > 0.5
console.log(neuron([1, 1], /* weights */, /* bias */));  // should be > 0.5
`
    },
    hint: "Try weights [2, 2] and bias -1. The bias has to be small enough that EITHER input alone can push the sum above zero.",
    expectedContains: ["function neuron", "sigmoid", "console.log"]
  }
};
