import { useRef, useState } from "react";
import { MobileNetClassifier } from "../ai/classifiers/mobilenet";
import type { Prediction } from "../ai/classifier";

const PRESETS: Array<{ label: string; src: string }> = [
  { label: "Cat", src: "https://picsum.photos/seed/aicat/300/300" },
  { label: "Dog", src: "https://picsum.photos/seed/aidog/300/300" },
  { label: "Coffee", src: "https://picsum.photos/seed/coffee/300/300" },
  { label: "Mountain", src: "https://picsum.photos/seed/mountain/300/300" },
  { label: "Bicycle", src: "https://picsum.photos/seed/bike/300/300" },
  { label: "Pizza", src: "https://picsum.photos/seed/pizza/300/300" }
];

type Status = "idle" | "loading" | "ready" | "classifying" | "error";

export function LiveImageClassifierPlayground() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string>(PRESETS[0].src);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const classifierRef = useRef<MobileNetClassifier | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const loadModel = async () => {
    setStatus("loading");
    setError(null);
    try {
      const c = new MobileNetClassifier();
      await c.ready();
      classifierRef.current = c;
      setStatus("ready");
    } catch (e) {
      setError((e as Error).message || "Failed to load model");
      setStatus("error");
    }
  };

  const classify = async () => {
    if (!classifierRef.current || !imgRef.current) return;
    if (!imgRef.current.complete) {
      // Wait for the image to finish loading.
      await new Promise<void>((resolve) => {
        imgRef.current!.addEventListener("load", () => resolve(), { once: true });
      });
    }
    setStatus("classifying");
    setPredictions(null);
    try {
      const out = await classifierRef.current.classify(imgRef.current);
      setPredictions(out);
      setStatus("ready");
    } catch (e) {
      setError((e as Error).message || "Classification failed");
      setStatus("error");
    }
  };

  const pickImage = (src: string) => {
    setActive(src);
    setPredictions(null);
  };

  return (
    <div className="playground">
      <div className="playground-row">
        <label className="playground-label">Pick a picture</label>
        <div className="image-picker">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className={`image-thumb ${active === p.src ? "active" : ""}`}
              onClick={() => pickImage(p.src)}
            >
              <img src={p.src} alt={p.label} />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">The image being classified</label>
        <div className="classify-stage">
          <img
            ref={imgRef}
            src={active}
            alt="To classify"
            crossOrigin="anonymous"
            className="classify-image"
            onLoad={() => setPredictions(null)}
          />
          <div className="classify-controls">
            {status === "idle" && (
              <>
                <button
                  type="button"
                  className="chip chip-primary"
                  onClick={loadModel}
                >
                  Load model (~5 MB, one-time)
                </button>
                <small className="playground-hint">
                  Downloads MobileNet from a CDN the first time. Cached after.
                </small>
              </>
            )}
            {status === "loading" && (
              <small className="playground-hint">
                Downloading TensorFlow.js + MobileNet… this takes a few seconds.
              </small>
            )}
            {(status === "ready" || status === "classifying") && (
              <button
                type="button"
                className="chip chip-primary"
                onClick={classify}
                disabled={status === "classifying"}
              >
                {status === "classifying" ? "Thinking…" : "Classify this image"}
              </button>
            )}
            {status === "error" && (
              <div className="classify-error">
                Something went wrong: {error}. Check your connection and try
                reloading the page.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="playground-row">
        <label className="playground-label">Top guesses</label>
        {!predictions ? (
          <div className="playground-output">
            {status === "idle"
              ? "Load the model, then classify an image."
              : status === "loading"
              ? "Loading…"
              : "Pick an image and click Classify."}
          </div>
        ) : (
          <div className="prediction-list">
            {predictions.map((p, i) => (
              <div key={i} className="prediction-row">
                <span className="prediction-label">{p.label}</span>
                <div className="prediction-bar-track">
                  <div
                    className="prediction-bar-fill"
                    style={{ width: `${p.score * 100}%` }}
                  />
                </div>
                <span className="prediction-score">
                  {(p.score * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="playground-result">
        <div className="playground-pair">
          <div className="playground-pair-label">How it works under the hood</div>
          <div className="playground-output dom-explain">
            The image is shrunk to 224×224 pixels. Each pixel is a number that
            flows into the network. After ~3 million tiny multiplications and
            sums (the same math as the neuron in lesson one), the network
            outputs 1,000 numbers — one per category — that we sort to get
            the top guesses.
          </div>
        </div>
        <div className="playground-pair">
          <div className="playground-pair-label">The hot-swap point</div>
          <pre className="playground-code"><code>{`// Lessons depend on this interface, not on TF.js:
interface Classifier {
  ready(): Promise<void>;
  classify(image): Promise<Prediction[]>;
}

// MobileNet is one implementation. To use a different
// model, write a new file in src/ai/classifiers/.`}</code></pre>
        </div>
      </div>
    </div>
  );
}
