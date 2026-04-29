import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Track } from "./pages/Track";
import { Lesson } from "./pages/Lesson";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="shell">
        <header className="site-header">
          <div className="site-header-inner">
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                <span /><span /><span /><span />
              </span>
              Building Blocks
            </Link>
            <nav className="site-nav" aria-label="Primary">
              <Link to="/dashboard" className="site-nav-link">
                For teachers
              </Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track/:trackId" element={<Track />} />
            <Route path="/track/:trackId/lesson/:lessonId" element={<Lesson />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            Built for curious minds, grades 4–8.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
