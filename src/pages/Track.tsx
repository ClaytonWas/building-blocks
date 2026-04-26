import { Link, useParams } from "react-router-dom";
import { findTrack } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

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

  return (
    <article className="track-page">
      <header className="track-page-head">
        <Link to="/" className="back-link">← All tracks</Link>
        <div
          className="track-page-accent"
          style={{ background: track.color }}
          aria-hidden="true"
        />
        <h1>{track.title}</h1>
        <p>{track.blurb}</p>
      </header>

      <div className="lesson-list">
        <ol>
          {track.lessons.map((lesson, idx) => {
            const done = isCompleted(track.id, lesson.id);
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
                  <span className={`lesson-status ${done ? "done" : ""}`}>
                    {done ? "Completed" : "Start →"}
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
