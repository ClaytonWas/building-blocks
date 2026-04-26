import type { Lesson } from "../../types";

export const jsStrings: Lesson = {
  id: "js-strings",
  trackId: "js",
  title: "Strings — Words in Code",
  level: 2,
  intro: "A string is just text. Anything inside quotes is a string. Computers can do all sorts of cool things with strings.",
  concept: `Here is a string:

\`\`\`
"hello world"
\`\`\`

That's it! Any text inside quotes is a string. We can save a string in a **variable** so we can use it later:

\`\`\`
let greeting = "hello world";
\`\`\`

Strings come with built-in **methods** — little tools that change or check the string. You call them with a dot: \`greeting.toUpperCase()\`.`,
  examples: [
    {
      caption: "Make a string LOUD",
      code: `let greeting = "hello world";
console.log(greeting.toUpperCase());`,
      note: ".toUpperCase() makes every letter big. Open the output panel to see the result.",
      tryIt: {
        js: `let greeting = "hello world";
console.log(greeting.toUpperCase());`
      }
    },
    {
      caption: "How long is a string?",
      code: `let name = "Ada";
console.log(name.length);`,
      note: ".length tells you how many characters are in the string. (It's 3 for 'Ada'.)",
      tryIt: {
        js: `let name = "Ada";
console.log(name.length);`
      }
    },
    {
      caption: "Glue strings together",
      code: `let first = "Peanut";
let second = "Butter";
console.log(first + " " + second);`,
      note: "The + sign sticks strings together. The \" \" in the middle adds a space.",
      tryIt: {
        js: `let first = "Peanut";
let second = "Butter";
console.log(first + " " + second);`
      }
    }
  ],
  playground: { kind: "string", language: "js", initial: "Building Blocks" },
  exercise: {
    prompt: "Make your own string and try at least three different things on it: shout it with .toUpperCase(), find its .length, and glue it onto another word with +. Use console.log to print each result.",
    files: {
      js: `let myString = "building blocks";

// 1. Print it in all caps

// 2. Print how long it is

// 3. Glue another word onto it and print it
`
    },
    hint: "Each line should start with console.log(...). Put what you want to print inside the parentheses.",
    expectedContains: ["console.log", ".toUpperCase", ".length"]
  }
};
