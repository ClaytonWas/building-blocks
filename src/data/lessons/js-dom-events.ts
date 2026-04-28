import type { Lesson } from "../../types";

export const jsDomEvents: Lesson = {
  id: "js-dom-events",
  trackId: "js",
  title: "Make Things Happen",
  level: 10,
  intro:
    "Pages are static until you wire them up. Events are how JavaScript reacts to clicks, typing, and other things the user does.",
  concept: `Once you have an element (say, a button), you can listen for **events** on it. The most common is \`click\`.

\`\`\`
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  console.log('clicked!');
});
\`\`\`

That second argument — \`() => { ... }\` — is a function. Every time the button is clicked, the browser runs that function. Now everything you've learned (variables, conditionals, loops, functions) can react to a real user.

Other events you'll see often:

- \`'click'\` — element clicked
- \`'input'\` — user typed in a text field
- \`'mouseenter'\` / \`'mouseleave'\` — pointer entered or left the element

Inside the handler, the code can do anything: change \`.textContent\`, add classes, run a calculation, save to a list. The page becomes alive.`,
  examples: [
    {
      caption: "A click counter",
      code: `let count = 0;
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  count = count + 1;
  btn.textContent = "Clicked " + count;
});`,
      note: "Every click increments count and updates the button's text. The variable lives outside the handler so it's remembered across clicks."
    },
    {
      caption: "Toggle a class",
      code: `const box = document.querySelector('.box');
box.addEventListener('click', () => {
  box.classList.toggle('big');
});`,
      note: ".classList.toggle adds the class if it's missing, removes it if it's there. Pair with CSS to make a box grow on click."
    }
  ],
  playground: { kind: "domEvent" },
  fileTypes: ["html", "js"],
  exercise: {
    prompt:
      "Wire up the button so clicking it counts how many times it's been clicked, and updates the heading text to show the count. Use addEventListener and textContent.",
    files: {
      html: `<h1>Click count: 0</h1>
<button>Click me</button>`,
      js: `let count = 0;
const heading = document.querySelector('h1');
const btn = document.querySelector('button');

// add a click event listener that:
//   increments count
//   updates heading.textContent to "Click count: " + count
`
    },
    hint: "btn.addEventListener('click', () => { ... }) is the shape. Inside the function: count = count + 1; heading.textContent = 'Click count: ' + count;",
    expectedContains: ["addEventListener", "click", "textContent"]
  }
};
