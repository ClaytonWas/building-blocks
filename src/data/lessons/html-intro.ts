import type { Lesson } from "../../types";

export const htmlIntro: Lesson = {
  id: "html-intro",
  trackId: "html",
  title: "Your First Web Page",
  level: 1,
  intro: "HTML is the skeleton of every web page. It tells the browser what's on the page.",
  concept: `Every web page is made out of **tags**. A tag wraps content in pointy brackets, like \`<h1>Hello</h1>\`.

The tag with the \`h1\` is a "heading 1" — it's used for the biggest title on the page. There are tags for paragraphs (\`<p>\`), buttons (\`<button>\`), images (\`<img>\`), and lots more.

When the browser reads your HTML, it builds the page piece by piece, like stacking blocks.`,
  examples: [
    {
      caption: "A heading and a paragraph",
      code: `<h1>Welcome!</h1>
<p>This is my very first web page.</p>`,
      note: "The h1 makes a big title. The p makes a normal paragraph."
    },
    {
      caption: "A button you can click",
      code: `<button>Click me!</button>`,
      note: "Buttons are made with the button tag. We'll learn how to make them DO things later."
    }
  ],
  exercise: {
    prompt: "Make a small page about you! Add a heading with your name, a paragraph that says one thing you like, and a button that says 'About me'.",
    files: {
      html: `<h1>Your name here</h1>
<p>Write something about yourself</p>
<button>Your button</button>`
    },
    hint: "You can change the words inside the tags to whatever you want.",
    expectedContains: ["<h1>", "<p>", "<button>"]
  }
};
