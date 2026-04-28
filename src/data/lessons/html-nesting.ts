import type { Lesson } from "../../types";

export const htmlNesting: Lesson = {
  id: "html-nesting",
  trackId: "html",
  title: "Tags Within Tags",
  level: 2,
  intro:
    "Tags don't just sit next to each other — they can hold other tags inside them. That's how every web page is built: little boxes nested inside bigger boxes.",
  concept: `A tag can wrap other tags. When that happens, we say the inner tags are **inside** or **children of** the outer tag.

\`\`\`
<div>
  <h1>Hello</h1>
  <p>I'm inside a div.</p>
</div>
\`\`\`

The browser builds the page like a tree. The \`<div>\` is the parent. The \`<h1>\` and \`<p>\` are its children. They show up *inside* the div on the page.

The \`<div>\` tag is the most general container — it doesn't mean anything special on its own, it's just a box you can put things in. We use it to group related content together.

There are also containers that *do* mean something:

- **\`<header>\`** — the top of a page or section
- **\`<main>\`** — the main content
- **\`<footer>\`** — the bottom
- **\`<section>\`** — a section of related stuff

These look exactly like \`<div>\` to the eye, but they tell screen readers and search engines what each part of the page is for. Use them when you can; fall back to \`<div>\` when nothing else fits.`,
  examples: [
    {
      caption: "A heading and a paragraph in a div",
      code: `<div>
  <h1>About me</h1>
  <p>I like pizza and pugs.</p>
</div>`,
      note: "Indenting the inner tags two spaces is a habit, not a rule. The browser doesn't care, but it's much easier to read.",
      tryIt: {
        html: `<div>
  <h1>About me</h1>
  <p>I like pizza and pugs.</p>
</div>`
      }
    },
    {
      caption: "Two cards, each in its own div",
      code: `<div>
  <h2>Card one</h2>
  <p>First card's text.</p>
</div>
<div>
  <h2>Card two</h2>
  <p>Second card's text.</p>
</div>`,
      note: "Both cards have the same shape. Putting things in their own div is the start of making reusable pieces of a page.",
      tryIt: {
        html: `<div>
  <h2>Card one</h2>
  <p>First card's text.</p>
</div>
<div>
  <h2>Card two</h2>
  <p>Second card's text.</p>
</div>`
      }
    },
    {
      caption: "Using header, main, and footer",
      code: `<header>
  <h1>My Site</h1>
</header>
<main>
  <p>This is the main content.</p>
</main>
<footer>
  <p>Made by me, 2026.</p>
</footer>`,
      note: "On the page these look the same as three divs — but the tag names tell anyone reading the HTML what each part is."
    }
  ],
  exercise: {
    prompt:
      "Build a page with a header containing a heading, a main section with two cards (each card is a div with an h2 and a p), and a footer with your name.",
    files: {
      html: `<header>
  <h1>Your title</h1>
</header>

<main>
  <!-- two cards go here -->
</main>

<footer>
  <p>By: ???</p>
</footer>
`
    },
    hint: "Each card looks like: <div><h2>...</h2><p>...</p></div>. Put two of those inside <main>.",
    expectedContains: ["<header>", "<main>", "<footer>", "<div>", "<h2>"]
  }
};
