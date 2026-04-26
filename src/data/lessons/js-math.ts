import type { Lesson } from "../../types";

export const jsMath: Lesson = {
  id: "js-math",
  trackId: "js",
  title: "Math and Random — Build a Game",
  level: 4,
  intro:
    "Numbers, math, and a little bit of randomness — together they unlock dice, name pickers, simple games, and most of the fun stuff in code.",
  concept: `JavaScript can do all the basic math you'd expect:

\`\`\`
2 + 3       // 5
10 - 4      // 6
3 * 7       // 21
20 / 5      // 4
17 % 5      // 2  (remainder)
\`\`\`

The \`%\` (modulo) gives the *remainder* after dividing — super useful for "is it even?" or "every nth time."

The built-in **Math** object has helpers:

- \`Math.random()\` — a random number between 0 and 1
- \`Math.floor(x)\` — round down to a whole number
- \`Math.ceil(x)\`  — round up
- \`Math.round(x)\` — round to nearest
- \`Math.max(a, b)\` and \`Math.min(a, b)\`

To get a random whole number from 1 to N:

\`\`\`
Math.floor(Math.random() * N) + 1
\`\`\`

That's the magic line behind every dice roll, every random color, every "pick a card."`,
  examples: [
    {
      caption: "Roll a six-sided die",
      code: `let roll = Math.floor(Math.random() * 6) + 1;
console.log("You rolled a " + roll);`,
      note: "Math.random() gives 0–0.999..., times 6 gives 0–5.999..., floor makes 0–5, +1 makes 1–6.",
      tryIt: {
        js: `let roll = Math.floor(Math.random() * 6) + 1;
console.log("You rolled a " + roll);`
      }
    },
    {
      caption: "Pick a random friend from a list",
      code: `const friends = ["Ada", "Linus", "Grace", "Alan", "Hedy"];
let i = Math.floor(Math.random() * friends.length);
console.log("Today's lunch buddy: " + friends[i]);`,
      note: "friends.length is 5, so i lands on 0–4 — exactly the valid array indexes.",
      tryIt: {
        js: `const friends = ["Ada", "Linus", "Grace", "Alan", "Hedy"];
let i = Math.floor(Math.random() * friends.length);
console.log("Today's lunch buddy: " + friends[i]);`
      }
    },
    {
      caption: "A tiny number-guessing game",
      code: `const secret = Math.floor(Math.random() * 10) + 1;
const guess = 7;

if (guess === secret) {
  console.log("Correct! It was " + secret);
} else if (guess < secret) {
  console.log("Too low. The number was " + secret);
} else {
  console.log("Too high. The number was " + secret);
}`,
      note: "Math + Random + If/Else = a real game. Run it a few times to see the secret change.",
      tryIt: {
        js: `const secret = Math.floor(Math.random() * 10) + 1;
const guess = 7;

if (guess === secret) {
  console.log("Correct! It was " + secret);
} else if (guess < secret) {
  console.log("Too low. The number was " + secret);
} else {
  console.log("Too high. The number was " + secret);
}`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a coin flip. Get a random number 0 or 1. If it's 0, print 'Heads!'; otherwise, print 'Tails!'. Then flip it 5 times in a row using a loop.",
    files: {
      js: `// One coin flip:
// let flip = Math.floor(Math.random() * 2);
// if flip is 0 print "Heads!" else print "Tails!"

// Now do it 5 times in a loop:
`
    },
    hint: "for (let i = 0; i < 5; i++) { ... } repeats the body five times.",
    expectedContains: ["Math.random", "Math.floor", "if (", "for ("]
  }
};
