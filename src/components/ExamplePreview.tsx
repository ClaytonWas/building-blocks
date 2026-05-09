import { useEffect, useMemo, useState } from "react";
import type { Example, FileType, LessonFiles } from "../types";

interface Props {
  example: Example;
  fileTypes: FileType[];
  runtime: "web" | "python";
  onTryIt?: () => void;
}

interface ConsoleLine {
  type: "log" | "error";
  text: string;
}

function buildSrcDoc(files: LessonFiles, channelId: string) {
  const html = files.html ?? "";
  const css = files.css ?? "";
  const js = files.js ?? "";

  const consoleShim = `
    <script>
      (function() {
        const CHANNEL = ${JSON.stringify(channelId)};
        const send = (type, args) => {
          const text = args.map(a => {
            if (typeof a === 'object') { try { return JSON.stringify(a); } catch { return String(a); } }
            return String(a);
          }).join(' ');
          parent.postMessage({ __bbExample: CHANNEL, type, text }, '*');
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

export function ExamplePreview({ example, fileTypes, runtime, onTryIt }: Props) {
  const channelId = useMemo(
    () => `ex-${Math.random().toString(36).slice(2, 10)}`,
    []
  );

  const previewFiles: LessonFiles | null = useMemo(() => {
    if (runtime !== "web") return null;
    if (example.tryIt) return example.tryIt;
    // Fallback: if no tryIt, infer from track fileTypes
    if (fileTypes.includes("html") && !fileTypes.includes("js") && !fileTypes.includes("css")) {
      return { html: example.code };
    }
    return null;
  }, [example, fileTypes, runtime]);

  const hasJs = Boolean(previewFiles?.js);
  const hasVisual = Boolean(previewFiles?.html || previewFiles?.css);

  const srcDoc = useMemo(
    () => (previewFiles ? buildSrcDoc(previewFiles, channelId) : ""),
    [previewFiles, channelId]
  );

  const [logs, setLogs] = useState<ConsoleLine[]>([]);

  useEffect(() => {
    setLogs([]);
    if (!previewFiles) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data && e.data.__bbExample === channelId) {
        setLogs((prev) => [...prev, { type: e.data.type, text: e.data.text }]);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [previewFiles, channelId]);

  return (
    <div className="example">
      <div className="example-head">
        <div className="example-caption">{example.caption}</div>
        {onTryIt && (
          <button type="button" className="try-it" onClick={onTryIt}>
            Try this in the editor →
          </button>
        )}
      </div>

      <div className={`example-split ${previewFiles ? "" : "code-only"}`}>
        <div className="example-code-pane">
          <div className="example-pane-label">Code</div>
          <pre className="lesson-codeblock"><code>{example.code}</code></pre>
        </div>

        {previewFiles && (
          <div className="example-preview-pane">
            <div className="example-pane-label">
              {hasVisual ? "Live preview" : "Console output"}
            </div>
            <div className="example-preview-stage">
              <iframe
                title={example.caption}
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                className={
                  hasVisual ? "example-preview-frame" : "example-preview-frame-hidden"
                }
                aria-hidden={hasVisual ? undefined : true}
              />
              {hasJs && (
                <div
                  className={`example-preview-console ${hasVisual ? "" : "fill"}`}
                >
                  {logs.length === 0 ? (
                    <div className="console-empty">
                      {hasVisual ? "Console output appears here." : "Running…"}
                    </div>
                  ) : (
                    logs.map((line, i) => (
                      <div
                        key={i}
                        className={`console-line console-${line.type}`}
                      >
                        {line.text}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {example.note && <div className="example-note">{example.note}</div>}
    </div>
  );
}
