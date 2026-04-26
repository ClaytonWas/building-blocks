import type { Lesson } from "../../types";

export const aiEmbeddings: Lesson = {
  id: "ai-embeddings",
  trackId: "ai",
  title: "Embeddings — Words as Numbers",
  level: 3,
  intro:
    "Computers don't understand words. They only understand numbers. So how does an AI know that 'cat' and 'dog' mean similar things? It turns words into points in space.",
  concept: `Imagine a giant map. Every word in the dictionary lives somewhere on that map. Words with similar meanings sit close to each other.

- *cat*, *dog*, *bird*, *fish* — clustered in one corner (animals)
- *apple*, *banana*, *cherry* — in another corner (fruits)
- *car*, *train*, *bike* — somewhere else (vehicles)

That position — the (x, y) coordinates of the word on the map — is called an **embedding**. Real models use hundreds of dimensions (not just two), but the idea is the same: each word is a list of numbers.

Once words are numbers, you can do math with them. The most useful math is **distance**: how far apart are two words?

\`\`\`
const dx = a.x - b.x;
const dy = a.y - b.y;
const distance = Math.sqrt(dx * dx + dy * dy);
\`\`\`

Two words with a small distance are similar. Two words with a big distance are different.

This is the secret behind a *lot* of AI: search engines, recommendation systems, language models — they all use embeddings to figure out "what's similar to what."`,
  examples: [
    {
      caption: "Distance between two points",
      code: `const cat = { x: 90, y: 70 };
const dog = { x: 130, y: 90 };

const dx = cat.x - dog.x;
const dy = cat.y - dog.y;
const distance = Math.sqrt(dx * dx + dy * dy);

console.log(distance);`,
      note: "Same formula you'd use to measure distance on a map. The smaller the number, the more similar the words.",
      tryIt: {
        js: `const cat = { x: 90, y: 70 };
const dog = { x: 130, y: 90 };

const dx = cat.x - dog.x;
const dy = cat.y - dog.y;
const distance = Math.sqrt(dx * dx + dy * dy);

console.log(distance);`
      }
    },
    {
      caption: "Find the nearest word",
      code: `const words = [
  { text: "cat",   x: 90,  y: 70  },
  { text: "dog",   x: 130, y: 90  },
  { text: "apple", x: 350, y: 60  },
  { text: "car",   x: 100, y: 220 }
];

const target = { x: 90, y: 70 }; // cat's position

let nearest = null;
let bestDist = Infinity;
for (const w of words) {
  if (w.text === "cat") continue; // skip cat itself
  const dx = w.x - target.x;
  const dy = w.y - target.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < bestDist) {
    nearest = w.text;
    bestDist = d;
  }
}

console.log("Nearest to cat:", nearest);`,
      note: "Walk every word, compute its distance, keep the smallest. This is how 'most similar word' search works.",
      tryIt: {
        js: `const words = [
  { text: "cat",   x: 90,  y: 70  },
  { text: "dog",   x: 130, y: 90  },
  { text: "apple", x: 350, y: 60  },
  { text: "car",   x: 100, y: 220 }
];

const target = { x: 90, y: 70 }; // cat's position

let nearest = null;
let bestDist = Infinity;
for (const w of words) {
  if (w.text === "cat") continue;
  const dx = w.x - target.x;
  const dy = w.y - target.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < bestDist) {
    nearest = w.text;
    bestDist = d;
  }
}

console.log("Nearest to cat:", nearest);`
      }
    }
  ],
  playground: { kind: "embedding" },
  exercise: {
    prompt:
      "Using the words array below, write code that prints the distance between every pair of words. Use two nested for loops. Bonus: only print pairs where the distance is less than 80.",
    files: {
      js: `const words = [
  { text: "cat",   x: 90,  y: 70  },
  { text: "dog",   x: 130, y: 90  },
  { text: "apple", x: 350, y: 60  },
  { text: "car",   x: 100, y: 220 }
];

// Loop through every pair (i, j) where i < j
// Compute the distance between words[i] and words[j]
// Print it like: "cat <-> dog: 44.7"
`
    },
    hint: "Outer loop: for (let i = 0; i < words.length; i++). Inner loop: for (let j = i + 1; j < words.length; j++). That gives every pair once.",
    expectedContains: ["for (", "Math.sqrt", "console.log"]
  }
};
