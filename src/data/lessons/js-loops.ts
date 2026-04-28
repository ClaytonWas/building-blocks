import type { Lesson } from "../../types";

export const jsLoops: Lesson = {
  id: "js-loops",
  trackId: "js",
  title: "Loops — Do It Again",
  level: 6,
  intro:
    "Loops are how a computer does the same thing over and over without copy-pasting. There are three flavors you'll meet first.",
  concept: `If you wanted to print "hi" five times, you *could* type \`console.log("hi")\` five times. But that's tedious. A **loop** does it for you.

**Counter loop** — the one you'll see most:

\`\`\`
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
\`\`\`

The three parts inside the parentheses mean: *start at 1*, *keep going while i is at most 5*, *after each round add 1 to i*.

**For-of loop** — walk through the items in an array:

\`\`\`
for (const fruit of ["apple", "banana", "cherry"]) {
  console.log(fruit);
}
\`\`\`

**While loop** — keep going as long as a condition is true:

\`\`\`
let i = 0;
while (i < 8) {
  console.log(i);
  i = i + 2;
}
\`\`\`

If you forget to change \`i\` inside a while loop, it runs forever — be careful.`,
  examples: [
    {
      caption: "Count 1 to 5",
      code: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
      note: "i starts at 1. After each round i grows by 1. The loop stops when i becomes 6.",
      tryIt: {
        js: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`
      }
    },
    {
      caption: "Greet each person",
      code: `const friends = ["Ada", "Linus", "Grace"];
for (const friend of friends) {
  console.log("Hi, " + friend + "!");
}`,
      note: "for...of is the friendliest way to walk an array. You don't need indexes.",
      tryIt: {
        js: `const friends = ["Ada", "Linus", "Grace"];
for (const friend of friends) {
  console.log("Hi, " + friend + "!");
}`
      }
    },
    {
      caption: "While the door is closed",
      code: `let knocks = 0;
while (knocks < 3) {
  console.log("knock knock!");
  knocks = knocks + 1;
}
console.log("Door opened after " + knocks + " knocks.");`,
      note: "while keeps repeating until the condition becomes false. Don't forget to update the variable inside!",
      tryIt: {
        js: `let knocks = 0;
while (knocks < 3) {
  console.log("knock knock!");
  knocks = knocks + 1;
}
console.log("Door opened after " + knocks + " knocks.");`
      }
    }
  ],
  playground: { kind: "loop", language: "js" },
  exercise: {
    prompt:
      "Print the numbers from 1 to 10 using a for loop. Then make an array of three foods and use for...of to print 'I like ___' for each one.",
    files: {
      js: `// 1. for loop: print 1 through 10

// 2. an array of three foods, then for...of to print each as "I like ___"
`
    },
    hint: "Inside the for...of body, build the message with the + operator: \"I like \" + food",
    expectedContains: ["for (", "for (const", "console.log"]
  }
};
