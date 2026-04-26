import { Fragment, useState, type ReactNode } from "react";

interface Field {
  id: string;
  label: string;
  html: (id: string) => string;
  preview: (id: string) => ReactNode;
}

const FIELDS: Field[] = [
  {
    id: "text",
    label: "Text",
    html: (id) => `<label for="${id}">Name</label>
<input type="text" id="${id}" placeholder="Your name" />`,
    preview: (id) => (
      <div className="form-field">
        <label htmlFor={id}>Name</label>
        <input id={id} type="text" placeholder="Your name" />
      </div>
    )
  },
  {
    id: "email",
    label: "Email",
    html: (id) => `<label for="${id}">Email</label>
<input type="email" id="${id}" placeholder="you@example.com" />`,
    preview: (id) => (
      <div className="form-field">
        <label htmlFor={id}>Email</label>
        <input id={id} type="email" placeholder="you@example.com" />
      </div>
    )
  },
  {
    id: "number",
    label: "Number",
    html: (id) => `<label for="${id}">Age</label>
<input type="number" id="${id}" min="1" max="120" />`,
    preview: (id) => (
      <div className="form-field">
        <label htmlFor={id}>Age</label>
        <input id={id} type="number" min={1} max={120} />
      </div>
    )
  },
  {
    id: "range",
    label: "Slider",
    html: (id) => `<label for="${id}">Volume</label>
<input type="range" id="${id}" min="0" max="100" />`,
    preview: (id) => (
      <div className="form-field">
        <label htmlFor={id}>Volume</label>
        <input id={id} type="range" min={0} max={100} />
      </div>
    )
  },
  {
    id: "checkbox",
    label: "Checkbox",
    html: (id) => `<label>
  <input type="checkbox" id="${id}" />
  I agree
</label>`,
    preview: (id) => (
      <div className="form-field">
        <label className="form-inline">
          <input id={id} type="checkbox" /> I agree
        </label>
      </div>
    )
  },
  {
    id: "select",
    label: "Dropdown",
    html: (id) => `<label for="${id}">Favorite color</label>
<select id="${id}">
  <option>Red</option>
  <option>Green</option>
  <option>Blue</option>
</select>`,
    preview: (id) => (
      <div className="form-field">
        <label htmlFor={id}>Favorite color</label>
        <select id={id}>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </select>
      </div>
    )
  },
  {
    id: "textarea",
    label: "Textarea",
    html: (id) => `<label for="${id}">Tell us more</label>
<textarea id="${id}" rows="3"></textarea>`,
    preview: (id) => (
      <div className="form-field">
        <label htmlFor={id}>Tell us more</label>
        <textarea id={id} rows={3} />
      </div>
    )
  }
];

export function FormPlayground() {
  const [active, setActive] = useState<Set<string>>(new Set(["text", "email"]));

  const toggle = (id: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selected = FIELDS.filter((f) => active.has(f.id));
  const html = selected.length
    ? `<form>\n${selected
        .map((f) =>
          f
            .html(f.id)
            .split("\n")
            .map((l) => "  " + l)
            .join("\n")
        )
        .join("\n\n")}\n  <button type="submit">Send</button>\n</form>`
    : "<form>\n  <!-- pick some fields above -->\n</form>";

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick the fields you want</label>
        <div className="playground-buttons">
          {FIELDS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip ${active.has(f.id) ? "chip-active" : ""}`}
              onClick={() => toggle(f.id)}
            >
              {active.has(f.id) ? "✓ " : ""}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Live form</div>
          <form
            className="form-preview"
            onSubmit={(e) => e.preventDefault()}
          >
            {selected.length === 0 ? (
              <div className="console-empty">Pick a field to see it here.</div>
            ) : (
              selected.map((f) => (
                <Fragment key={f.id}>{f.preview(f.id)}</Fragment>
              ))
            )}
            {selected.length > 0 && (
              <button type="submit" className="form-submit">
                Send
              </button>
            )}
          </form>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Equivalent HTML</div>
          <pre className="playground-code"><code>{html}</code></pre>
        </div>
      </div>
    </div>
  );
}
