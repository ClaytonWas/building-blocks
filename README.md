# Building Blocks

Interactive coding lessons for I/S students (intermediate/senior, roughly grades 4–8). Six tracks — HTML, CSS, JavaScript, a Web combo, Python, and AI fundamentals — each with runnable code playgrounds and a tabbed editor with live preview. Everything runs client-side; progress and code drafts live in `localStorage`.

The goal is to demonstrate the platform across all six tracks and make adding more lessons cheap.

## Run it

```bash
npm install
npm run dev
```

To produce a static bundle:

```bash
npm run build
# serve dist/ from any static host
```

No backend, no auth, no analytics, no environment variables. The only third-party network call is Pyodide (~10 MB) loaded from a CDN the first time a Python lesson runs.

## Routes

| Path | Page |
|---|---|
| `/` | Track index |
| `/track/:trackId` | Lessons in a track, with a live preview of what the track is about |
| `/track/:trackId/lesson/:lessonId` | The lesson itself |
| `/dashboard` | Teacher overview — every track and lesson at a glance |

## Curriculum

| Track | Lessons | Notes |
|---|---|---|
| HTML | 4 | Tags, lists, forms |
| CSS | 3 | Box model, hover, layout |
| JavaScript | 8 | Variables through functions |
| Web combo | 2 | HTML + CSS + JS together |
| Python | 7 | Variables through functions, runs in-browser via Pyodide |
| AI & Transformers | 6 | Tokenizers, embeddings, single neuron, X-vs-O network, MobileNet image classifier |

The track and lesson registry is [src/data/curriculum.ts](src/data/curriculum.ts). Adding content is a one-file change plus an entry in that registry.

## Lesson shape

Every lesson has the same four sections so students don't have to re-orient between lessons:

1. **The idea** — a short prose explanation.
2. **Examples** — annotated code with a "Try this in the editor" button that loads the example into the workspace.
3. **Play with it** *(when applicable)* — an interactive widget that always shows the underlying code.
4. **Your turn** — tabbed editor + live preview. The student presses Run to see output. Nothing is auto-graded; the system optionally checks that a few key terms appear in the code.

## Stack

- Vite + React + TypeScript. No state library, no UI framework.
- CodeMirror 6 for the editor.
- Sandboxed iframe for HTML/CSS/JS execution.
- Pyodide for Python (lazy-loaded from CDN on first use).
- `localStorage` for completion and code drafts.

```
src/
  pages/         Home, Track, Lesson, Dashboard
  components/    editor, preview, playground widgets, track previews
  ai/            tiny in-browser classifiers (X/O net, MobileNet wrapper)
  data/
    curriculum.ts          track + lesson registry
    lessons/*.ts           one file per lesson
  hooks/
    useProgress.ts         localStorage progress + drafts
  types.ts                 Lesson / Track / PlaygroundKind
```

## Adding a lesson

1. Create `src/data/lessons/<slug>.ts` exporting a `Lesson`.
2. Import it and append to the right track in [src/data/curriculum.ts](src/data/curriculum.ts).

The `Lesson` shape is in [src/types.ts](src/types.ts). Existing files in [src/data/lessons/](src/data/lessons/) are the templates.

## Adding a playground widget

1. Add a variant to `PlaygroundKind` in [src/types.ts](src/types.ts).
2. Build the component in [src/components/](src/components/).
3. Wire it into the switch in [src/components/Playground.tsx](src/components/Playground.tsx).
4. Reference it from a lesson via `playground: { kind: "...", ... }`.

## For teachers

- Open [`/dashboard`](http://localhost:5173/dashboard) for a single-page view of every track and lesson — titles, what each lesson teaches, the exact exercise prompt, and which playground (if any) is wired in. Useful for planning a session or checking what an exercise actually asks before assigning it.
- Progress is per-browser. There are no accounts and no logins. If a student switches devices they start fresh, and clearing site data resets completion.
- The Run button is intentional. The preview does not update while the student is typing; they press Run when they're ready. Teachers have asked us to keep this.

## Limitations to know about

- The curriculum is partial. Gaps between tracks are intentional; adding lessons is meant to be cheap.
- The AI track is conceptual. It teaches what neurons, embeddings, and a tiny classifier do; it is not a practical ML toolkit.
- The first Python lesson on a fresh browser pauses for a few seconds to download Pyodide. Subsequent runs are instant.
- Some pre-existing lessons reference playground kinds (`mininet`, `neuron`, `sampling`, `liveClassifier`, etc.) that are now wired up. If you write a lesson with a kind that isn't in [src/components/Playground.tsx](src/components/Playground.tsx), the `Play with it` section will silently render nothing.

## License

MIT — see `LICENSE`. (If `LICENSE` is missing, treat the project as MIT and add the file before redistribution.)
