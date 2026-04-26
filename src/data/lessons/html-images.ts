import type { Lesson } from "../../types";

export const htmlImages: Lesson = {
  id: "html-images",
  trackId: "html",
  title: "Images on a Page",
  level: 2,
  intro:
    "Pictures make a page come alive. The img tag puts an image on the page — and it's a tag with a twist.",
  concept: `An image is added with \`<img>\`. The \`src\` attribute says *where* the image is, and the \`alt\` attribute says *what it shows*:

\`\`\`
<img src="https://picsum.photos/200" alt="A random photo" />
\`\`\`

Two things make \`<img>\` a little different from other tags:

1. **It has no closing tag.** Unlike \`<p>...</p>\`, an image is a "self-closing" tag. You can write \`<img />\` or \`<img>\` — both work.
2. **It's blank without attributes.** \`<img>\` on its own shows nothing — you need at least \`src\`.

The \`alt\` text is important. It's what shows up if the image fails to load, and it's what a screen reader speaks aloud for someone who can't see the image. Always write meaningful alt text.

You can also set the size with \`width\` and \`height\`:

\`\`\`
<img src="..." alt="..." width="150" height="150" />
\`\`\``,
  examples: [
    {
      caption: "A simple image",
      code: `<img src="https://picsum.photos/300/200" alt="A random scene" />`,
      note: "picsum.photos serves a random image at the size you ask for. Reload to see a different one.",
      tryIt: {
        html: `<img src="https://picsum.photos/300/200" alt="A random scene" />`
      }
    },
    {
      caption: "An image with a caption",
      code: `<figure>
  <img src="https://picsum.photos/seed/cat/300/200" alt="Photo from picsum" width="300" />
  <figcaption>A picture from the internet.</figcaption>
</figure>`,
      note: "Wrap an image and its caption in <figure>. Use <figcaption> for the text.",
      tryIt: {
        html: `<figure>
  <img src="https://picsum.photos/seed/cat/300/200" alt="Photo from picsum" width="300" />
  <figcaption>A picture from the internet.</figcaption>
</figure>`
      }
    },
    {
      caption: "An image inside a link",
      code: `<a href="https://en.wikipedia.org/wiki/Cat" target="_blank">
  <img src="https://picsum.photos/seed/feline/200/150" alt="Click to learn about cats" />
</a>`,
      note: "Wrap any image in <a> to make it a clickable link.",
      tryIt: {
        html: `<a href="https://en.wikipedia.org/wiki/Cat" target="_blank">
  <img src="https://picsum.photos/seed/feline/200/150" alt="Click to learn about cats" />
</a>`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a small page with: a heading, an image (with good alt text), and a short paragraph below describing the image. Bonus: wrap the image in a link to any site you like.",
    files: {
      html: `<h1>Your title</h1>

<img src="https://picsum.photos/seed/mypic/300/200" alt="" />

<p>Write a sentence about the picture.</p>
`
    },
    hint: "Don't leave alt empty — describe what the picture shows in a few words.",
    expectedContains: ["<img", "src=", "alt=", "<p>"]
  }
};
