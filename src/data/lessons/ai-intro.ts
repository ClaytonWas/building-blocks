import type { Lesson } from "../../types";

export const aiIntro: Lesson = {
  id: "ai-intro",
  trackId: "ai",
  title: "How an AI Predicts the Next Word",
  level: 1,
  intro: "Models like ChatGPT are giant next-word guessers. Let's build a tiny one with JavaScript so you can see how it works.",
  concept: `A transformer model (the kind that powers ChatGPT) is trained on tons of text. It learns which words usually come after which other words. When you give it a sentence, it guesses the next word, adds that word, and repeats.

We can build a *very* tiny version using something called a **Markov chain** — a table that says "after the word *the*, I've seen *cat* 5 times and *dog* 3 times, so *cat* is more likely."

It's not a real transformer (it doesn't pay attention to the whole sentence the way transformers do), but it teaches the same core idea: **predict the next word from what came before**.`,
  examples: [
    {
      caption: "Count which word follows which",
      code: `const text = "the cat sat the cat ran the dog sat";
const words = text.split(" ");

const counts = {};
for (let i = 0; i < words.length - 1; i++) {
  const w = words[i];
  const next = words[i + 1];
  if (!counts[w]) counts[w] = {};
  counts[w][next] = (counts[w][next] || 0) + 1;
}

console.log(counts);`,
      note: "After 'the', we've seen 'cat' twice and 'dog' once. That's the model's whole 'memory'.",
      tryIt: {
        js: `const text = "the cat sat the cat ran the dog sat";
const words = text.split(" ");

const counts = {};
for (let i = 0; i < words.length - 1; i++) {
  const w = words[i];
  const next = words[i + 1];
  if (!counts[w]) counts[w] = {};
  counts[w][next] = (counts[w][next] || 0) + 1;
}

console.log(counts);`
      }
    },
    {
      caption: "Pick the most likely next word",
      code: `const followers = { cat: 2, dog: 1 };
let best = null;
let bestCount = 0;
for (const word in followers) {
  if (followers[word] > bestCount) {
    best = word;
    bestCount = followers[word];
  }
}
console.log("Most likely next word:", best);`,
      note: "Real models use probabilities and randomness, but this is the same idea.",
      tryIt: {
        js: `const followers = { cat: 2, dog: 1 };
let best = null;
let bestCount = 0;
for (const word in followers) {
  if (followers[word] > bestCount) {
    best = word;
    bestCount = followers[word];
  }
}
console.log("Most likely next word:", best);`
      }
    }
  ],
  playground: { kind: "tokenizer" },
  exercise: {
    prompt: "Use the counts table to write a tiny generator: start with a word, then 5 times in a row, look up the most common next word, print it, and move on. (Bonus: pick a random follower instead of always the most common.)",
    files: {
      js: `const text = "the cat sat the cat ran the dog sat the cat sat";
const words = text.split(" ");

const counts = {};
for (let i = 0; i < words.length - 1; i++) {
  const w = words[i];
  const next = words[i + 1];
  if (!counts[w]) counts[w] = {};
  counts[w][next] = (counts[w][next] || 0) + 1;
}

let current = "the";
console.log(current);

// Loop 5 times: find the most common next word for current,
// print it, then make it the new current.
`
    },
    hint: "Inside the loop, look at counts[current], pick the word with the biggest count, print it, then set current = that word.",
    expectedContains: ["counts", "console.log", "for"]
  }
};
