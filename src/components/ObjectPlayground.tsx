import { useState } from "react";

interface Props {
  language: "js" | "python";
  initial?: Record<string, string>;
}

const DEFAULT_INITIAL: Record<string, string> = {
  name: "Ada",
  age: "12",
  pet: "fox"
};

function isNumeric(v: string) {
  return v.trim() !== "" && !isNaN(Number(v));
}

function formatValue(v: string) {
  return isNumeric(v) ? v : `"${v}"`;
}

function literal(obj: Record<string, string>, language: "js" | "python") {
  const entries = Object.entries(obj);
  if (entries.length === 0) return language === "js" ? "{}" : "{}";
  const inner = entries
    .map(([k, v]) => {
      const key = language === "js" ? k : `"${k}"`;
      return `  ${key}: ${formatValue(v)}`;
    })
    .join(",\n");
  return `{\n${inner}\n}`;
}

export function ObjectPlayground({ language, initial }: Props) {
  const [obj, setObj] = useState<Record<string, string>>(
    initial ?? DEFAULT_INITIAL
  );
  const [keyDraft, setKeyDraft] = useState("");
  const [valDraft, setValDraft] = useState("");
  const [lastCode, setLastCode] = useState<string>(
    language === "js"
      ? "// click around — code will appear here"
      : "# click around — code will appear here"
  );

  const apply = (next: Record<string, string>, code: string) => {
    setObj(next);
    setLastCode(code);
  };

  const setKey = () => {
    const k = keyDraft.trim();
    const v = valDraft.trim();
    if (!k || !v) return;
    const next = { ...obj, [k]: v };
    const accessor =
      language === "js" ? `obj.${k} = ${formatValue(v)};` : `obj["${k}"] = ${formatValue(v)}`;
    apply(next, accessor);
    setKeyDraft("");
    setValDraft("");
  };

  const removeKey = (k: string) => {
    const next = { ...obj };
    delete next[k];
    const code =
      language === "js" ? `delete obj.${k};` : `del obj["${k}"]`;
    apply(next, code);
  };

  const showKeys = () => {
    const code =
      language === "js"
        ? `Object.keys(obj); // ${JSON.stringify(Object.keys(obj))}`
        : `list(obj.keys())  # ${JSON.stringify(Object.keys(obj))}`;
    setLastCode(code);
  };

  const showValues = () => {
    const vals = Object.values(obj);
    const code =
      language === "js"
        ? `Object.values(obj); // ${JSON.stringify(vals)}`
        : `list(obj.values())  # ${JSON.stringify(vals)}`;
    setLastCode(code);
  };

  const safeGet = () => {
    const k = keyDraft.trim() || "missing";
    const present = k in obj;
    const result = present ? obj[k] : "default";
    const code =
      language === "js"
        ? `obj.${k} ?? "default"; // ${JSON.stringify(result)}`
        : `obj.get("${k}", "default")  # ${JSON.stringify(result)}`;
    setLastCode(code);
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">
          {language === "js" ? "Object" : "Dictionary"}
        </label>
        {Object.keys(obj).length === 0 ? (
          <div className="kv-vis kv-vis-empty">empty</div>
        ) : (
          <div className="kv-vis">
            {Object.entries(obj).map(([k, v]) => (
              <div key={k} className="kv-item">
                <div className="kv-key">{k}</div>
                <div className="kv-value">{v}</div>
                <button
                  type="button"
                  className="kv-remove"
                  onClick={() => removeKey(k)}
                  aria-label={`remove ${k}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="playground-row">
        <label className="playground-label">Add or update a key</label>
        <div className="playground-inline">
          <input
            className="playground-input kv-key-input"
            value={keyDraft}
            onChange={(e) => setKeyDraft(e.target.value)}
            placeholder="key"
            spellCheck={false}
          />
          <input
            className="playground-input"
            value={valDraft}
            onChange={(e) => setValDraft(e.target.value)}
            placeholder="value"
            spellCheck={false}
            onKeyDown={(e) => e.key === "Enter" && setKey()}
          />
          <button
            type="button"
            className="chip chip-primary"
            onClick={setKey}
          >
            Set
          </button>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Methods</label>
        <div className="playground-buttons">
          <button type="button" className="chip" onClick={showKeys}>
            keys()
          </button>
          <button type="button" className="chip" onClick={showValues}>
            values()
          </button>
          <button type="button" className="chip" onClick={safeGet}>
            safe get (uses key field)
          </button>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Last action</div>
          <pre className="playground-code"><code>{lastCode}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Current value</div>
          <pre className="playground-code"><code>obj = {literal(obj, language)}</code></pre>
        </div>
      </div>
    </div>
  );
}
