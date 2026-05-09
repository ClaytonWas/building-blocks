import { Link, useParams } from "react-router-dom";
import { type CSSProperties } from "react";
import { findTrack } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";
import { TrackPreview } from "../components/TrackPreview";

export function Track() {
  const { trackId = "" } = useParams();
  const track = findTrack(trackId);
  const { isCompleted } = useProgress();

  if (!track) {
    return (
      <div className="empty-state">
        <p>That track doesn't exist.</p>
        <Link to="/" className="back-link">← All tracks</Link>
      </div>
    );
  }

  const total = track.lessons.length;
  const done = track.lessons.filter((l) => isCompleted(track.id, l.id)).length;
  const progressPct = total > 0 ? (done / total) * 100 : 0;
  const trackStyle = { "--track-color": track.color } as CSSProperties;

  return (
    <article className="track-page" style={trackStyle}>
      <div className="track-topbar">
        <Link to="/" className="back-link">← All tracks</Link>
      </div>

      <header className="track-hero">
        <div className="track-hero-emoji" aria-hidden="true">{track.emoji}</div>
        <div className="track-hero-text">
          <div className="track-hero-meta">
            <span className="track-hero-tag">Track</span>
            <span aria-hidden="true">·</span>
            <span>{done} of {total} lessons done</span>
          </div>
          <h1>{track.title}</h1>
          <p>{track.blurb}</p>
        </div>
        <div className="track-hero-progress" aria-hidden="true">
          <div
            className="track-hero-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <div className="track-preview-wrap">
        <TrackPreview trackId={track.id} />
      </div>

      <div className="lesson-list">
        <ol>
          {track.lessons.map((lesson, idx) => {
            const lessonDone = isCompleted(track.id, lesson.id);
            return (
              <li key={lesson.id}>
                <Link
                  to={`/track/${track.id}/lesson/${lesson.id}`}
                  className="lesson-row"
                >
                  <span className="lesson-level">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="lesson-title">{lesson.title}</span>
                  <span className={`lesson-status ${lessonDone ? "done" : ""}`}>
                    {lessonDone ? "Completed" : "Start →"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </article>
  );
}
