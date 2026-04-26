# Building Blocks

**Interactive coding lessons for grades 4–8.** HTML, CSS, JavaScript, Python, and AI fundamentals - taught through hands-on playgrounds, real code editors, and previews.

> Designed to be picked up by a tutor in five minutes and used in a classroom, after-school program, or 1-on-1 session.

---

## Why it exists

Building Blocks aims for the middleground between no guidence and a full IDE, while keeping the portability of a web platform: **real code, real preview, real output.**

The platform is designed around four constraints:

- **No accounts.** A student can open the site and start a lesson in under 10 seconds. Progress is saved locally in their browser.
- **No backend.** Everything runs client-side. You can host it on any static file server, or even open `dist/index.html` from a USB stick.
- **One concept per lesson.** Each lesson teaches one idea (e.g. "what a string is") through the same four-part rhythm.
- **Show the code.** Every interactive element reveals the underlying code that produced the change. Kids never see "magic."

---

## Quick demo

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). That's it — no API keys, no environment variables, no database.

To produce a static build for hosting:

```bash
npm run build
# output is in dist/
```

The `dist/` folder is fully self-contained and can be served from any static host (GitHub Pages, Netlify, Vercel, S3, a school's intranet, etc.).

---

## Screenshots

> Captures will be in `docs/screenshots/` — paths below are placeholders.

**Homepage — track selection**

![Homepage with track cards](docs/screenshots/home.png)

**Track view — lesson list**

![A track's lesson list](docs/screenshots/track.png)

**Lesson — concept and worked examples**

![Lesson concept and examples](docs/screenshots/lesson-concept.png)

**Playground — interactive concept card (StringPlayground)**

![String playground showing methods](docs/screenshots/playground-string.png)

**Playground — CSS sliders with live preview**

![CSS playground with sliders](docs/screenshots/playground-css.png)

**Workspace — tabbed editor with side-by-side preview**

![Editor and preview](docs/screenshots/workspace.png)

---

## What's in the curriculum

Six tracks, each with multiple lessons and an interactive playground for the foundational concept.

| Track | What it covers |
|---|---|
| **HTML** | Tags, structure, lists, links — the skeleton of every web page |
| **CSS** | Colors, the box model, Flexbox — paired with a live CSS knob playground |
| **JavaScript** | Strings, arrays, objects — each with its own interactive method playground |
| **Web Combo** | HTML + CSS + JS together; components and DOM events |
| **Python** | Strings, lists, dictionaries — runs in-browser via Pyodide (no Python install) |
| **AI & Transformers** | A working Markov-chain "next-word predictor" with a tokenizer playground |

The lesson list updates automatically from [src/data/curriculum.ts](src/data/curriculum.ts) — adding a lesson is a one-file change plus an entry in the curriculum index.

---

## How a lesson works

Every lesson follows the same four-section rhythm so students learn the *shape* of a lesson once and never have to re-orient.

1. **The idea** — one or two short paragraphs introducing the concept in plain language. Code snippets when they help, never when they don't.
2. **Examples** — two or three worked examples with a one-line caption and a "what's happening" note. Each example has a **Try this in the editor →** button that loads the example into the workspace.
3. **Play with it** *(when applicable)* — an interactive widget where every click reveals both the result and the code that produced it. Kids learn by mutation, not memorization.
4. **Your turn** — a tabbed editor (HTML / CSS / JS / Python tabs as needed) with a live preview. A starter is provided. The system gently checks for a few key terms but doesn't grade — running and seeing output is the real test.

---

## For tutors

This section is for anyone using the platform with students.

- **You don't need to prep code.** Click the "Try this in the editor →" pill on any example and the code drops into the workspace.
- **Playgrounds are conversation tools.** Sit next to a student. Ask "what do you think will happen?" before clicking. I've gotten the best progress out of students with this way of thinking.
- **The Run button is intentional.** The preview won't update while the student types. They press Run when they're ready. 
- **Progress is per-browser.** If a student switches devices, they start fresh. This is intentional: no accounts means no logins to forget and no privacy concerns to disclose.

### Suggested first-session arc

For a 30-minute introductory session with a student new to coding:

1. **HTML → "Your First Web Page"** (5 min) — they make a page about themselves.
2. **CSS → "Painting the Page"** (10 min) — let them play in the CSSPlayground with the color and slider knobs before doing the exercise.
3. **JavaScript → "Strings"** (15 min) — the StringPlayground is genuinely fun; kids will iterate on the exercise without prompting.

That's the foundational arc. Subsequent sessions can follow the curriculum order, or jump straight to whichever track the student is curious about (Python? AI?). The tracks are independent.

---

## Design Methodologies

**Pedagogical framing.** The platform is built around a constructivist progression: students *manipulate* a concept (in the playground) before they're asked to *produce* it (in the exercise). The Show-the-Code design means abstraction is always grounded in concrete syntax — no black boxes.

**Cognitive load decisions.**
- One concept per lesson; lessons are short (~10–15 minutes of student work each).
- Single typeface (Inter) for body, single mono (JetBrains Mono) for code — reduces visual noise.
- No nested tabs, no modal dialogs, no notifications. The student's attention only ever moves between four predictable sections.
- Color is functional, not decorative: track colors disambiguate domain, the accent color marks interactive affordances.

**Accessibility considerations.**
- Semantic HTML (`<header>`, `<main>`, `<article>`, `<section>`, `<ol>`) so the lesson structure is screen-reader-navigable.
- Keyboard-operable: all controls are real buttons / inputs. No drag-and-drop required.
- Color is never the *only* signal — track stripes are paired with text labels, status badges include words ("Completed") not just check marks.

**Privacy posture.** Zero data collection by design. No analytics scripts, no cookies, no third-party fonts that aren't preconnected with `display=swap`. Pyodide is loaded from a public CDN on first use of a Python lesson; that is the only third-party network call beyond the initial site load.

**Curricular scope.** The current curriculum is a *vertical slice* — enough breadth to demonstrate the platform across all six tracks, but not yet a full course. Adding lessons is a one-file change (see "Extending the curriculum" below). The architecture is intentionally simple so a teacher with TypeScript familiarity can author content directly.

---

## Tech notes (for anyone extending the project)

- **Vite + React + TypeScript.** No state library, no UI framework — plain components and CSS variables.
- **CodeMirror 6** for the editor (lighter than Monaco, friendlier for this audience).
- **Sandboxed iframe** for HTML/CSS/JS execution; **Pyodide** for Python, lazy-loaded on first run.
- **localStorage** for progress and code drafts.
- **Routes:** `/`, `/track/:trackId`, `/track/:trackId/lesson/:lessonId`.

Project layout:

```
src/
  pages/         Home, Track, Lesson
  components/    CodeEditor, TabbedEditor, WebPreview, PythonRunner,
                 LessonText, Playground (+ widget components)
  data/
    curriculum.ts          Track + lesson registry
    lessons/*.ts           One file per lesson
  hooks/
    useProgress.ts         localStorage progress + drafts
  types.ts                 Lesson / Track / PlaygroundKind
```

---

## Extending the curriculum

To add a new lesson:

1. Create `src/data/lessons/your-lesson.ts` exporting a `Lesson` object.
2. Import and register it in `src/data/curriculum.ts` under the right track.

The `Lesson` shape is small and self-documenting in [src/types.ts](src/types.ts). Existing lessons in [src/data/lessons/](src/data/lessons/) are good copy-paste templates.

To add a new playground widget:

1. Add a variant to `PlaygroundKind` in [src/types.ts](src/types.ts).
2. Build the component in [src/components/](src/components/).
3. Register it in the switch inside [src/components/Playground.tsx](src/components/Playground.tsx).
4. Set `playground: { kind: "yourkind", ... }` on any lesson that should use it.

---

## License

Add your preferred license here (MIT is conventional for educational projects of this kind).
