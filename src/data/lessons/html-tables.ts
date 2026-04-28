import type { Lesson } from "../../types";

export const htmlTables: Lesson = {
  id: "html-tables",
  trackId: "html",
  title: "Tables for Rows and Columns",
  level: 9,
  intro:
    "When information naturally fits into rows and columns — a class schedule, a leaderboard, the weather forecast — tables are the right tool.",
  concept: `A table has its own little family of tags. They always nest in the same shape:

\`\`\`
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Cell 1</td>
    <td>Cell 2</td>
  </tr>
</table>
\`\`\`

Each tag has a job:

- **\`<table>\`** — the whole table.
- **\`<tr>\`** — a *table row*. One row across.
- **\`<th>\`** — a *table header* cell. Browsers render it bold and centered.
- **\`<td>\`** — a *table data* cell. The regular cells.

Every \`<tr>\` should have the same number of cells (\`<th>\` or \`<td>\`) — that's how the columns line up.

### A cleaner shape with thead and tbody

For bigger tables, group the header row in \`<thead>\` and the data rows in \`<tbody>\`:

\`\`\`
<table>
  <thead>
    <tr><th>Day</th><th>Weather</th></tr>
  </thead>
  <tbody>
    <tr><td>Mon</td><td>Sunny</td></tr>
    <tr><td>Tue</td><td>Rainy</td></tr>
  </tbody>
</table>
\`\`\`

It looks the same to a sighted user, but screen readers know which cells are headers and which are data.

### Cells that span multiple columns or rows

Add \`colspan="2"\` to make a cell stretch across two columns. \`rowspan="2"\` stretches it down two rows. Use these sparingly — they're handy but make tables harder to read.

### One important note

Tables are for **data**, not for layout. Years ago people built whole pages out of tables; today we use \`<div>\`, Flexbox, and Grid for that. A table should hold things you'd put in a spreadsheet.`,
  examples: [
    {
      caption: "A simple weather table",
      code: `<table>
  <tr>
    <th>Day</th>
    <th>Weather</th>
    <th>High</th>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Sunny</td>
    <td>22°C</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Cloudy</td>
    <td>18°C</td>
  </tr>
</table>`,
      note: "First row is all <th> (headers). The other rows are all <td>. Three columns across.",
      tryIt: {
        html: `<table>
  <tr>
    <th>Day</th>
    <th>Weather</th>
    <th>High</th>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Sunny</td>
    <td>22°C</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Cloudy</td>
    <td>18°C</td>
  </tr>
</table>`
      }
    },
    {
      caption: "Same table with thead + tbody",
      code: `<table>
  <thead>
    <tr>
      <th>Day</th>
      <th>Weather</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mon</td>
      <td>Sunny</td>
    </tr>
    <tr>
      <td>Tue</td>
      <td>Rainy</td>
    </tr>
  </tbody>
</table>`,
      note: "Looks identical — but the structure is clearer to anyone reading the HTML or using assistive tech.",
      tryIt: {
        html: `<table>
  <thead>
    <tr>
      <th>Day</th>
      <th>Weather</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mon</td>
      <td>Sunny</td>
    </tr>
    <tr>
      <td>Tue</td>
      <td>Rainy</td>
    </tr>
  </tbody>
</table>`
      }
    },
    {
      caption: "A header that spans two columns",
      code: `<table>
  <tr>
    <th colspan="2">Pet Stats</th>
  </tr>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Whiskers</td>
    <td>4</td>
  </tr>
</table>`,
      note: "colspan=\"2\" makes one cell wide enough to cover two columns. The next row still has two separate cells.",
      tryIt: {
        html: `<table>
  <tr>
    <th colspan="2">Pet Stats</th>
  </tr>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Whiskers</td>
    <td>4</td>
  </tr>
</table>`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a table for your weekly schedule with three columns (Day, Subject, Time) and at least three rows of data. Use a header row with <th>, and put the data rows inside <tbody>.",
    files: {
      html: `<h1>My schedule</h1>

<table>
  <thead>
    <tr>
      <th>Day</th>
      <th>Subject</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    <!-- add 3 rows of <tr> with three <td> each -->
  </tbody>
</table>
`
    },
    hint: "Each row goes <tr><td>...</td><td>...</td><td>...</td></tr>. Make sure every row has three cells so the columns line up.",
    expectedContains: ["<table>", "<thead>", "<tbody>", "<tr>", "<th>", "<td>"]
  }
};
