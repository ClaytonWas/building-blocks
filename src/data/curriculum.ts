import type { Track } from "../types";
import { htmlIntro } from "./lessons/html-intro";
import { htmlImages } from "./lessons/html-images";
import { htmlLists } from "./lessons/html-lists";
import { htmlForms } from "./lessons/html-forms";
import { cssIntro } from "./lessons/css-intro";
import { cssHover } from "./lessons/css-hover";
import { cssLayout } from "./lessons/css-layout";
import { jsVariables } from "./lessons/js-variables";
import { jsStrings } from "./lessons/js-strings";
import { jsIf } from "./lessons/js-if";
import { jsMath } from "./lessons/js-math";
import { jsArrays } from "./lessons/js-arrays";
import { jsLoops } from "./lessons/js-loops";
import { jsObjects } from "./lessons/js-objects";
import { jsFunctions } from "./lessons/js-functions";
import { webCombined } from "./lessons/web-combined";
import { webComponents } from "./lessons/web-components";
import { pythonVariables } from "./lessons/python-variables";
import { pythonStrings } from "./lessons/python-strings";
import { pythonIf } from "./lessons/python-if";
import { pythonLists } from "./lessons/python-lists";
import { pythonLoops } from "./lessons/python-loops";
import { pythonDicts } from "./lessons/python-dicts";
import { pythonFunctions } from "./lessons/python-functions";
import { aiIntro } from "./lessons/ai-intro";
import { aiSampling } from "./lessons/ai-sampling";
import { aiEmbeddings } from "./lessons/ai-embeddings";
import { aiNeuron } from "./lessons/ai-neuron";
import { aiNetwork } from "./lessons/ai-network";
import { aiRealNetwork } from "./lessons/ai-real-network";

export const tracks: Track[] = [
  {
    id: "html",
    title: "HTML",
    emoji: "🧱",
    blurb: "The skeleton of every web page.",
    color: "#ff7a59",
    runtime: "web",
    fileTypes: ["html"],
    lessons: [htmlIntro, htmlImages, htmlLists, htmlForms]
  },
  {
    id: "css",
    title: "CSS",
    emoji: "🎨",
    blurb: "Make your pages look amazing.",
    color: "#4dabf7",
    runtime: "web",
    fileTypes: ["html", "css"],
    lessons: [cssIntro, cssHover, cssLayout]
  },
  {
    id: "js",
    title: "JavaScript",
    emoji: "⚡",
    blurb: "Make pages do things.",
    color: "#fcc419",
    runtime: "web",
    fileTypes: ["js"],
    lessons: [
      jsVariables,
      jsStrings,
      jsIf,
      jsMath,
      jsArrays,
      jsLoops,
      jsObjects,
      jsFunctions
    ]
  },
  {
    id: "web",
    title: "Web Combo",
    emoji: "🌐",
    blurb: "HTML + CSS + JS together.",
    color: "#69db7c",
    runtime: "web",
    fileTypes: ["html", "css", "js"],
    lessons: [webCombined, webComponents]
  },
  {
    id: "python",
    title: "Python",
    emoji: "🐍",
    blurb: "A friendly language used everywhere.",
    color: "#9775fa",
    runtime: "python",
    fileTypes: ["python"],
    lessons: [
      pythonVariables,
      pythonStrings,
      pythonIf,
      pythonLists,
      pythonLoops,
      pythonDicts,
      pythonFunctions
    ]
  },
  {
    id: "ai",
    title: "AI & Transformers",
    emoji: "🤖",
    blurb: "Peek inside how ChatGPT-like models work.",
    color: "#f783ac",
    runtime: "web",
    fileTypes: ["js"],
    lessons: [
      aiIntro,
      aiSampling,
      aiEmbeddings,
      aiNeuron,
      aiNetwork,
      aiRealNetwork
    ]
  }
];

export function findTrack(id: string) {
  return tracks.find((t) => t.id === id);
}

export function findLesson(trackId: string, lessonId: string) {
  const track = findTrack(trackId);
  if (!track) return undefined;
  const lesson = track.lessons.find((l) => l.id === lessonId);
  return lesson ? { track, lesson } : undefined;
}
