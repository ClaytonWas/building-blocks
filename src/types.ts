export type FileType = "html" | "css" | "js" | "python";

export type LessonFiles = Partial<Record<FileType, string>>;

export type TrackId =
  | "html"
  | "css"
  | "js"
  | "web"
  | "python"
  | "ai";

export interface Track {
  id: TrackId;
  title: string;
  emoji: string;
  blurb: string;
  color: string;
  runtime: "web" | "python";
  fileTypes: FileType[];
  lessons: Lesson[];
}

export interface Example {
  caption: string;
  code: string;
  note?: string;
  /** When set, an example shows a "Try it →" button that loads these files into the editor. */
  tryIt?: LessonFiles;
}

export type PlaygroundKind =
  | { kind: "string"; language: "js" | "python"; initial?: string }
  | { kind: "array"; language: "js" | "python"; initial?: string[] }
  | {
      kind: "object";
      language: "js" | "python";
      initial?: Record<string, string>;
    }
  | { kind: "css" }
  | { kind: "domEvent" }
  | { kind: "tokenizer"; initial?: string }
  | { kind: "type"; language: "js" | "python" }
  | { kind: "loop"; language: "js" | "python" }
  | { kind: "function" }
  | { kind: "form" }
  | { kind: "embedding" }
  | { kind: "ifelse"; language: "js" | "python" }
  | { kind: "hover" }
  | { kind: "sampling" }
  | { kind: "neuron" }
  | { kind: "mininet" }
  | { kind: "liveClassifier" };

export interface Lesson {
  id: string;
  trackId: TrackId;
  title: string;
  level: number;
  intro: string;
  concept: string;
  examples: Example[];
  /** Optional interactive widget shown between examples and the exercise. */
  playground?: PlaygroundKind;
  exercise: {
    prompt: string;
    files: LessonFiles;
    hint?: string;
    expectedContains?: string[];
  };
}
