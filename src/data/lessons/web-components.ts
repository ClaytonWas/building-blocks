import type { Lesson } from "../../types";

export const webComponents: Lesson = {
  id: "web-components",
  trackId: "web",
  title: "Components — Reusable Pieces",
  level: 2,
  intro:
    "A component is a chunk of HTML you can stamp out as many times as you want. Build it once, use it everywhere.",
  concept: `Imagine you want three "cards" on your page. You *could* copy and paste the same HTML three times — but if you ever change the design, you'd have to update three places.

A **component** is a function that builds the HTML for you. You give it a few inputs, and it gives you back a chunk of HTML.

\`\`\`
function makeCard(title, body) {
  return \`
    <div class="card">
      <h3>\${title}</h3>
      <p>\${body}</p>
    </div>
  \`;
}
\`\`\`

The backticks (\`\`\`) make a **template string** — it's a string that lets you drop in variables with \`\${...}\`. That's how every modern UI framework (React, Vue, Svelte) starts.`,
  examples: [
    {
      caption: "Make a card component and stamp it three times",
      code: `<div id="app"></div>

<style>
  #app {
    display: flex;
    gap: 12px;
    padding: 16px;
  }
  .card {
    background: #6a5cff;
    color: white;
    padding: 16px;
    border-radius: 12px;
    flex: 1;
  }
  .card h3 { margin: 0 0 6px; }
  .card p { margin: 0; }
</style>

<script>
  function makeCard(title, body) {
    return \`
      <div class="card">
        <h3>\${title}</h3>
        <p>\${body}</p>
      </div>
    \`;
  }

  document.getElementById("app").innerHTML =
    makeCard("Bug", "Crawls slowly") +
    makeCard("Bird", "Flies fast") +
    makeCard("Fish", "Swims silent");
</script>`,
      note: "We wrote the card design once and reused it three times by calling makeCard with different inputs.",
      tryIt: {
        html: `<div id="app"></div>`,
        css: `#app {
  display: flex;
  gap: 12px;
  padding: 16px;
}
.card {
  background: #6a5cff;
  color: white;
  padding: 16px;
  border-radius: 12px;
  flex: 1;
}
.card h3 { margin: 0 0 6px; }
.card p { margin: 0; }`,
        js: `function makeCard(title, body) {
  return \`
    <div class="card">
      <h3>\${title}</h3>
      <p>\${body}</p>
    </div>
  \`;
}

document.getElementById("app").innerHTML =
  makeCard("Bug", "Crawls slowly") +
  makeCard("Bird", "Flies fast") +
  makeCard("Fish", "Swims silent");`
      }
    },
    {
      caption: "Build a list from data",
      code: `<ul id="list"></ul>

<script>
  const todos = [
    { text: "Eat breakfast", done: true },
    { text: "Do homework", done: false },
    { text: "Play outside", done: false }
  ];

  function makeTodo(item) {
    return \`<li>\${item.done ? "✅" : "⬜"} \${item.text}</li>\`;
  }

  document.getElementById("list").innerHTML =
    todos.map(makeTodo).join("");
</script>`,
      note: "We combined arrays + objects + a component function. This is exactly how real apps work.",
      tryIt: {
        html: `<ul id="list"></ul>`,
        css: ``,
        js: `const todos = [
  { text: "Eat breakfast", done: true },
  { text: "Do homework", done: false },
  { text: "Play outside", done: false }
];

function makeTodo(item) {
  return \`<li>\${item.done ? "✅" : "⬜"} \${item.text}</li>\`;
}

document.getElementById("list").innerHTML =
  todos.map(makeTodo).join("");`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a 'profile card' component. It should be a function that takes a name and an emoji. Use it to stamp out three profile cards on the page. Style them however you like.",
    files: {
      html: `<div id="app"></div>`,
      css: `#app {
  display: flex;
  gap: 12px;
  padding: 16px;
}
.profile {
  /* style your card */
}`,
      js: `function makeProfile(name, emoji) {
  return \`
    <div class="profile">
      <!-- your component HTML -->
    </div>
  \`;
}

document.getElementById("app").innerHTML =
  makeProfile("Ada", "🦊") +
  makeProfile("Linus", "🐧") +
  makeProfile("Grace", "🦉");
`
    },
    hint: "Inside the template string, use ${emoji} and ${name} where you want them to appear. Backticks (`) only — not regular quotes.",
    expectedContains: ["function makeProfile", "${name}", "innerHTML"]
  }
};
