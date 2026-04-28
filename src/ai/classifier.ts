/**
 * The hot-swappable classifier interface. Lessons depend on this shape, not on
 * any specific ML library. To swap inference engines, write a new class in
 * src/ai/classifiers/ that satisfies this interface.
 */

export interface Prediction {
  label: string;
  /** Confidence between 0 and 1. */
  score: number;
}

export type ClassifierInput = HTMLImageElement | HTMLCanvasElement;

export interface Classifier {
  /** Resolves once weights/model are loaded and inference is possible. */
  ready(): Promise<void>;

  /** Returns predictions sorted by score, highest first. */
  classify(input: ClassifierInput): Promise<Prediction[]>;
}
