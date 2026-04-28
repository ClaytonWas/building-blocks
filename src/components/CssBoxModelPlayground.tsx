import { useState } from "react";

export function CssBoxModelPlayground() {
  const [padding, setPadding] = useState(16);
  const [margin, setMargin] = useState(12);

  const cssRule = `.box {
  padding: ${padding}px;
  margin: ${margin}px;
}`;

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">
          Slide each one and watch what changes
        </label>
        <div className="bm-knobs">
          <label className="knob">
            <span className="knob-label">padding</span>
            <input
              type="range"
              min={0}
              max={36}
              value={padding}
              onChange={(e) => setPadding(+e.target.value)}
            />
            <code className="knob-value">{padding}px</code>
          </label>
          <label className="knob">
            <span className="knob-label">margin</span>
            <input
              type="range"
              min={0}
              max={36}
              value={margin}
              onChange={(e) => setMargin(+e.target.value)}
            />
            <code className="knob-value">{margin}px</code>
          </label>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">
          Two stacked boxes — orange shows margin, green shows padding
        </label>
        <div className="bm-stage">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bm-margin"
              style={{ padding: `${margin}px` }}
            >
              <div
                className="bm-padding"
                style={{ padding: `${padding}px` }}
              >
                <span className="bm-content">Box {i}</span>
              </div>
            </div>
          ))}
        </div>
        <small className="playground-hint">
          <strong>Padding</strong> (green) is space INSIDE the box, between the
          edge and the content. <strong>Margin</strong> (orange) is space
          OUTSIDE the box, pushing it away from neighbors.
        </small>
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">Equivalent CSS</div>
          <pre className="playground-code"><code>{cssRule}</code></pre>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">When to use which</div>
          <div className="playground-output dom-explain">
            Reach for <strong>padding</strong> when a button or card feels too
            cramped. Reach for <strong>margin</strong> when two things are too
            close together. Both take pixel values, percentages, or different
            values per side: <code>padding: 8px 16px</code> means 8px top/bottom,
            16px left/right.
          </div>
        </div>
      </div>
    </div>
  );
}
