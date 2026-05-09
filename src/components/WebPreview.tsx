import { useEffect, useMemo, useRef, useState } from "react";
import type { LessonFiles } from "../types";

interface Props {
  files: LessonFiles;
  hasJs: boolean;
  hasVisual?: boolean;
  runKey: number;
}

interface ConsoleLine {
  type: "log" | "error";
  text: string;
}

function buildSrcDoc(files: LessonFiles) {
  const html = files.html ?? "";
  const css = files.css ?? "";
  const js = files.js ?? "";

  const consoleShim = `
    <script>
      (function() {
        const send = (type, args) => {
          const text = args.map(a => {
            if (typeof a === 'object') { try { return JSON.stringify(a); } catch { return String(a); } }
            return String(a);
          }).join(' ');
          parent.postMessage({ __bb: true, type, text }, '*');
        };
        const origLog = console.log;
        const origErr = console.error;
        console.log = (...a) => { send('log', a); origLog.apply(console, a); };
        console.error = (...a) => { send('error', a); origErr.apply(console, a); };
        window.addEventListener('error', (e) => send('error', [e.message]));
      })();
    </script>
  `;

  const styleTag = css ? `<style>\n${css}\n</style>` : "";
  const userScript = js
    ? `<script>\ntry {\n${js}\n} catch (e) { console.error(e.message); }\n</script>`
    : "";

  return `<!doctype html>
<html>
<head>
${styleTag}
${consoleShim}
</head>
<body>
${html}
${userScript}
</body>
</html>`;
}

export function WebPreview({ files, hasJs, hasVisual = true, runKey }: Props) {
  // Snapshot files only at runKey changes — preview should not update while typing.
  const [snapshot, setSnapshot] = useState<LessonFiles>(files);
  const filesRef = useRef<LessonFiles>(files);
  filesRef.current = files;

  useEffect(() => {
    if (runKey === 0) return;
    setSnapshot(filesRef.current);
  }, [runKey]);

  const [logs, setLogs] = useState<ConsoleLine[]>([]);
  const srcDoc = useMemo(() => buildSrcDoc(snapshot), [snapshot]);

  useEffect(() => {
    setLogs([]);
    const onMessage = (e: MessageEvent) => {
      if (e.data && e.data.__bb) {
        setLogs((prev) => [...prev, { type: e.data.type, text: e.data.text }]);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [snapshot]);

  return (
    <div className={`web-preview ${hasVisual ? "" : "console-only"}`}>
      {hasVisual ? (
        <iframe
          title="preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="preview-frame"
        />
      ) : (
        <iframe
          title="runner"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="preview-frame-hidden"
          aria-hidden="true"
        />
      )}
      {hasJs && (
        <>
          <div className="console-label">Output</div>
          <div className="console">
            {logs.length === 0 ? (
              <div className="console-empty">
                Run your code to see console output here.
              </div>
            ) : (
              logs.map((line, i) => (
                <div key={i} className={`console-line console-${line.type}`}>
                  {line.text}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
