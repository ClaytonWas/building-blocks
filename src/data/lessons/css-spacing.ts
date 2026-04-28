import type { Lesson } from "../../types";

export const cssSpacing: Lesson = {
  id: "css-spacing",
  trackId: "css",
  title: "Space Around Things",
  level: 3,
  intro:
    "Two of the most-used CSS properties decide how much breathing room every element gets. Padding pushes the content away from the edge. Margin pushes the box away from its neighbors.",
  concept: `Every element on the page is a box. Around its content there are two layers of space:

- **Padding** — space INSIDE the box, between the content and the box's edge. Bigger padding makes a button feel meatier; tighter padding makes a tag look tight.
- **Margin** — space OUTSIDE the box, between this box and its neighbors. Bigger margin spreads things out; smaller margin packs them in.

\`\`\`
.box {
  padding: 16px;   /* space inside */
  margin: 12px;    /* space outside */
}
\`\`\`

You can also set each side independently:

\`\`\`
.box {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
}
\`\`\`

Or use the shorthand \`padding: 8px 16px;\` (top/bottom 8, left/right 16) — same idea, fewer lines.

The thing to feel: padding changes how big the box itself is. Margin changes how far apart neighboring boxes are. Both are useful, but they do different jobs.`,
  examples: [
    {
      caption: "Padding makes a button comfortable",
      code: `<button class="btn">Click me</button>

<style>
  .btn {
    padding: 12px 22px;
    background: #6a5cff;
    color: white;
    border: 0;
    border-radius: 8px;
  }
</style>`,
      note: "Without the padding the button would be cramped against the text. 12px top/bottom, 22px left/right gives it room.",
      tryIt: {
        html: `<button class="btn">Click me</button>`,
        css: `.btn {
  padding: 12px 22px;
  background: #6a5cff;
  color: white;
  border: 0;
  border-radius: 8px;
}`
      }
    },
    {
      caption: "Margin separates two notes",
      code: `<p class="note">First note</p>
<p class="note">Second note</p>

<style>
  .note {
    background: #ffe066;
    padding: 8px;
    margin: 12px;
  }
</style>`,
      note: "Without margin, the two notes touch. margin: 12px puts space between them and away from the edge of the page."
    }
  ],
  playground: { kind: "cssBoxModel" },
  exercise: {
    prompt:
      "Style the .card so it has 18px of padding on all sides and 24px of margin between cards.",
    files: {
      html: `<div class="card">First</div>
<div class="card">Second</div>
<div class="card">Third</div>`,
      css: `.card {
  background: #6a5cff;
  color: white;
  border-radius: 8px;
  /* add padding here */
  /* add margin here */
}`
    },
    hint: "padding: 18px; goes inside .card. margin: 24px; goes inside .card too.",
    expectedContains: ["padding", "margin"]
  }
};
