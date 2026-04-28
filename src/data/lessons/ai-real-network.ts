import type { Lesson } from "../../types";

export const aiRealNetwork: Lesson = {
  id: "ai-real-network",
  trackId: "ai",
  title: "Real Networks See Real Images",
  level: 6,
  intro:
    "Our X-vs-O network had 4 hidden neurons. A real one — like the one Google uses on your phone — has millions. Let's load one in the browser and watch it work.",
  concept: `**MobileNet** is a real, pretrained image classifier. It was trained on ImageNet — 1.2 million labeled photos across 1,000 categories (dog breeds, vehicles, foods, instruments, you name it).

It runs **on your computer, in your browser** — no server, no API key, no images sent anywhere. The entire model (about 5 MB) downloads once and lives in memory.

When we ask MobileNet to classify a picture, the same thing happens as in our tiny X-vs-O network — just at a much bigger scale:

- The image is shrunk to **224×224 pixels** (about 50,000 numbers).
- Those numbers flow through **53 layers** of convolutions and dense connections — millions of multiply-and-sum-and-squash operations.
- The output is **1,000 numbers**, one per category. The highest-scoring categories are our top guesses.

The whole thing is the **same neuron math** you've seen, scaled up.

### The hot-swap idea

Instead of writing lessons that depend directly on TensorFlow.js, we hide it behind a tiny interface:

\`\`\`
interface Classifier {
  ready(): Promise<void>;
  classify(image): Promise<Prediction[]>;
}
\`\`\`

The lesson uses \`Classifier\`. The implementation lives in one file. If TF.js breaks or a better library comes out, we replace one file — the lesson keeps working. This is how grown-up codebases keep moving as their dependencies change.`,
  examples: [
    {
      caption: "The Classifier interface (tiny on purpose)",
      code: `// src/ai/classifier.ts
export interface Prediction {
  label: string;
  score: number;       // 0..1
}

export interface Classifier {
  ready(): Promise<void>;
  classify(image): Promise<Prediction[]>;
}`,
      note: "Two methods. That's the whole API. Any image classifier — TF.js, ONNX, transformers.js — can satisfy this."
    },
    {
      caption: "Using a classifier in a lesson",
      code: `import { MobileNetClassifier } from "../ai/classifiers/mobilenet";

const classifier = new MobileNetClassifier();
await classifier.ready();   // downloads model on first use

const img = document.querySelector("img");
const predictions = await classifier.classify(img);

for (const p of predictions) {
  console.log(p.label + ": " + (p.score * 100).toFixed(1) + "%");
}`,
      note: "The lesson code never imports TensorFlow.js. To swap in ONNX, write a new MobileNetClassifier-shaped class — done."
    }
  ],
  playground: { kind: "liveClassifier" },
  exercise: {
    prompt:
      "Open the playground above, load the model, and classify all six preset images. Then in the editor, write a few sentences: which images did the model nail? Which did it get wrong or weird? Why might that be? (Hint: ImageNet has lots of dog breeds and very few cartoon images.)",
    files: {
      js: `// No code to write — this is an observation exercise.
//
// 1. Which images did the model classify confidently and correctly?
//
//
// 2. Which images surprised you with the model's guess?
//
//
// 3. Why do you think the model was wrong (or weird) on those?
//    Hint: think about what kinds of pictures the model has seen
//    during training.
//
`
    },
    hint: "It's totally normal for the model to give 'tabby cat' a 60% score on a picture that's clearly a cat — there are dozens of cat-like categories splitting the probability between them.",
    expectedContains: ["//"]
  }
};
