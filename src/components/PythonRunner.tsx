import { useEffect, useRef, useState } from "react";

interface Props {
  code: string;
  runKey: number;
}

interface PyodideAPI {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideAPI>;
  }
}

const PYODIDE_VERSION = "0.26.2";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<PyodideAPI> | null = null;

function loadPyodideOnce(): Promise<PyodideAPI> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[data-pyodide]`
    ) as HTMLScriptElement | null;
    const start = () => {
      if (!window.loadPyodide) {
        reject(new Error("Pyodide failed to load"));
        return;
      }
      window
        .loadPyodide({ indexURL: PYODIDE_BASE })
        .then(resolve)
        .catch(reject);
    };
    if (existing) {
      if ((existing as HTMLScriptElement & { _loaded?: boolean })._loaded) {
        start();
      } else {
        existing.addEventListener("load", start);
      }
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_BASE}pyodide.js`;
    script.async = true;
    script.dataset.pyodide = "true";
    script.addEventListener("load", () => {
      (script as HTMLScriptElement & { _loaded?: boolean })._loaded = true;
      start();
    });
    script.addEventListener("error", () => reject(new Error("Could not load Pyodide")));
    document.head.appendChild(script);
  });
  return pyodidePromise;
}

export function PythonRunner({ code, runKey }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ready" | "error">(
    "idle"
  );
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const pyRef = useRef<PyodideAPI | null>(null);
  const lastRun = useRef(0);

  useEffect(() => {
    if (runKey === 0 || runKey === lastRun.current) return;
    lastRun.current = runKey;
    let cancelled = false;
    setOutput([]);
    setErrors([]);

    const run = async () => {
      try {
        if (!pyRef.current) {
          setStatus("loading");
          pyRef.current = await loadPyodideOnce();
        }
        if (cancelled) return;
        const py = pyRef.current!;
        const out: string[] = [];
        const err: string[] = [];
        py.setStdout({ batched: (s: string) => out.push(s) });
        py.setStderr({ batched: (s: string) => err.push(s) });
        setStatus("running");
        await py.runPythonAsync(code);
        if (cancelled) return;
        setOutput(out);
        setErrors(err);
        setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        setErrors([(e as Error).message]);
        setStatus("error");
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [code, runKey]);

  return (
    <div className="py-runner">
      <div className="console-label">
        Output
        {status === "loading" && <span className="py-status"> · loading Python (first run only)…</span>}
        {status === "running" && <span className="py-status"> · running…</span>}
      </div>
      <div className="console">
        {status === "idle" && (
          <div className="console-empty">Press Run to start your Python program.</div>
        )}
        {output.length > 0 &&
          output.map((line, i) => (
            <div key={`o-${i}`} className="console-line console-log">
              {line}
            </div>
          ))}
        {errors.length > 0 &&
          errors.map((line, i) => (
            <div key={`e-${i}`} className="console-line console-error">
              {line}
            </div>
          ))}
        {status === "ready" && output.length === 0 && errors.length === 0 && (
          <div className="console-empty">Your code ran but didn't print anything. Try using print(...).</div>
        )}
      </div>
    </div>
  );
}
