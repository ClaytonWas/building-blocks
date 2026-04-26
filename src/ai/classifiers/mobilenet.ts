import type { Classifier, ClassifierInput, Prediction } from "../classifier";

/**
 * Wraps TensorFlow.js's pretrained MobileNet for in-browser image
 * classification. TF.js + the model are dynamically imported so they only
 * land in the bundle (and download) when this file is actually used.
 *
 * If TF.js ever stops working, write a new file (e.g. onnx.ts) that
 * implements Classifier and swap it at the lesson level.
 */

interface MobileNetModel {
  classify(input: ClassifierInput): Promise<{ className: string; probability: number }[]>;
}

let modelPromise: Promise<MobileNetModel> | null = null;

async function loadModel(): Promise<MobileNetModel> {
  if (modelPromise) return modelPromise;
  modelPromise = (async () => {
    // Lazy-load both packages only when needed.
    const tf = await import("@tensorflow/tfjs");
    // Warm up the backend to avoid the first inference being slower.
    await tf.ready();
    const mobilenet = await import("@tensorflow-models/mobilenet");
    const model = await mobilenet.load({ version: 2, alpha: 0.5 });
    return model as unknown as MobileNetModel;
  })();
  return modelPromise;
}

export class MobileNetClassifier implements Classifier {
  private model: MobileNetModel | null = null;

  async ready(): Promise<void> {
    this.model = await loadModel();
  }

  async classify(input: ClassifierInput): Promise<Prediction[]> {
    if (!this.model) await this.ready();
    const raw = await this.model!.classify(input);
    return raw.map((r) => ({
      // MobileNet returns "tabby, tabby cat" — keep just the first label.
      label: r.className.split(",")[0].trim(),
      score: r.probability
    }));
  }
}
