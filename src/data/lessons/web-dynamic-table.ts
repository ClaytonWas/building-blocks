import type { Lesson } from "../../types";

export const webDynamicTable: Lesson = {
  id: "web-dynamic-table",
  trackId: "web",
  title: "A Table You Can Add To",
  level: 3,
  intro:
    "So far, every page you've made was 'finished' as soon as the browser drew it. Now we're going to build a real interactive widget — a table where the user can add rows by clicking a button, and remove them by clicking the row itself.",
  concept: `Up till now, JavaScript has been *changing* things that already exist on the page — the text in an h1, the color of a paragraph. But the DOM isn't read-only: JS can also **build new elements from scratch** and stick them on the page.

The recipe has three steps:

\`\`\`
const newRow = document.createElement('tr');   // 1. make it
newRow.textContent = 'Hello';                  // 2. fill it
document.querySelector('tbody').appendChild(newRow); // 3. attach it
\`\`\`

After step 3, the new row really IS in the page. The browser updates instantly.

To remove an element, you have it ask itself to leave:

\`\`\`
row.remove();
\`\`\`

### Building a row with cells

A row needs cells inside it. Same recipe, twice:

\`\`\`
const row = document.createElement('tr');
const cell1 = document.createElement('td');
cell1.textContent = 'Pizza';
row.appendChild(cell1);
const cell2 = document.createElement('td');
cell2.textContent = 'High';
row.appendChild(cell2);

document.querySelector('tbody').appendChild(row);
\`\`\`

You make the row, you make each cell, you put the cells *inside* the row, then you put the row inside the tbody. Same nesting as if you'd written it by hand in HTML.

### Clicking the right row

If you want any clicked row to delete itself, you can listen for clicks on the whole tbody and use \`event.target\` to figure out *what* was clicked:

\`\`\`
tbody.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (row) row.remove();
});
\`\`\`

\`event.target\` is the element the click actually landed on (probably a \`<td>\`). \`.closest('tr')\` walks up to the nearest ancestor row. Then \`.remove()\` deletes it.

This trick — listening on a parent for clicks on any of its children — is called **event delegation**. It's how real apps handle long lists without attaching a separate listener to every row.`,
  examples: [
    {
      caption: "Warm-up: append an <li> to a <ul>",
      code: `<ul id="list">
  <li>One</li>
</ul>
<button id="add">Add an item</button>

<script>
  const list = document.querySelector('#list');
  document.querySelector('#add').addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = 'New item ' + (list.children.length + 1);
    list.appendChild(li);
  });
</script>`,
      note: "Three steps every time: createElement, set its text, appendChild. The button keeps adding more.",
      tryIt: {
        html: `<ul id="list">
  <li>One</li>
</ul>
<button id="add">Add an item</button>`,
        js: `const list = document.querySelector('#list');
document.querySelector('#add').addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = 'New item ' + (list.children.length + 1);
  list.appendChild(li);
});`
      }
    },
    {
      caption: "Build a <tr> with two <td>s",
      code: `<table>
  <thead><tr><th>Food</th><th>Rating</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
<button id="add">Add row</button>

<script>
  const rows = document.querySelector('#rows');
  document.querySelector('#add').addEventListener('click', () => {
    const tr = document.createElement('tr');
    const c1 = document.createElement('td');
    c1.textContent = 'Pizza';
    const c2 = document.createElement('td');
    c2.textContent = 'Great';
    tr.appendChild(c1);
    tr.appendChild(c2);
    rows.appendChild(tr);
  });
</script>`,
      note: "Each click adds the same hard-coded row. Next we'll make it use real input.",
      tryIt: {
        html: `<table>
  <thead><tr><th>Food</th><th>Rating</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
<button id="add">Add row</button>`,
        css: `table { border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: 6px 12px; text-align: left; }`,
        js: `const rows = document.querySelector('#rows');
document.querySelector('#add').addEventListener('click', () => {
  const tr = document.createElement('tr');
  const c1 = document.createElement('td');
  c1.textContent = 'Pizza';
  const c2 = document.createElement('td');
  c2.textContent = 'Great';
  tr.appendChild(c1);
  tr.appendChild(c2);
  rows.appendChild(tr);
});`
      }
    },
    {
      caption: "Click any row to remove it",
      code: `tbody.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (row) row.remove();
});`,
      note: "One listener on the parent handles clicks on every row, even ones you add later. event.target.closest('tr') walks up to the row no matter which <td> got clicked."
    }
  ],
  exercise: {
    prompt:
      "Press Run. Type an item and priority, click Add — a new row appears. Click any row — it disappears. Now make it your own: change the columns, the colors, or add a third column. The full code is below for you to read and modify.",
    files: {
      html: `<h1>My wishlist</h1>

<table>
  <thead>
    <tr><th>Item</th><th>Priority</th></tr>
  </thead>
  <tbody id="rows">
  </tbody>
</table>

<input id="item-input" placeholder="What do you want?" />
<input id="priority-input" placeholder="High / Medium / Low" />
<button id="add-btn">Add</button>

<p class="hint">Click any row to remove it.</p>`,
      css: `body { font: 15px/1.5 system-ui, sans-serif; padding: 18px; }
h1 { margin-top: 0; }
table { border-collapse: collapse; margin-bottom: 12px; min-width: 320px; }
th, td { border: 1px solid #d3d3c4; padding: 8px 14px; text-align: left; }
th { background: #f4f3ec; }
tbody tr { cursor: pointer; }
tbody tr:hover { background: #fdecea; }
input { padding: 6px 10px; margin-right: 6px; border: 1px solid #d3d3c4; border-radius: 6px; font: inherit; }
button { padding: 7px 14px; border: 0; border-radius: 6px; background: #6a5cff; color: white; font-weight: 600; cursor: pointer; }
.hint { color: #6c6b7a; font-size: 13px; }`,
      js: `const rows = document.querySelector('#rows');
const itemInput = document.querySelector('#item-input');
const priorityInput = document.querySelector('#priority-input');
const addBtn = document.querySelector('#add-btn');

// When Add is clicked, build a new row from the input values
// and append it to the tbody.
addBtn.addEventListener('click', () => {
  const item = itemInput.value.trim();
  const priority = priorityInput.value.trim();
  if (!item) return;             // skip empty items

  const tr = document.createElement('tr');

  const itemCell = document.createElement('td');
  itemCell.textContent = item;
  tr.appendChild(itemCell);

  const priorityCell = document.createElement('td');
  priorityCell.textContent = priority || 'Medium';
  tr.appendChild(priorityCell);

  rows.appendChild(tr);

  itemInput.value = '';
  priorityInput.value = '';
  itemInput.focus();
});

// When any row inside #rows is clicked, remove that row.
rows.addEventListener('click', (event) => {
  const row = event.target.closest('tr');
  if (row) row.remove();
});
`
    },
    hint: "Try changing the column headers in the HTML, or the hover color in the CSS. To add a third column, make a third createElement('td') in the click handler and another <th> in the thead.",
    expectedContains: [
      "createElement",
      "appendChild",
      "addEventListener",
      "remove"
    ]
  }
};
