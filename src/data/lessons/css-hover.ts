import type { Lesson } from "../../types";

export const cssHover: Lesson = {
  id: "css-hover",
  trackId: "css",
  title: "Hover Effects and Transitions",
  level: 2,
  intro:
    "When the mouse moves over an element, you can change how it looks. Add a transition and the change becomes a smooth little animation.",
  concept: `CSS has special **states** you can style. The most common is \`:hover\` — the styles only apply while the mouse is over the element.

\`\`\`
.card {
  background: skyblue;
}

.card:hover {
  background: gold;
}
\`\`\`

That works — but the change snaps. To smooth it out, add a \`transition\`:

\`\`\`
.card {
  background: skyblue;
  transition: background 200ms ease;
}

.card:hover {
  background: gold;
}
\`\`\`

The \`transition\` property says: "for any change to *background*, animate it over 200 milliseconds with an *ease* curve." Now hovering glides instead of snapping.

You can transition almost any property: \`background\`, \`color\`, \`transform\`, \`box-shadow\`, \`opacity\`, \`border-radius\`, and many more.

\`transform\` is especially fun — it lets you move, rotate, or resize an element without affecting layout:

\`\`\`
.card:hover {
  transform: translateY(-4px) scale(1.05);
}
\`\`\``,
  examples: [
    {
      caption: "Color shift on hover",
      code: `<div class="box">Hover me</div>

<style>
  .box {
    background: skyblue;
    color: black;
    padding: 20px;
    border-radius: 12px;
    width: 160px;
    text-align: center;
    transition: background 200ms ease, color 200ms ease;
  }
  .box:hover {
    background: midnightblue;
    color: white;
  }
</style>`,
      note: "Two properties listed in transition — both animate together.",
      tryIt: {
        html: `<div class="box">Hover me</div>`,
        css: `.box {
  background: skyblue;
  color: black;
  padding: 20px;
  border-radius: 12px;
  width: 160px;
  text-align: center;
  transition: background 200ms ease, color 200ms ease;
}
.box:hover {
  background: midnightblue;
  color: white;
}`
      }
    },
    {
      caption: "Lift on hover",
      code: `<div class="card">Lifty</div>

<style>
  .card {
    background: tomato;
    color: white;
    padding: 20px;
    border-radius: 12px;
    width: 160px;
    text-align: center;
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
</style>`,
      note: "translateY moves the element up 6px. The shadow makes it feel like it's floating.",
      tryIt: {
        html: `<div class="card">Lifty</div>`,
        css: `.card {
  background: tomato;
  color: white;
  padding: 20px;
  border-radius: 12px;
  width: 160px;
  text-align: center;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}`
      }
    }
  ],
  playground: { kind: "hover" },
  exercise: {
    prompt:
      "Make a button that has a fun hover effect. Pick at least two changes (background, color, transform, scale, rotate, shadow) and add a transition so it animates smoothly.",
    files: {
      html: `<button class="fun">Hover me!</button>`,
      css: `.fun {
  background: violet;
  color: white;
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  font-size: 18px;
  cursor: pointer;
  /* add a transition here */
}

.fun:hover {
  /* change at least two things on hover */
}
`
    },
    hint: "Try transition: all 200ms ease; — it animates everything at once.",
    expectedContains: ["transition", ":hover", "transform"]
  }
};
