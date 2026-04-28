import type { Lesson } from "../../types";

export const htmlDetails: Lesson = {
  id: "html-details",
  trackId: "html",
  title: "Click-to-Expand With Details",
  level: 10,
  intro:
    "Sometimes you have extra information you don't want to clutter the page with. The <details> tag makes a click-to-expand widget — no JavaScript needed.",
  concept: `Two tags work together. Wrap everything in \`<details>\`, and put a \`<summary>\` first inside it. The summary is what's always visible. Everything else only shows when the user clicks.

\`\`\`
<details>
  <summary>What's your favorite food?</summary>
  <p>Pizza, every time.</p>
</details>
\`\`\`

The browser handles the open/close behavior on its own. The little triangle (▶ closed, ▼ open) is the browser's default — you can style it later with CSS.

You can put **anything** inside \`<details>\`: paragraphs, images, lists, even another \`<details>\`. The summary is just the first child.

If you want the panel to start open, add the \`open\` attribute:

\`\`\`
<details open>
  <summary>Already showing</summary>
  <p>This panel is open by default.</p>
</details>
\`\`\`

This pattern is great for:

- FAQ pages (one details per question)
- Spoilers and hints in tutorials
- "Read more" sections
- Any time you want to keep the page short by default`,
  examples: [
    {
      caption: "A simple FAQ entry",
      code: `<details>
  <summary>How long does it take to learn HTML?</summary>
  <p>The basics take a few hours. Comfort takes a few weeks of building things.</p>
</details>`,
      note: "Click the summary to toggle the answer. Click again to hide it. No JavaScript involved.",
      tryIt: {
        html: `<details>
  <summary>How long does it take to learn HTML?</summary>
  <p>The basics take a few hours. Comfort takes a few weeks of building things.</p>
</details>`
      }
    },
    {
      caption: "A small FAQ list",
      code: `<details>
  <summary>What is HTML?</summary>
  <p>The language web pages are written in.</p>
</details>

<details>
  <summary>What is CSS?</summary>
  <p>The language that decides how a web page looks.</p>
</details>

<details>
  <summary>What is JavaScript?</summary>
  <p>The language that makes a page do things when you click.</p>
</details>`,
      note: "Each <details> works on its own. The user can have several open at once.",
      tryIt: {
        html: `<details>
  <summary>What is HTML?</summary>
  <p>The language web pages are written in.</p>
</details>

<details>
  <summary>What is CSS?</summary>
  <p>The language that decides how a web page looks.</p>
</details>

<details>
  <summary>What is JavaScript?</summary>
  <p>The language that makes a page do things when you click.</p>
</details>`
      }
    },
    {
      caption: "Open by default with the open attribute",
      code: `<details open>
  <summary>Tip of the day</summary>
  <p>Save your work often.</p>
</details>`,
      note: "Add the word open inside the opening tag. No equals, no quotes — just open. The user can still close it.",
      tryIt: {
        html: `<details open>
  <summary>Tip of the day</summary>
  <p>Save your work often.</p>
</details>`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a small FAQ page with three details/summary pairs about something you know well — a video game, a sport, a hobby. Each summary is a question, each panel has the answer.",
    files: {
      html: `<h1>FAQ: ???</h1>

<details>
  <summary>Question 1?</summary>
  <p>Answer 1.</p>
</details>

<!-- add two more <details> blocks -->
`
    },
    hint: "Each FAQ entry follows the same shape: <details><summary>Question</summary><p>Answer</p></details>.",
    expectedContains: ["<details>", "<summary>"]
  }
};
