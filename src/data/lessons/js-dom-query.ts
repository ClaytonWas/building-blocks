import type { Lesson } from "../../types";

export const jsDomQuery: Lesson = {
  id: "js-dom-query",
  trackId: "js",
  title: "Find Something on the Page",
  level: 9,
  intro:
    "Up till now, your JavaScript has just made numbers and strings appear in the console. Real web JS reaches into the page and changes it. Here's how.",
  concept: `When the browser reads HTML, it builds an invisible tree of objects called the **DOM** (Document Object Model). Every tag becomes an object you can read, change, or remove with JavaScript.

To grab one of those objects, you use \`document.querySelector\`. You give it a CSS-style selector (a tag name, a class, or an id) and you get back the first matching element.

\`\`\`
const heading = document.querySelector('h1');
console.log(heading.textContent);  // "Hello"
heading.textContent = "Hi!";        // changes the page
\`\`\`

Once you have an element, you can:

- Read or change its text with \`.textContent\`
- Change its styling with \`.style.color\`, \`.style.fontSize\`, etc.
- Add or remove classes with \`.classList\`

This is the bridge between the JavaScript you've been writing and the page the user actually sees.`,
  examples: [
    {
      caption: "Change a heading",
      code: `const h = document.querySelector('h1');
h.textContent = "I changed it!";`,
      note: "querySelector picks the FIRST matching element. textContent is the text inside the tag."
    },
    {
      caption: "Make a paragraph red",
      code: `const note = document.querySelector('.note');
note.style.color = 'red';`,
      note: ".style.color is the same as writing color: red in CSS — but from JavaScript, on demand."
    },
    {
      caption: "Use an id",
      code: `const btn = document.querySelector('#go');
btn.textContent = "Let's go";`,
      note: "An id starts with #. Each id is supposed to be unique on the page, so you usually get exactly the one you wanted."
    }
  ],
  playground: { kind: "domQuery" },
  fileTypes: ["html", "js"],
  exercise: {
    prompt:
      "Use querySelector on each element and change something. (1) Change the h1 text. (2) Make the .warning paragraph red. (3) Change the button's text.",
    files: {
      html: `<h1>My Page</h1>
<p>Welcome here.</p>
<p class="warning">Be careful!</p>
<button id="go">Click me</button>`,
      js: `// 1. change the h1 text
// document.querySelector('h1').textContent = '???';

// 2. make the .warning paragraph red
// document.querySelector('.warning').style.color = '???';

// 3. change the button text
// document.querySelector('#go').textContent = '???';
`
    },
    hint: "querySelector takes a CSS-style selector. 'h1' matches the h1 tag, '.warning' matches the warning class, '#go' matches id=go.",
    expectedContains: ["querySelector", "textContent"]
  }
};
