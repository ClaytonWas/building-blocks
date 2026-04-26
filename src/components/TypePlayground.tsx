import { useState } from "react";

interface Preset {
  label: string;
  display: string;
  jsLiteral: string;
  jsType: string;
  asNumber: string;
  asString: string;
  asBoolean: string;
  truthy: boolean;
}

const PRESETS: Preset[] = [
  {
    label: "12",
    display: "12",
    jsLiteral: "12",
    jsType: "number",
    asNumber: "12",
    asString: '"12"',
    asBoolean: "true",
    truthy: true
  },
  {
    label: '"hello"',
    display: "hello",
    jsLiteral: '"hello"',
    jsType: "string",
    asNumber: "NaN",
    asString: '"hello"',
    asBoolean: "true",
    truthy: true
  },
  {
    label: '""',
    display: "(empty string)",
    jsLiteral: '""',
    jsType: "string",
    asNumber: "0",
    asString: '""',
    asBoolean: "false",
    truthy: false
  },
  {
    label: "true",
    display: "true",
    jsLiteral: "true",
    jsType: "boolean",
    asNumber: "1",
    asString: '"true"',
    asBoolean: "true",
    truthy: true
  },
  {
    label: "0",
    display: "0",
    jsLiteral: "0",
    jsType: "number",
    asNumber: "0",
    asString: '"0"',
    asBoolean: "false",
    truthy: false
  },
  {
    label: "[1, 2, 3]",
    display: "[1, 2, 3]",
    jsLiteral: "[1, 2, 3]",
    jsType: "object",
    asNumber: "NaN",
    asString: '"1,2,3"',
    asBoolean: "true",
    truthy: true
  },
  {
    label: "null",
    display: "null",
    jsLiteral: "null",
    jsType: "object",
    asNumber: "0",
    asString: '"null"',
    asBoolean: "false",
    truthy: false
  }
];

export function TypePlayground() {
  const [p, setP] = useState<Preset>(PRESETS[0]);

  const code = `let value = ${p.jsLiteral};
typeof value;     // "${p.jsType}"
Number(value);    // ${p.asNumber}
String(value);    // ${p.asString}
Boolean(value);   // ${p.asBoolean}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a value</label>
        <div className="playground-buttons">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={`chip ${p.label === preset.label ? "chip-active" : ""}`}
              onClick={() => setP(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">What JavaScript thinks</label>
        <div className="type-table">
          <div className="type-row">
            <span className="type-key">value</span>
            <span className="type-val">{p.display}</span>
          </div>
          <div className="type-row">
            <span className="type-key">typeof</span>
            <code className="type-val mono">"{p.jsType}"</code>
          </div>
          <div className="type-row">
            <span className="type-key">truthy?</span>
            <span
              className={`type-val pill ${p.truthy ? "pill-on" : "pill-off"}`}
            >
              {p.truthy ? "true" : "false"}
            </span>
          </div>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Equivalent JavaScript</div>
          <pre className="playground-code"><code>{code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Conversions</div>
          <div className="type-conversions">
            <div>
              <code>Number(value)</code> → <strong>{p.asNumber}</strong>
            </div>
            <div>
              <code>String(value)</code> → <strong>{p.asString}</strong>
            </div>
            <div>
              <code>Boolean(value)</code> → <strong>{p.asBoolean}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
