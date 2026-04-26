import type { Lesson } from "../../types";

export const jsIf: Lesson = {
  id: "js-if",
  trackId: "js",
  title: "If / Else — Making Choices",
  level: 3,
  intro:
    "Code that always does the same thing is boring. With if/else, your program can choose what to do based on a value.",
  concept: `An **if** statement runs some code only when a condition is true:

\`\`\`
let age = 12;
if (age >= 13) {
  console.log("teenager");
}
\`\`\`

Add **else** to do something else when the condition is false:

\`\`\`
if (age >= 13) {
  console.log("teenager");
} else {
  console.log("kid");
}
\`\`\`

The condition lives inside the parentheses. It uses **comparison operators**:

- \`===\` equal to (use three equals signs in JS)
- \`!==\` not equal to
- \`>\`  greater than
- \`<\`  less than
- \`>=\` greater than or equal
- \`<=\` less than or equal

Use **else if** to check more cases in a row:

\`\`\`
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("keep going!");
}
\`\`\``,
  examples: [
    {
      caption: "Simple if/else",
      code: `let weather = "rainy";

if (weather === "sunny") {
  console.log("Wear sunglasses!");
} else {
  console.log("Take an umbrella.");
}`,
      note: "The string \"rainy\" doesn't equal \"sunny\", so the else runs.",
      tryIt: {
        js: `let weather = "rainy";

if (weather === "sunny") {
  console.log("Wear sunglasses!");
} else {
  console.log("Take an umbrella.");
}`
      }
    },
    {
      caption: "Multiple cases with else if",
      code: `let score = 75;

if (score >= 90) {
  console.log("A — amazing!");
} else if (score >= 80) {
  console.log("B — great job!");
} else if (score >= 70) {
  console.log("C — solid.");
} else {
  console.log("Keep practicing.");
}`,
      note: "The first matching branch wins. The others are skipped.",
      tryIt: {
        js: `let score = 75;

if (score >= 90) {
  console.log("A — amazing!");
} else if (score >= 80) {
  console.log("B — great job!");
} else if (score >= 70) {
  console.log("C — solid.");
} else {
  console.log("Keep practicing.");
}`
      }
    },
    {
      caption: "Combine conditions with && and ||",
      code: `let age = 14;
let hasTicket = true;

if (age >= 13 && hasTicket) {
  console.log("Welcome to the show!");
} else {
  console.log("Not today.");
}`,
      note: "&& means AND (both must be true). || means OR (at least one true).",
      tryIt: {
        js: `let age = 14;
let hasTicket = true;

if (age >= 13 && hasTicket) {
  console.log("Welcome to the show!");
} else {
  console.log("Not today.");
}`
      }
    }
  ],
  playground: { kind: "ifelse", language: "js" },
  exercise: {
    prompt:
      "Make a variable temperature with a number. Print 'hot!' if it's above 25, 'chilly' if it's below 10, and 'just right' otherwise.",
    files: {
      js: `let temperature = 18;

// if temperature > 25 print "hot!"
// else if temperature < 10 print "chilly"
// otherwise print "just right"
`
    },
    hint: "Three branches: if, else if, else. Use console.log inside each.",
    expectedContains: ["if (", "else", "console.log"]
  }
};
