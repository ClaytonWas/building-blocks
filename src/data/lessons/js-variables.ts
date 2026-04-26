import type { Lesson } from "../../types";

export const jsVariables: Lesson = {
  id: "js-variables",
  trackId: "js",
  title: "Variables and Types",
  level: 1,
  intro:
    "Before we can do much with code, we need a place to keep things. A variable is a labeled box that holds a value.",
  concept: `In JavaScript you make a variable with \`let\`:

\`\`\`
let age = 12;
\`\`\`

The label is \`age\`. The value is \`12\`. Later you can read it (\`age\`) or change it (\`age = 13\`).

If you know the value will never change, you can use \`const\` instead of \`let\`. \`const\` is a promise: "I won't reassign this."

\`\`\`
const PI = 3.14;
\`\`\`

Variables can hold all kinds of values:

- **numbers** — \`12\`, \`3.14\`, \`-7\`
- **strings** — text, like \`"hello"\`
- **booleans** — true / false
- **arrays** — lists like \`[1, 2, 3]\`
- **objects** — labeled boxes like \`{ name: "Ada" }\`
- **null** — "nothing on purpose"

To check what kind of value a variable holds, use \`typeof\`:

\`\`\`
typeof 12      // "number"
typeof "hi"    // "string"
typeof true    // "boolean"
\`\`\``,
  examples: [
    {
      caption: "Make a variable and change it",
      code: `let score = 0;
console.log(score);

score = score + 1;
console.log(score);`,
      note: "Read the value, change it, read it again. The label stays the same; the value moves.",
      tryIt: {
        js: `let score = 0;
console.log(score);

score = score + 1;
console.log(score);`
      }
    },
    {
      caption: "Different types side by side",
      code: `let name = "Ada";
let age = 12;
let likesPizza = true;

console.log(name, typeof name);
console.log(age, typeof age);
console.log(likesPizza, typeof likesPizza);`,
      note: "typeof gives back a string telling you the type. Try other values!",
      tryIt: {
        js: `let name = "Ada";
let age = 12;
let likesPizza = true;

console.log(name, typeof name);
console.log(age, typeof age);
console.log(likesPizza, typeof likesPizza);`
      }
    },
    {
      caption: "const promises not to change",
      code: `const greeting = "hello";
console.log(greeting);

// Uncomment the next line to see an error:
// greeting = "bye";`,
      note: "If you try to reassign a const, JavaScript stops you. That's the point.",
      tryIt: {
        js: `const greeting = "hello";
console.log(greeting);

// Uncomment the next line to see an error:
// greeting = "bye";`
      }
    }
  ],
  playground: { kind: "type" },
  exercise: {
    prompt:
      "Make four variables: one number, one string, one boolean, and one array of your favorite three colors. Print each one along with its type.",
    files: {
      js: `// 1. A number

// 2. A string

// 3. A boolean (true or false)

// 4. An array of three colors

// Print each one with typeof, like:
// console.log(myThing, typeof myThing);
`
    },
    hint: "console.log can take more than one thing — separate them with commas.",
    expectedContains: ["let ", "console.log", "typeof"]
  }
};
