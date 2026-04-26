import { useState } from "react";

interface Props {
  language: "js" | "python";
  initial?: string[];
}

function formatJs(items: string[]) {
  return "[" + items.map((i) => `"${i}"`).join(", ") + "]";
}

function formatPython(items: string[]) {
  return "[" + items.map((i) => `"${i}"`).join(", ") + "]";
}

export function ArrayPlayground({
  language,
  initial = ["apple", "banana", "cherry"]
}: Props) {
  const [items, setItems] = useState<string[]>(initial);
  const [draft, setDraft] = useState("");
  const [lastCode, setLastCode] = useState<string>("// click a button to see the code that produced your list");

  const literal = language === "js" ? formatJs(items) : formatPython(items);

  const apply = (next: string[], code: string) => {
    setItems(next);
    setLastCode(code);
  };

  const push = () => {
    if (!draft.trim()) return;
    const value = draft.trim();
    apply(
      [...items, value],
      language === "js"
        ? `items.push("${value}");`
        : `items.append("${value}")`
    );
    setDraft("");
  };

  const pop = () => {
    if (items.length === 0) return;
    const removed = items[items.length - 1];
    apply(
      items.slice(0, -1),
      language === "js"
        ? `let last = items.pop(); // "${removed}"`
        : `last = items.pop()  # "${removed}"`
    );
  };

  const sort = () => {
    apply(
      [...items].sort(),
      language === "js" ? `items.sort();` : `items.sort()`
    );
  };

  const reverse = () => {
    apply(
      [...items].reverse(),
      language === "js" ? `items.reverse();` : `items.reverse()`
    );
  };

  const clear = () => {
    apply(
      [],
      language === "js" ? `items = [];` : `items = []`
    );
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Items</label>
        {items.length === 0 ? (
          <div className="array-vis array-vis-empty">empty</div>
        ) : (
          <div className="array-vis">
            {items.map((item, i) => (
              <div key={i} className="array-item">
                <div className="array-item-index">{i}</div>
                <div className="array-item-value">{item}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="playground-row">
        <label className="playground-label">Add an item</label>
        <div className="playground-inline">
          <input
            className="playground-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="type something..."
            spellCheck={false}
            onKeyDown={(e) => e.key === "Enter" && push()}
          />
          <button
            type="button"
            className="chip chip-primary"
            onClick={push}
          >
            Push
          </button>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Methods</label>
        <div className="playground-buttons">
          <button type="button" className="chip" onClick={pop}>Pop</button>
          <button type="button" className="chip" onClick={sort}>Sort</button>
          <button type="button" className="chip" onClick={reverse}>Reverse</button>
          <button type="button" className="chip" onClick={clear}>Clear</button>
        </div>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Last action</div>
          <pre className="playground-code"><code>{lastCode}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">Current value</div>
          <pre className="playground-code"><code>items = {literal}</code></pre>
        </div>
      </div>
    </div>
  );
}
