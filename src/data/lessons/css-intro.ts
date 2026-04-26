import type { Lesson } from "../../types";

export const cssIntro: Lesson = {
  id: "css-intro",
  trackId: "css",
  title: "Painting the Page",
  level: 1,
  intro: "CSS is how we make things pretty. It changes colors, sizes, fonts, and where things sit on the page.",
  concept: `If HTML is the skeleton, CSS is the paint and clothes. With CSS you write **rules** that say "make this thing look like that."

A rule looks like this:

\`\`\`
h1 {
  color: tomato;
  font-size: 50px;
  text-align: center;
}
\`\`\`

This rule means: "find every h1 on the page, paint it tomato red, make it 50 pixels tall, and put it in the middle."

The thing before the curly braces (\`h1\`) is called a **selector** — it picks which thing to style.`,
  examples: [
    {
      caption: "Color and center a heading",
      code: `<h1>Hello CSS!</h1>
<style>
  h1 {
    color: hotpink;
    text-align: center;
  }
</style>`,
      note: "We put the styles inside <style> tags so the browser knows it's CSS, not HTML.",
      tryIt: {
        html: `<h1>Hello CSS!</h1>`,
        css: `h1 {
  color: hotpink;
  text-align: center;
}`
      }
    },
    {
      caption: "A rounded, colorful box",
      code: `<div class="card">I'm in a card!</div>
<style>
  .card {
    background: lightblue;
    padding: 20px;
    border-radius: 16px;
    width: 200px;
  }
</style>`,
      note: "A dot before a name (like .card) means 'find anything with class=\"card\"'.",
      tryIt: {
        html: `<div class="card">I'm in a card!</div>`,
        css: `.card {
  background: lightblue;
  padding: 20px;
  border-radius: 16px;
  width: 200px;
}`
      }
    }
  ],
  playground: { kind: "css" },
  exercise: {
    prompt: "Style your own card! Make a div with a class, then add a CSS rule that gives it a background color you like, big rounded corners, and centers the text.",
    files: {
      html: `<div class="my-card">My cool card</div>`,
      css: `.my-card {
  /* your styles here */
}`
    },
    hint: "Try background, padding, border-radius, and text-align: center.",
    expectedContains: ["class", "border-radius"]
  }
};
