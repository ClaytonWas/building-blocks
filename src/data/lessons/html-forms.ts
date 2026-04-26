import type { Lesson } from "../../types";

export const htmlForms: Lesson = {
  id: "html-forms",
  trackId: "html",
  title: "Forms and Inputs",
  level: 4,
  intro:
    "Forms are how a web page asks a user for information. They're made of inputs — text boxes, dropdowns, sliders, checkboxes — wrapped in a form tag.",
  concept: `A form starts with the \`<form>\` tag and contains one or more **inputs**.

The most common inputs:

- \`<input type="text">\` — a single line of text
- \`<input type="email">\` — same shape, but the browser checks it looks like an email
- \`<input type="number">\` — only numbers
- \`<input type="range">\` — a slider
- \`<input type="checkbox">\` — on/off toggle
- \`<select>\` — a dropdown menu of choices
- \`<textarea>\` — multi-line text

Every input should have a **label** — text that explains what it's for. The \`for\` attribute on the label points at the input's \`id\`:

\`\`\`
<label for="name">Your name</label>
<input type="text" id="name" />
\`\`\`

Labels matter for two reasons:

1. **Clickable** — clicking the label puts the cursor in the input.
2. **Accessibility** — screen readers announce the label when a user lands on the input.`,
  examples: [
    {
      caption: "A simple text input with label",
      code: `<form>
  <label for="name">Your name</label>
  <input type="text" id="name" placeholder="Type here" />
</form>`,
      note: "The for=\"name\" matches the id=\"name\" — they're paired.",
      tryIt: {
        html: `<form>
  <label for="name">Your name</label>
  <input type="text" id="name" placeholder="Type here" />
</form>`
      }
    },
    {
      caption: "A dropdown menu",
      code: `<form>
  <label for="color">Favorite color</label>
  <select id="color">
    <option>Red</option>
    <option>Green</option>
    <option>Blue</option>
  </select>
</form>`,
      note: "Each <option> is one choice in the dropdown.",
      tryIt: {
        html: `<form>
  <label for="color">Favorite color</label>
  <select id="color">
    <option>Red</option>
    <option>Green</option>
    <option>Blue</option>
  </select>
</form>`
      }
    },
    {
      caption: "Several inputs together",
      code: `<form>
  <label for="email">Email</label>
  <input type="email" id="email" />

  <label for="age">Age</label>
  <input type="number" id="age" min="1" max="120" />

  <label>
    <input type="checkbox" />
    Send me updates
  </label>

  <button type="submit">Sign up</button>
</form>`,
      note: "A form usually ends with a submit button — that's the one that sends the data.",
      tryIt: {
        html: `<form>
  <label for="email">Email</label>
  <input type="email" id="email" />

  <label for="age">Age</label>
  <input type="number" id="age" min="1" max="120" />

  <label>
    <input type="checkbox" />
    Send me updates
  </label>

  <button type="submit">Sign up</button>
</form>`
      }
    }
  ],
  playground: { kind: "form" },
  exercise: {
    prompt:
      "Build a 'contact us' form with a label + text input for a name, a label + email input, a label + textarea for a message, and a submit button.",
    files: {
      html: `<form>
  <!-- name field -->

  <!-- email field -->

  <!-- message textarea -->

  <button type="submit">Send</button>
</form>
`
    },
    hint: "Each input should have its own <label for=\"...\">. Match the for attribute to the input's id.",
    expectedContains: ["<form>", "<label", "<input", "<textarea", "<button"]
  }
};
