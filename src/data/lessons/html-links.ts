import type { Lesson } from "../../types";

export const htmlLinks: Lesson = {
  id: "html-links",
  trackId: "html",
  title: "Linking Pages Together",
  level: 4,
  intro:
    "The web is a web because of links. The <a> tag turns text (or anything else) into a clickable link.",
  concept: `An **anchor** tag — \`<a>\` — makes anything inside it clickable. The \`href\` attribute is *where* the link goes:

\`\`\`
<a href="https://wikipedia.org">Wikipedia</a>
\`\`\`

Links can point three places:

**1. To another website (external).**

\`\`\`
<a href="https://example.com">Visit example.com</a>
\`\`\`

**2. To another page in your own site.**

\`\`\`
<a href="about.html">About me</a>
\`\`\`

**3. To a spot on the same page (anchor).**

If something on your page has \`id="contact"\`, this jumps to it:

\`\`\`
<a href="#contact">Skip to contact</a>
\`\`\`

You can also make a link open an email:

\`\`\`
<a href="mailto:hi@example.com">Email me</a>
\`\`\`

If you want a link to open in a new tab, add \`target="_blank"\`:

\`\`\`
<a href="https://wikipedia.org" target="_blank">Wikipedia</a>
\`\`\`

Anything between \`<a>\` and \`</a>\` becomes the clickable part — text, images, even whole sections.`,
  examples: [
    {
      caption: "Three kinds of links",
      code: `<p>
  <a href="https://wikipedia.org">External site</a>
  ·
  <a href="#about">Jump to About</a>
  ·
  <a href="mailto:hi@example.com">Email me</a>
</p>

<h2 id="about">About</h2>
<p>This is the about section.</p>`,
      note: "Three different href styles. The middle one only works because <h2 id=\"about\"> exists further down.",
      tryIt: {
        html: `<p>
  <a href="https://wikipedia.org">External site</a>
  ·
  <a href="#about">Jump to About</a>
  ·
  <a href="mailto:hi@example.com">Email me</a>
</p>

<h2 id="about">About</h2>
<p>This is the about section.</p>`
      }
    },
    {
      caption: "Open in a new tab",
      code: `<a href="https://wikipedia.org" target="_blank">
  Wikipedia (new tab)
</a>`,
      note: "target=\"_blank\" is friendly when you're sending people away from your page — they don't lose their place."
    },
    {
      caption: "A clickable image",
      code: `<a href="https://en.wikipedia.org/wiki/Cat">
  <img src="https://picsum.photos/seed/cat/200/150" alt="A cat" />
</a>`,
      note: "The image is the clickable thing now. Anything inside <a>...</a> becomes the link."
    }
  ],
  exercise: {
    prompt:
      "Make a page with three links: one to a website you like (opening in a new tab), one that says \"Email me\" using mailto, and one that jumps down to a heading with id=\"bottom\".",
    files: {
      html: `<h1>My links</h1>

<!-- 1. external link in a new tab -->

<!-- 2. mailto link -->

<!-- 3. jump-to-id link -->


<h2 id="bottom">You jumped here!</h2>
<p>Nice landing.</p>
`
    },
    hint: "External: <a href=\"https://...\" target=\"_blank\">. Email: <a href=\"mailto:you@example.com\">. Jump: <a href=\"#bottom\">.",
    expectedContains: ["<a href=", "target=\"_blank\"", "mailto:", "#bottom"]
  }
};
