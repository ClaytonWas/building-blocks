import { Link } from "react-router-dom";
import { tracks } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

export function Home() {
  const { isCompleted } = useProgress();

  return (
    <article className="home">
      <div className="container-wide">
        <header className="home-hero">
          <span className="home-eyebrow">Coding for grades 4–8</span>
          <h1 className="home-title">Learn how computers really work.</h1>
          <p className="home-tagline">
            Short, hands-on lessons in HTML, CSS, JavaScript, Python, and the
            ideas behind modern AI. Read a little, run real code, build
            something of your own.
          </p>
        </header>

        <section className="tracks-section">
          <div className="tracks-section-head">
            <h2>Tracks</h2>
            <small>{tracks.length} available</small>
          </div>

          <ul className="tracks">
            {tracks.map((track) => {
              const total = track.lessons.length;
              const done = track.lessons.filter((l) =>
                isCompleted(track.id, l.id)
              ).length;
              return (
                <li key={track.id}>
                  <Link to={`/track/${track.id}`} className="track-card">
                    <div
                      className="track-card-accent"
                      style={{ background: track.color }}
                      aria-hidden="true"
                    />
                    <h3>{track.title}</h3>
                    <p>{track.blurb}</p>
                    <div className="track-card-meta">
                      <span>{total} lesson{total === 1 ? "" : "s"}</span>
                      <span className="track-card-progress">
                        {done} / {total}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </article>
  );
}
