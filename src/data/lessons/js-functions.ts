import type { Lesson } from "../../types";

export const jsFunctions: Lesson = {
  id: "js-functions",
  trackId: "js",
  title: "Functions — Reusable Code",
  level: 8,
  intro:
    "A function is a chunk of code with a name. You write it once and *call* it as many times as you want, with different inputs.",
  concept: `Here's the shape of a function:

\`\`\`
function double(n) {
  return n * 2;
}
\`\`\`

Three things to spot:

- The **name** — \`double\`. It's a label for the chunk.
- The **parameters** — \`n\`. Names for the inputs.
- The **return** value — what the function gives back to whoever called it.

To use a function, **call** it with a value:

\`\`\`
double(5);   // 10
double(7);   // 14
\`\`\`

Every time you call \`double(...)\`, it runs with the value you passed in. The variable \`n\` only exists inside the function — it's a fresh local box for each call.

Functions can take more than one input:

\`\`\`
function add(a, b) {
  return a + b;
}
add(3, 4);   // 7
\`\`\``,
  examples: [
    {
      caption: "Define and call",
      code: `function double(n) {
  return n * 2;
}

console.log(double(5));
console.log(double(10));
console.log(double(100));`,
      note: "Same function, three different inputs, three different outputs.",
      tryIt: {
        js: `function double(n) {
  return n * 2;
}

console.log(double(5));
console.log(double(10));
console.log(double(100));`
      }
    },
    {
      caption: "Two parameters",
      code: `function greet(name, mood) {
  return "Hi, " + name + "! Are you " + mood + "?";
}

console.log(greet("Ada", "happy"));
console.log(greet("Linus", "tired"));`,
      note: "Pass in two arguments, the function uses both.",
      tryIt: {
        js: `function greet(name, mood) {
  return "Hi, " + name + "! Are you " + mood + "?";
}

console.log(greet("Ada", "happy"));
console.log(greet("Linus", "tired"));`
      }
    },
    {
      caption: "Functions inside loops",
      code: `function shout(text) {
  return text.toUpperCase() + "!";
}

const words = ["hello", "world", "code"];
for (const w of words) {
  console.log(shout(w));
}`,
      note: "Functions and loops are best friends. Define the action once, run it many times.",
      tryIt: {
        js: `function shout(text) {
  return text.toUpperCase() + "!";
}

const words = ["hello", "world", "code"];
for (const w of words) {
  console.log(shout(w));
}`
      }
    }
  ],
  playground: { kind: "function" },
  exercise: {
    prompt:
      "Write a function called bigger(a, b) that returns whichever number is larger. Then call it three times with different number pairs and print the results.",
    files: {
      js: `// Write your function here:
function bigger(a, b) {
  // return the bigger one
}

// Call bigger three times and print each result
`
    },
    hint: "Use an if statement: if (a > b) return a; else return b. Or the shortcut: return a > b ? a : b;",
    expectedContains: ["function bigger", "return", "console.log"]
  }
};
