import type { Lesson } from "../../types";

export const jsObjects: Lesson = {
  id: "js-objects",
  trackId: "js",
  title: "Objects — Labeled Boxes",
  level: 5,
  intro:
    "An array is a list. An object is a labeled box. Instead of position numbers, each value has a name (called a key).",
  concept: `Here is an object:

\`\`\`
let person = {
  name: "Ada",
  age: 12,
  likesPizza: true
};
\`\`\`

Each label (\`name\`, \`age\`, \`likesPizza\`) is a **key**. Each thing it points to is a **value**.

You read a value with a dot:

\`\`\`
console.log(person.name);
\`\`\`

You can change a value the same way:

\`\`\`
person.age = 13;
\`\`\`

Objects come with helpful tools too:
- \`Object.keys(obj)\` — array of all the labels
- \`Object.values(obj)\` — array of all the values`,
  examples: [
    {
      caption: "Read and change values",
      code: `let dog = {
  name: "Pixel",
  breed: "corgi",
  age: 4
};

console.log(dog.name);
dog.age = dog.age + 1;
console.log("Happy birthday!", dog.name, "is now", dog.age);`,
      note: "We read dog.age, add one, and store it back. Like updating a sticker on a labeled box.",
      tryIt: {
        js: `let dog = {
  name: "Pixel",
  breed: "corgi",
  age: 4
};

console.log(dog.name);
dog.age = dog.age + 1;
console.log("Happy birthday!", dog.name, "is now", dog.age);`
      }
    },
    {
      caption: "List all the labels",
      code: `let car = {
  color: "red",
  wheels: 4,
  brand: "Toyota"
};

console.log(Object.keys(car));
console.log(Object.values(car));`,
      note: "Object.keys gives you the labels; Object.values gives you what's in each box.",
      tryIt: {
        js: `let car = {
  color: "red",
  wheels: 4,
  brand: "Toyota"
};

console.log(Object.keys(car));
console.log(Object.values(car));`
      }
    }
  ],
  playground: { kind: "object", language: "js" },
  exercise: {
    prompt:
      "Build an object that describes you: keys for name, age, and favoriteColor. Print your name. Add a new key called grade. Then print all the keys with Object.keys.",
    files: {
      js: `let me = {
  name: "Your name",
  age: 0,
  favoriteColor: "blue"
};

// 1. Print your name

// 2. Add a 'grade' key (try me.grade = 5)

// 3. Print all the keys with Object.keys
`
    },
    hint: "To add a new key, just write me.grade = 5; — it appears as a new label.",
    expectedContains: ["console.log", "Object.keys", "me.grade"]
  }
};
