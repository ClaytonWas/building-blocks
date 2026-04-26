import type { Lesson } from "../../types";

export const cssLayout: Lesson = {
  id: "css-layout",
  trackId: "css",
  title: "Boxes and Flexbox",
  level: 2,
  intro:
    "Every element on a page is a box. CSS lets you arrange those boxes in rows, columns, or grids. The easiest tool for that is Flexbox.",
  concept: `Every HTML element is a rectangular **box**. The box has:

- **content** (the words or image inside)
- **padding** (space between the content and the edge)
- **border** (the outline)
- **margin** (space between this box and other boxes)

To put boxes next to each other, set the parent to \`display: flex\`. That turns its children into a row.

\`\`\`
.row {
  display: flex;
  gap: 12px;
}
\`\`\`

Flexbox has a few magic words: \`gap\` adds space between items, \`justify-content\` lines them up across the row, and \`align-items\` lines them up top-to-bottom.`,
  examples: [
    {
      caption: "Three boxes in a row with space between",
      code: `<div class="row">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>

<style>
  .row {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: #f0f0f0;
  }
  .box {
    background: lightcoral;
    color: white;
    padding: 24px;
    border-radius: 8px;
    font-weight: bold;
  }
</style>`,
      note: "Without display: flex, the divs would stack vertically. Flex puts them side-by-side.",
      tryIt: {
        html: `<div class="row">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`,
        css: `.row {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f0f0f0;
}
.box {
  background: lightcoral;
  color: white;
  padding: 24px;
  border-radius: 8px;
  font-weight: bold;
}`
      }
    },
    {
      caption: "Center everything",
      code: `<div class="middle">
  <div class="badge">★ Centered ★</div>
</div>

<style>
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: #222;
  }
  .badge {
    background: gold;
    padding: 12px 20px;
    border-radius: 999px;
    font-weight: bold;
  }
</style>`,
      note: "justify-content centers across the row. align-items centers top-to-bottom.",
      tryIt: {
        html: `<div class="middle">
  <div class="badge">★ Centered ★</div>
</div>`,
        css: `.middle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #222;
}
.badge {
  background: gold;
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: bold;
}`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a row of 4 colored cards. Use flexbox so they sit side-by-side with a gap between them. Each card should have padding and rounded corners.",
    files: {
      html: `<div class="row">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
  <div class="card">Four</div>
</div>`,
      css: `.row {
  /* turn this into a flex row with a gap */
}
.card {
  /* background color, padding, border-radius */
}`
    },
    hint: "Try display: flex; gap: 12px; on .row, and background, padding, border-radius on .card.",
    expectedContains: ["display: flex", "gap", "border-radius"]
  }
};
