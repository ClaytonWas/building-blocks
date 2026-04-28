import { Link } from "react-router-dom";
import { tracks } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

export function Dashboard() {
  const { isCompleted } = useProgress();

  const totalLessons = tracks.reduce((s, t) => s + t.lessons.length, 0);
  const completedLessons = tracks.reduce(
    (s, t) =>
      s + t.lessons.filter((l) => isCompleted(t.id, l.id)).length,
    0
  );
  const tracksTouched = tracks.filter((t) =>
    t.lessons.some((l) => isCompleted(t.id, l.id))
  ).length;

  return (
    <article className="dashboard">
      <div className="container-wide">
        <header className="dashboard-head">
          <span className="home-eyebrow">For teachers</span>
          <h1>Course dashboard</h1>
          <p>
            Every track and lesson at a glance — titles, what each lesson
            teaches, the exact exercise prompt, and which playground (if any)
            is wired in. Useful for planning a session or checking what an
            exercise actually asks before assigning it.
          </p>

          <dl className="dashboard-stats">
            <div>
              <dt>Tracks</dt>
              <dd>{tracks.length}</dd>
            </div>
            <div>
              <dt>Lessons</dt>
              <dd>{totalLessons}</dd>
            </div>
            <div>
              <dt>Completed (this browser)</dt>
              <dd>
                {completedLessons} <span className="muted">/ {totalLessons}</span>
              </dd>
            </div>
            <div>
              <dt>Tracks touched</dt>
              <dd>
                {tracksTouched} <span className="muted">/ {tracks.length}</span>
              </dd>
            </div>
          </dl>

          <nav className="dashboard-jump" aria-label="Jump to track">
            {tracks.map((t) => (
              <a key={t.id} href={`#track-${t.id}`} className="dashboard-jump-link">
                <span
                  className="dashboard-jump-dot"
                  style={{ background: t.color }}
                  aria-hidden="true"
                />
                {t.title}
                <span className="dashboard-jump-count">{t.lessons.length}</span>
              </a>
            ))}
          </nav>
        </header>

        {tracks.map((track) => {
          const done = track.lessons.filter((l) =>
            isCompleted(track.id, l.id)
          ).length;
          return (
            <section
              key={track.id}
              id={`track-${track.id}`}
              className="dashboard-track"
            >
              <header className="dashboard-track-head">
                <div
                  className="dashboard-track-accent"
                  style={{ background: track.color }}
                  aria-hidden="true"
                />
                <div className="dashboard-track-meta">
                  <h2>{track.title}</h2>
                  <p>{track.blurb}</p>
                  <ul className="dashboard-track-stats">
                    <li>
                      <strong>{track.lessons.length}</strong> lesson
                      {track.lessons.length === 1 ? "" : "s"}
                    </li>
                    <li>
                      <strong>{done}</strong> / {track.lessons.length} done
                    </li>
                    <li>
                      runtime: <code>{track.runtime}</code>
                    </li>
                    <li>
                      files: <code>{track.fileTypes.join(", ")}</code>
                    </li>
                  </ul>
                </div>
                <Link
                  to={`/track/${track.id}`}
                  className="dashboard-track-open"
                >
                  Open track →
                </Link>
              </header>

              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th className="num-col">#</th>
                      <th>Title</th>
                      <th>What it teaches</th>
                      <th>Exercise prompt</th>
                      <th className="pg-col">Playground</th>
                    </tr>
                  </thead>
                  <tbody>
                    {track.lessons.map((lesson, idx) => {
                      return (
                        <tr key={lesson.id}>
                          <td className="num-col">
                            {String(idx + 1).padStart(2, "0")}
                          </td>
                          <td>
                            <Link
                              to={`/track/${track.id}/lesson/${lesson.id}`}
                              className="dashboard-lesson-link"
                            >
                              {lesson.title}
                            </Link>
                          </td>
                          <td className="muted">{lesson.intro}</td>
                          <td className="muted">{lesson.exercise.prompt}</td>
                          <td className="pg-col">
                            {lesson.playground ? (
                              <code>{lesson.playground.kind}</code>
                            ) : (
                              <span className="muted">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}
