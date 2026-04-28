import { useState } from "react";

interface Preset {
  jsLabel: string;
  pyLabel: string;
  display: string;
  jsLiteral: string;
  pyLiteral: string;
  jsType: string;
  pyType: string;
  asNumber: string;
  asString: string;
  asBoolean: string;
  truthy: boolean;
}

const PRESETS: Preset[] = [
  {
    jsLabel: "12",
    pyLabel: "12",
    display: "12",
    jsLiteral: "12",
    pyLiteral: "12",
    jsType: "number",
    pyType: "int",
    asNumber: "12",
    asString: '"12"',
    asBoolean: "true",
    truthy: true
  },
  {
    jsLabel: '"hello"',
    pyLabel: '"hello"',
    display: "hello",
    jsLiteral: '"hello"',
    pyLiteral: '"hello"',
    jsType: "string",
    pyType: "str",
    asNumber: "NaN",
    asString: '"hello"',
    asBoolean: "true",
    truthy: true
  },
  {
    jsLabel: '""',
    pyLabel: '""',
    display: "(empty string)",
    jsLiteral: '""',
    pyLiteral: '""',
    jsType: "string",
    pyType: "str",
    asNumber: "0",
    asString: '""',
    asBoolean: "false",
    truthy: false
  },
  {
    jsLabel: "true",
    pyLabel: "True",
    display: "true",
    jsLiteral: "true",
    pyLiteral: "True",
    jsType: "boolean",
    pyType: "bool",
    asNumber: "1",
    asString: '"true"',
    asBoolean: "true",
    truthy: true
  },
  {
    jsLabel: "0",
    pyLabel: "0",
    display: "0",
    jsLiteral: "0",
    pyLiteral: "0",
    jsType: "number",
    pyType: "int",
    asNumber: "0",
    asString: '"0"',
    asBoolean: "false",
    truthy: false
  },
  {
    jsLabel: "[1, 2, 3]",
    pyLabel: "[1, 2, 3]",
    display: "[1, 2, 3]",
    jsLiteral: "[1, 2, 3]",
    pyLiteral: "[1, 2, 3]",
    jsType: "object",
    pyType: "list",
    asNumber: "NaN",
    asString: '"1,2,3"',
    asBoolean: "true",
    truthy: true
  },
  {
    jsLabel: "null",
    pyLabel: "None",
    display: "null/None",
    jsLiteral: "null",
    pyLiteral: "None",
    jsType: "object",
    pyType: "NoneType",
    asNumber: "0",
    asString: '"null"',
    asBoolean: "false",
    truthy: false
  }
];

interface Props {
  language: "js" | "python";
}

export function TypePlayground({ language }: Props) {
  const [p, setP] = useState<Preset>(PRESETS[0]);

  const isJs = language === "js";
  const literal = isJs ? p.jsLiteral : p.pyLiteral;
  const typeName = isJs ? p.jsType : p.pyType;

  const code = isJs
    ? `let value = ${literal};
typeof value;     // "${typeName}"
Number(value);    // ${p.asNumber}
String(value);    // ${p.asString}
Boolean(value);   // ${p.asBoolean}`
    : `value = ${literal}
type(value)       # <class '${typeName}'>
int(value)        # ${p.asNumber === "NaN" ? "ValueError" : p.asNumber}
str(value)        # ${pyStr(p.asString)}
bool(value)       # ${pyBool(p.asBoolean)}`;

  const conversions = isJs
    ? [
        ["Number(value)", p.asNumber],
        ["String(value)", p.asString],
        ["Boolean(value)", p.asBoolean]
      ]
    : [
        ["int(value)", p.asNumber === "NaN" ? "ValueError" : p.asNumber],
        ["str(value)", pyStr(p.asString)],
        ["bool(value)", pyBool(p.asBoolean)]
      ];

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a value</label>
        <div className="playground-buttons">
          {PRESETS.map((preset) => {
            const label = isJs ? preset.jsLabel : preset.pyLabel;
            return (
              <button
                key={label}
                type="button"
                className={`chip ${p === preset ? "chip-active" : ""}`}
                onClick={() => setP(preset)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          What {isJs ? "JavaScript" : "Python"} thinks
        </label>
        <div className="type-table">
          <div className="type-row">
            <span className="type-key">value</span>
            <span className="type-val">{p.display}</span>
          </div>
          <div className="type-row">
            <span className="type-key">{isJs ? "typeof" : "type()"}</span>
            <code className="type-val mono">
              {isJs ? `"${typeName}"` : `<class '${typeName}'>`}
            </code>
          </div>
          <div className="type-row">
            <span className="type-key">truthy?</span>
            <span
              className={`type-val pill ${p.truthy ? "pill-on" : "pill-off"}`}
            >
              {p.truthy ? (isJs ? "true" : "True") : isJs ? "false" : "False"}
            </span>
          </div>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">
            Equivalent {isJs ? "JavaScript" : "Python"}
          </div>
          <pre className="playground-code"><code>{code}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Conversions</div>
          <div className="type-conversions">
            {conversions.map(([call, result]) => (
              <div key={call}>
                <code>{call}</code> → <strong>{result}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function pyStr(s: string) {
  // "true" → "'True'" etc — capitalize Python-style booleans
  if (s === '"true"') return "'True'";
  if (s === '"false"') return "'False'";
  if (s === '"null"') return "'None'";
  return s.replace(/"/g, "'");
}

function pyBool(b: string) {
  return b === "true" ? "True" : "False";
}
