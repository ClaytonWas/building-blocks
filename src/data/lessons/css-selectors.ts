import type { Lesson } from "../../types";

export const cssSelectors: Lesson = {
  id: "css-selectors",
  trackId: "css",
  title: "Targeting With Selectors",
  level: 2,
  intro:
    "Every CSS rule needs a selector — the part before the curly braces — that decides which elements get the styles. Knowing the three flavors unlocks everything else.",
  concept: `In the last lesson, you wrote rules like \`h1 { color: hotpink; }\`. The \`h1\` part is the **selector**. There are three basic flavors:

**Tag selectors** — \`p\`, \`h1\`, \`button\`. Match every element with that tag.

\`\`\`
p { color: gray; }   /* every paragraph */
\`\`\`

**Class selectors** — \`.warning\`, \`.note\`, \`.button-big\`. Match every element with that \`class\` attribute. Classes are reusable: the same class can be on as many elements as you want.

\`\`\`
.warning { color: red; }   /* every element with class="warning" */
\`\`\`

**Id selectors** — \`#hero\`, \`#main-title\`. Match the one element with that \`id\` attribute. Each id should be unique on the page — only one element per id.

\`\`\`
#hero { font-size: 40px; }   /* the one element with id="hero" */
\`\`\`

You can combine them. \`p.warning\` matches paragraphs that ALSO have class \`warning\` — both have to be true. \`*\` is the universal selector: it matches everything.`,
  examples: [
    {
      caption: "Class for the same look on many elements",
      code: `<p class="note">First note</p>
<p>Plain paragraph.</p>
<p class="note">Second note</p>

<style>
  .note {
    background: yellow;
    padding: 4px;
  }
</style>`,
      note: "Both .note paragraphs get the yellow background. The plain p in the middle is untouched. That's the power of classes — you opt elements in.",
      tryIt: {
        html: `<p class="note">First note</p>
<p>Plain paragraph.</p>
<p class="note">Second note</p>`,
        css: `.note {
  background: yellow;
  padding: 4px;
}`
      }
    },
    {
      caption: "Id for the one special element",
      code: `<h1 id="hero">Welcome!</h1>

<style>
  #hero { font-size: 40px; }
</style>`,
      note: "There's only one #hero on the page, so the rule is unambiguous."
    }
  ],
  playground: { kind: "cssSelector" },
  exercise: {
    prompt:
      "Style the page so: (1) all paragraphs have gray text, (2) every .warning element has red text, and (3) the #title is 32px.",
    files: {
      html: `<h1 id="title">My page</h1>
<p>Plain paragraph.</p>
<p class="warning">Watch out!</p>
<p>Another plain one.</p>`,
      css: `/* 1. paragraphs gray */

/* 2. .warning red */

/* 3. #title 32px */
`
    },
    hint: 'p { color: gray; } targets every p. .warning { color: red; } targets every class="warning" element. #title { font-size: 32px; } targets the id.',
    expectedContains: ["p {", ".warning", "#title"]
  }
};
