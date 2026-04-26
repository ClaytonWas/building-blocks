import type { Lesson } from "../../types";

export const webCombined: Lesson = {
  id: "web-combined",
  trackId: "web",
  title: "All Three Together",
  level: 1,
  intro: "HTML, CSS, and JavaScript are like a 3-piece band. HTML is the structure, CSS is the style, and JS is the action.",
  concept: `On a real web page, all three work at once:

- **HTML** says *what* is on the page
- **CSS** says *how it looks*
- **JavaScript** says *what happens* when you click, type, or scroll

Below you'll write all three in the same file. The \`<style>\` tag holds CSS, and the \`<script>\` tag holds JavaScript.`,
  examples: [
    {
      caption: "A button that counts clicks",
      code: `<button id="counter">Clicked 0 times</button>

<style>
  #counter {
    font-size: 24px;
    padding: 12px 20px;
    background: gold;
    border: none;
    border-radius: 12px;
    cursor: pointer;
  }
</style>

<script>
  let count = 0;
  const btn = document.getElementById("counter");
  btn.addEventListener("click", () => {
    count = count + 1;
    btn.textContent = "Clicked " + count + " times";
  });
</script>`,
      note: "JavaScript finds the button by its id, listens for clicks, and updates the text.",
      tryIt: {
        html: `<button id="counter">Clicked 0 times</button>`,
        css: `#counter {
  font-size: 24px;
  padding: 12px 20px;
  background: gold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}`,
        js: `let count = 0;
const btn = document.getElementById("counter");
btn.addEventListener("click", () => {
  count = count + 1;
  btn.textContent = "Clicked " + count + " times";
});`
      }
    }
  ],
  playground: { kind: "domEvent" },
  exercise: {
    prompt: "Make your own clickable thing. It needs: an HTML element with an id, some CSS to style it, and a JavaScript click handler that changes something (the text, the color, anything!).",
    files: {
      html: `<div id="thing">Click me</div>`,
      css: `#thing {
  /* your styles */
}`,
      js: `const thing = document.getElementById("thing");
thing.addEventListener("click", () => {
  // your action
});`
    },
    hint: "You can change text with .textContent, or change a color with .style.background.",
    expectedContains: ["addEventListener", "getElementById"]
  }
};
