import type { Lesson } from "../../types";

export const aiSampling: Lesson = {
  id: "ai-sampling",
  trackId: "ai",
  title: "Temperature — How Creative is the Model?",
  level: 2,
  intro:
    "Real AI models have a knob called *temperature*. Turn it down and they're predictable. Turn it up and they're wild. Same model — totally different feel.",
  concept: `Remember the next-word predictor from the first AI lesson? When the model wants to pick the next word, it has options. After "the cat" it might have seen "sat" 5 times, "ran" 3 times, and "slept" 1 time.

There are different ways to **pick** which word comes next:

- **Predictable** (temperature = 0): always pick the most common one ("sat"). The model never surprises you, but it gets repetitive.
- **Balanced** (temperature ≈ 0.5): roll a weighted die. Common words are more likely, rare words occasionally win.
- **Wild** (temperature = 1): pick any follower at random. Surprising, often weird.

Real models use math to smooth between these — but the idea is the same: **temperature controls how willing the model is to pick something other than its first choice.**

Below is the same Markov-chain trick from before, but with three different sampling modes you can flip between.`,
  examples: [
    {
      caption: "Always pick the most common follower",
      code: `function mostCommon(followers) {
  let best = null;
  let bestCount = 0;
  for (const word in followers) {
    if (followers[word] > bestCount) {
      best = word;
      bestCount = followers[word];
    }
  }
  return best;
}`,
      note: "This is temperature = 0. Same input, same output, every time.",
      tryIt: {
        js: `const followers = { sat: 5, ran: 3, slept: 1 };

function mostCommon(followers) {
  let best = null;
  let bestCount = 0;
  for (const word in followers) {
    if (followers[word] > bestCount) {
      best = word;
      bestCount = followers[word];
    }
  }
  return best;
}

console.log(mostCommon(followers));`
      }
    },
    {
      caption: "Pick a follower at random",
      code: `function wild(followers) {
  const words = Object.keys(followers);
  const i = Math.floor(Math.random() * words.length);
  return words[i];
}`,
      note: "This is temperature = 1. Run it many times — every word with any count gets a fair shot.",
      tryIt: {
        js: `const followers = { sat: 5, ran: 3, slept: 1 };

function wild(followers) {
  const words = Object.keys(followers);
  const i = Math.floor(Math.random() * words.length);
  return words[i];
}

for (let i = 0; i < 5; i++) {
  console.log(wild(followers));
}`
      }
    },
    {
      caption: "Weighted random — common words win more",
      code: `function balanced(followers) {
  const entries = Object.entries(followers);
  const total = entries.reduce((s, e) => s + e[1], 0);
  let r = Math.random() * total;
  for (const [word, count] of entries) {
    r -= count;
    if (r <= 0) return word;
  }
}`,
      note: "Each word's chance is proportional to its count. 'sat' (count 5) wins ~5/9 of the time.",
      tryIt: {
        js: `const followers = { sat: 5, ran: 3, slept: 1 };

function balanced(followers) {
  const entries = Object.entries(followers);
  const total = entries.reduce((s, e) => s + e[1], 0);
  let r = Math.random() * total;
  for (const [word, count] of entries) {
    r -= count;
    if (r <= 0) return word;
  }
}

for (let i = 0; i < 10; i++) {
  console.log(balanced(followers));
}`
      }
    }
  ],
  playground: { kind: "sampling" },
  exercise: {
    prompt:
      "Use the wild() function below. Call it 20 times in a loop and count how many times each follower wins. Print the totals at the end.",
    files: {
      js: `const followers = { sat: 5, ran: 3, slept: 1 };

function wild(followers) {
  const words = Object.keys(followers);
  const i = Math.floor(Math.random() * words.length);
  return words[i];
}

const counts = { sat: 0, ran: 0, slept: 0 };

// Loop 20 times. Each round, call wild(followers).
// Add 1 to counts[result].

// At the end, console.log(counts).
`
    },
    hint: "Use a for loop (i = 0; i < 20; i++). Inside: const w = wild(followers); counts[w] = counts[w] + 1;",
    expectedContains: ["for (", "wild(followers)", "counts", "console.log"]
  }
};
