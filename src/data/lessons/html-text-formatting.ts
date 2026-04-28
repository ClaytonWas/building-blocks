import type { Lesson } from "../../types";

export const htmlTextFormatting: Lesson = {
  id: "html-text-formatting",
  trackId: "html",
  title: "Words With Style",
  level: 5,
  intro:
    "A few small tags let you emphasize parts of a sentence, break a line, or draw a divider — without writing any CSS.",
  concept: `Most of the tags you've seen so far are **block** tags — they take up a whole row on the page (\`<h1>\`, \`<p>\`, \`<div>\`). There are also **inline** tags that flow inside text without breaking the line.

The most useful inline tags:

- **\`<strong>\`** — important text. Browsers render it bold.
- **\`<em>\`** — emphasized text. Browsers render it italic.
- **\`<mark>\`** — highlighted text, like with a yellow marker.
- **\`<small>\`** — smaller text for fine print.

\`\`\`
<p>I <em>really</em> like <strong>pizza</strong>.</p>
\`\`\`

There are also two self-closing tags for breaks:

- **\`<br>\`** — a line break (forces text to the next line). Use sparingly — most of the time you want a new \`<p>\`.
- **\`<hr>\`** — a horizontal rule, a divider line across the page.

\`\`\`
<p>Roses are red,<br>violets are blue.</p>
<hr>
<p>The end.</p>
\`\`\`

### A small note: <strong> vs <b>

There are two tags for "make this bold-looking": \`<strong>\` and \`<b>\`. They look the same but they mean different things. \`<strong>\` says *this is important* — screen readers may emphasize it. \`<b>\` just says *make this bold* with no extra meaning. Same story for \`<em>\` (meaningful) vs \`<i>\` (just italic). Prefer the meaningful ones.`,
  examples: [
    {
      caption: "Strong, em, and mark in a sentence",
      code: `<p>
  This sentence has <strong>important</strong>,
  <em>emphasized</em>, and <mark>highlighted</mark> words.
</p>`,
      note: "Each inline tag wraps just the words it applies to. The rest of the paragraph keeps flowing normally.",
      tryIt: {
        html: `<p>
  This sentence has <strong>important</strong>,
  <em>emphasized</em>, and <mark>highlighted</mark> words.
</p>`
      }
    },
    {
      caption: "A short poem with line breaks",
      code: `<p>
  Roses are red,<br>
  violets are blue,<br>
  HTML is fun,<br>
  and so are you.
</p>`,
      note: "Without <br>, the lines would all run together as one long line. The browser collapses regular newlines in the source.",
      tryIt: {
        html: `<p>
  Roses are red,<br>
  violets are blue,<br>
  HTML is fun,<br>
  and so are you.
</p>`
      }
    },
    {
      caption: "An hr divider between sections",
      code: `<h2>Chapter one</h2>
<p>Once upon a time...</p>
<hr>
<h2>Chapter two</h2>
<p>The next day...</p>`,
      note: "<hr> draws a horizontal line. Useful for separating sections on simple pages."
    }
  ],
  exercise: {
    prompt:
      "Write a short paragraph about your favorite food. Use <strong> on the food's name, <em> on a describing word, a <br> to break a line, and end with an <hr> divider.",
    files: {
      html: `<h1>My favorite food</h1>

<p>
  <!-- write your sentences here, using <strong> and <em> and a <br> -->
</p>

<!-- add an <hr> below the paragraph -->
`
    },
    hint: "Wrap the food's name in <strong>...</strong>. Wrap a describing word in <em>...</em>. Use <br> mid-sentence to force a new line. Put <hr> after your paragraph.",
    expectedContains: ["<strong>", "<em>", "<br", "<hr"]
  }
};
