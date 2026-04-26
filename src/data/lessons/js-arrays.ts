import type { Lesson } from "../../types";

export const jsArrays: Lesson = {
  id: "js-arrays",
  trackId: "js",
  title: "Arrays — Lists of Things",
  level: 5,
  intro:
    "An array is a list of things in a specific order. You can add, remove, count, and transform the things inside.",
  concept: `Here is an array:

\`\`\`
let fruits = ["apple", "banana", "cherry"];
\`\`\`

Each thing inside is called an **item**. Items are numbered starting at 0 (yes, zero), so \`fruits[0]\` is "apple" and \`fruits[1]\` is "banana".

Arrays come with built-in **methods**:

- \`.length\` — how many items
- \`.push(x)\` — add x to the end
- \`.pop()\` — remove the last item
- \`.includes(x)\` — true/false if x is inside
- \`.map(fn)\` — make a new array by transforming each item`,
  examples: [
    {
      caption: "Read items by index",
      code: `let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);
console.log(fruits[2]);
console.log(fruits.length);`,
      note: "Index 0 is the first item. .length tells you the count (here, 3).",
      tryIt: {
        js: `let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);
console.log(fruits[2]);
console.log(fruits.length);`
      }
    },
    {
      caption: "Add and remove items",
      code: `let pets = ["dog", "cat"];
pets.push("hamster");
console.log(pets);

let last = pets.pop();
console.log("Removed:", last);
console.log(pets);`,
      note: ".push adds to the end. .pop removes the last and gives it back to you.",
      tryIt: {
        js: `let pets = ["dog", "cat"];
pets.push("hamster");
console.log(pets);

let last = pets.pop();
console.log("Removed:", last);
console.log(pets);`
      }
    },
    {
      caption: "Transform every item",
      code: `let numbers = [1, 2, 3, 4];
let doubled = numbers.map((n) => n * 2);
console.log(doubled);`,
      note: ".map runs your little function on each item and gives back a new array.",
      tryIt: {
        js: `let numbers = [1, 2, 3, 4];
let doubled = numbers.map((n) => n * 2);
console.log(doubled);`
      }
    }
  ],
  playground: { kind: "array", language: "js" },
  exercise: {
    prompt:
      "Make an array of your three favorite snacks. Print the first one. Add a fourth snack with .push. Print how many snacks you have. Then use .map to make a new array where every snack is in ALL CAPS, and print it.",
    files: {
      js: `let snacks = ["chips", "cookies", "popcorn"];

// 1. Print the first snack

// 2. Add a fourth snack to the end

// 3. Print how many snacks there are

// 4. Use .map and .toUpperCase() to print them all in caps
`
    },
    hint: "Inside .map((s) => ...), you can return s.toUpperCase().",
    expectedContains: ["console.log", ".push", ".map", ".length"]
  }
};
