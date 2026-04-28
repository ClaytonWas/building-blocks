import type { Lesson } from "../../types";

export const htmlAttributes: Lesson = {
  id: "html-attributes",
  trackId: "html",
  title: "Tags With Attributes",
  level: 3,
  intro:
    "Most tags can carry extra info inside their opening bracket. That extra info is called an attribute, and it's how tags get their powers.",
  concept: `An **attribute** lives inside a tag's opening bracket and gives it extra information. It looks like \`name="value"\`:

\`\`\`
<a href="https://example.com">visit me</a>
<img src="cat.jpg" alt="A grumpy cat" />
<p title="hover me">hover the mouse over me</p>
\`\`\`

Some attributes belong to specific tags (\`href\` only makes sense on \`<a>\`, \`src\` only on tags like \`<img>\`). But several attributes work on **any** tag:

- **\`class\`** — a label you can give an element. Many elements can share the same class. CSS and JavaScript use classes to find groups of elements.
- **\`id\`** — a unique name for one element. Only one element should have any given id. Used to find that *exact* element.
- **\`title\`** — text that appears as a tooltip when you hover.
- **\`lang\`** — what language the content is in (\`"en"\`, \`"fr"\`, \`"ja"\`, etc.).

You'll see \`class\` and \`id\` everywhere — they're how CSS picks which elements to style and how JavaScript finds the elements it wants to change. They don't change how the page looks on their own; they're labels for later.

A few rules:

- Attribute values usually go in double quotes.
- You can put as many attributes on a tag as you want, separated by spaces.
- Order doesn't matter: \`<a href="..." title="...">\` and \`<a title="..." href="...">\` mean the same thing.`,
  examples: [
    {
      caption: "Class and id on a heading",
      code: `<h1 id="title" class="big-text">Welcome!</h1>`,
      note: "id=\"title\" labels this as the one and only title. class=\"big-text\" is a reusable label — other elements could share that class.",
      tryIt: {
        html: `<h1 id="title" class="big-text">Welcome!</h1>
<style>
  #title { color: tomato; }
  .big-text { font-size: 50px; }
</style>`
      }
    },
    {
      caption: "Title attribute (hover for a tooltip)",
      code: `<p title="I'm a hidden message">Hover over me to see something.</p>`,
      note: "title isn't visible on the page — it shows up when you hover.",
      tryIt: {
        html: `<p title="I'm a hidden message">Hover over me to see something.</p>`
      }
    },
    {
      caption: "Same class on many elements",
      code: `<p class="note">First note.</p>
<p class="note">Second note.</p>
<p class="note">Third note.</p>`,
      note: "All three paragraphs share class=\"note\". Later, one CSS rule for .note styles all of them at once."
    }
  ],
  exercise: {
    prompt:
      "Take the page below and add: id=\"main-title\" to the heading, class=\"warning\" to the second paragraph, and title=\"thanks for hovering\" to the third paragraph.",
    files: {
      html: `<h1>Pets I've Met</h1>

<p>Most cats are friendly.</p>
<p>Some snakes can bite — be careful.</p>
<p>Hover here for a secret.</p>
`
    },
    hint: "Attributes go inside the opening tag, like <h1 id=\"main-title\">. Multiple attributes are separated by spaces.",
    expectedContains: ["id=", "class=", "title="]
  }
};
