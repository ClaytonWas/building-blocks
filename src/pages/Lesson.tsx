import { useMemo, useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { findLesson } from "../data/curriculum";
import { TabbedEditor } from "../components/TabbedEditor";
import { WebPreview } from "../components/WebPreview";
import { PythonRunner } from "../components/PythonRunner";
import { LessonText } from "../components/LessonText";
import { Playground } from "../components/Playground";
import { useProgress } from "../hooks/useProgress";
import type { FileType, LessonFiles } from "../types";

export function Lesson() {
  const { trackId = "", lessonId = "" } = useParams();
  const result = findLesson(trackId, lessonId);
  const { getDraft, saveDraft, resetDraft, markCompleted, isCompleted } =
    useProgress();

  const [files, setFiles] = useState<LessonFiles>(() => {
    if (!result) return {};
    return getDraft(trackId, lessonId) ?? result.lesson.exercise.files;
  });
  const [runKey, setRunKey] = useState(0);
  const [hintShown, setHintShown] = useState(false);

  const checkResult = useMemo(() => {
    if (!result) return null;
    const expected = result.lesson.exercise.expectedContains ?? [];
    if (expected.length === 0) return null;
    const allCode = Object.values(files).join("\n");
    const missing = expected.filter((needle) => !allCode.includes(needle));
    return { passed: missing.length === 0, missing };
  }, [files, result]);

  if (!result) {
    return (
      <div className="empty-state">
        <p>We couldn't find that lesson.</p>
        <Link to="/" className="back-link">← All tracks</Link>
      </div>
    );
  }

  const { lesson, track } = result;

  const handleFileChange = (fileType: FileType, next: string) => {
    const updated = { ...files, [fileType]: next };
    setFiles(updated);
    saveDraft(trackId, lessonId, updated);
  };

  const run = () => setRunKey((k) => k + 1);
  const reset = () => {
    setFiles(lesson.exercise.files);
    resetDraft(trackId, lessonId);
    setRunKey((k) => k + 1);
  };
  const finish = () => markCompleted(trackId, lessonId);
  const loadExample = (exampleFiles: LessonFiles) => {
    const merged = { ...files, ...exampleFiles };
    setFiles(merged);
    saveDraft(trackId, lessonId, merged);
    document
      .getElementById("workspace")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const completed = isCompleted(trackId, lessonId);
  const trackStyle = { "--track-color": track.color } as CSSProperties;
  const hasJs = track.fileTypes.includes("js");

  return (
    <article className="lesson-page" style={trackStyle}>
      <div className="lesson-topbar">
        <Link to={`/track/${track.id}`} className="back-link">
          ← {track.title}
        </Link>
        <div className="lesson-crumbs">
          <span className="track-pill">{track.title}</span>
          <span aria-hidden="true">·</span>
          <span>Lesson {lesson.level}</span>
        </div>
      </div>

      <header className="lesson-header">
        <h1>{lesson.title}</h1>
        <p className="lesson-intro">{lesson.intro}</p>
      </header>

      <section className="lesson-section">
        <div className="lesson-section-eyebrow">The idea</div>
        <h2>What's going on here</h2>
        <LessonText text={lesson.concept} />
      </section>

      <section className="lesson-section">
        <div className="lesson-section-eyebrow">Examples</div>
        <h2>See it in action</h2>
        <div className="examples">
          {lesson.examples.map((ex, i) => (
            <div key={i} className="example">
              <div className="example-head">
                <div className="example-caption">{ex.caption}</div>
                {ex.tryIt && (
                  <button
                    type="button"
                    className="try-it"
                    onClick={() => loadExample(ex.tryIt!)}
                  >
                    Try this in the editor →
                  </button>
                )}
              </div>
              <pre className="lesson-codeblock"><code>{ex.code}</code></pre>
              {ex.note && <div className="example-note">{ex.note}</div>}
            </div>
          ))}
        </div>
      </section>

      {lesson.playground && (
        <section className="lesson-section">
          <div className="lesson-section-eyebrow">Play with it</div>
          <h2>Click around — every button shows you the code</h2>
          <Playground spec={lesson.playground} />
        </section>
      )}

      <section
        id="workspace"
        className="lesson-section lesson-section-wide"
      >
        <div className="lesson-section-eyebrow">Your turn</div>
        <h2>Try it yourself</h2>
        <p className="exercise-prompt">{lesson.exercise.prompt}</p>

        <div className="workspace-toolbar">
          <button className="btn primary" onClick={run}>Run</button>
          <button className="btn ghost" onClick={reset}>Reset</button>
          {lesson.exercise.hint && (
            <button
              className="btn ghost"
              onClick={() => setHintShown((s) => !s)}
            >
              {hintShown ? "Hide hint" : "Show hint"}
            </button>
          )}
        </div>

        {hintShown && lesson.exercise.hint && (
          <div className="hint">{lesson.exercise.hint}</div>
        )}

        <div className="workspace-split">
          <div className="workspace-pane workspace-editor">
            <TabbedEditor
              fileTypes={track.fileTypes}
              files={files}
              onChange={handleFileChange}
            />
          </div>
          <div className="workspace-pane workspace-output">
            {track.runtime === "python" ? (
              <PythonRunner code={files.python ?? ""} runKey={runKey} />
            ) : (
              <WebPreview files={files} hasJs={hasJs} runKey={runKey} />
            )}
          </div>
        </div>

        {checkResult && (
          <div className={`check-card ${checkResult.passed ? "pass" : "todo"}`}>
            {checkResult.passed ? (
              <>
                <strong>Looking good.</strong> Your code includes everything we
                were looking for. Run it to confirm it does what you want, then
                mark the lesson done.
              </>
            ) : (
              <>
                <strong>Almost there.</strong> Try also using:
                {checkResult.missing.map((m, idx) => (
                  <code key={idx} className="inline-needle">{m}</code>
                ))}
              </>
            )}
          </div>
        )}

        <div className="finish-row">
          <button
            className="btn primary"
            onClick={finish}
            disabled={completed}
          >
            {completed ? "Lesson complete" : "Mark lesson done"}
          </button>
        </div>
      </section>
    </article>
  );
}
