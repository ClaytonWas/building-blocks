import type { Lesson } from "../../types";

const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_POSTER = "https://picsum.photos/seed/bunny/600/340";

export const htmlVideos: Lesson = {
  id: "html-videos",
  trackId: "html",
  title: "Videos on a Page",
  level: 7,
  intro:
    "Pictures are great, but sometimes you need motion. The video tag puts a real, playable video right on your page — with built-in play, pause, and volume controls.",
  concept: `The \`<video>\` tag puts a video on a page. It looks a lot like \`<img>\`, with a few important differences:

\`\`\`
<video src="movie.mp4" controls></video>
\`\`\`

Two things to notice:

1. **It has a closing tag** — \`<video>...</video>\`. Unlike \`<img>\`, the video tag wraps content.
2. **You almost always want the \`controls\` attribute.** Without it, there are no buttons to play, pause, or change the volume — the video just sits there.

### Useful attributes

- **\`controls\`** — show the play/pause/volume bar.
- **\`width\`** / **\`height\`** — pick the size in pixels.
- **\`poster\`** — an image to show before the video plays. Like the cover of a book.
- **\`autoplay\`** — start playing as soon as the page loads. Many browsers will only allow this if you also add \`muted\`.
- **\`muted\`** — start with the sound off.
- **\`loop\`** — play forever, restarting at the end.

### Multiple sources

Browsers don't all play the same video file types. To support more browsers, list several files inside the video tag using \`<source>\`:

\`\`\`
<video controls width="400">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  Your browser doesn't support video.
</video>
\`\`\`

The browser tries each \`<source>\` from top to bottom and uses the first one it understands. Plain text inside the video tag (after the sources) only shows if NO source works.

### A note on audio

There's also \`<audio>\` for sound-only files. Same idea, same attributes (\`controls\`, \`autoplay\`, \`loop\`, etc.) — just no picture.`,
  examples: [
    {
      caption: "A simple video with controls",
      code: `<video src="${SAMPLE_VIDEO}" controls width="400"></video>`,
      note: "Without controls, there'd be no play button. Always include it unless you have a reason not to.",
      tryIt: {
        html: `<video src="${SAMPLE_VIDEO}" controls width="400"></video>`
      }
    },
    {
      caption: "A video with a poster image",
      code: `<video
  src="${SAMPLE_VIDEO}"
  poster="${SAMPLE_POSTER}"
  controls
  width="400"
></video>`,
      note: "The poster shows before the user hits play. Without one, the browser shows a black box.",
      tryIt: {
        html: `<video
  src="${SAMPLE_VIDEO}"
  poster="${SAMPLE_POSTER}"
  controls
  width="400"
></video>`
      }
    },
    {
      caption: "Autoplay that starts muted (the only kind that's allowed)",
      code: `<video
  src="${SAMPLE_VIDEO}"
  autoplay
  muted
  loop
  width="400"
></video>`,
      note: "Browsers block videos that try to autoplay with sound — too annoying. autoplay + muted + loop is great for short background clips.",
      tryIt: {
        html: `<video
  src="${SAMPLE_VIDEO}"
  autoplay
  muted
  loop
  width="400"
></video>`
      }
    }
  ],
  exercise: {
    prompt:
      "Build a small page with a heading, a short paragraph introducing the video, and a video tag that's 400px wide, has controls, and uses the poster image below.",
    files: {
      html: `<h1>My favorite short film</h1>

<p>Write a sentence introducing the video.</p>

<!-- add a <video> tag here. Use:
       src="${SAMPLE_VIDEO}"
       poster="${SAMPLE_POSTER}"
       controls
       width="400"
-->
`
    },
    hint: "<video src=\"...\" poster=\"...\" controls width=\"400\"></video>. Make sure to close the tag with </video>.",
    expectedContains: ["<video", "controls", "</video>"]
  }
};
