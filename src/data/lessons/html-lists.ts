import type { Lesson } from "../../types";

export const htmlLists: Lesson = {
  id: "html-lists",
  trackId: "html",
  title: "Lists and Links",
  level: 3,
  intro:
    "Lists let you stack items on top of each other. Links let you jump from page to page. Together they're how every website is organized.",
  concept: `A **list** is a group of items. HTML has two main kinds:

- \`<ul>\` is an *unordered list* — bullet points, no special order.
- \`<ol>\` is an *ordered list* — numbered, like steps in a recipe.

Each item inside the list is wrapped in \`<li>\` (list item).

A **link** is made with \`<a>\`. The \`href\` attribute tells the browser where to go.

\`\`\`
<a href="https://example.com">Visit example</a>
\`\`\``,
  examples: [
    {
      caption: "An unordered list of foods",
      code: `<ul>
  <li>Pizza</li>
  <li>Tacos</li>
  <li>Sushi</li>
</ul>`,
      note: "Each <li> is one bullet. The browser draws the dots automatically."
    },
    {
      caption: "An ordered list of steps",
      code: `<ol>
  <li>Wake up</li>
  <li>Brush teeth</li>
  <li>Eat breakfast</li>
</ol>`,
      note: "Same idea, but the browser numbers them 1, 2, 3."
    },
    {
      caption: "A list of links",
      code: `<ul>
  <li><a href="https://en.wikipedia.org/wiki/HTML">About HTML</a></li>
  <li><a href="https://en.wikipedia.org/wiki/CSS">About CSS</a></li>
</ul>`,
      note: "You can put any tag inside an <li> — including links."
    }
  ],
  exercise: {
    prompt:
      "Make a small page with: a heading, an unordered list of three things you like, and an ordered list of three steps for making a sandwich. Add at least one link somewhere.",
    files: {
      html: `<h1>My favorites</h1>

<ul>
  <li>Item 1</li>
</ul>

<h2>How to make a sandwich</h2>

<ol>
  <li>Step 1</li>
</ol>
`
    },
    hint: "Inside an <li>, you can put plain text or wrap text in <a href=\"...\">link text</a>.",
    expectedContains: ["<ul>", "<ol>", "<li>", "<a "]
  }
};
