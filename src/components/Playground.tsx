import type { PlaygroundKind } from "../types";
import { StringPlayground } from "./StringPlayground";
import { ArrayPlayground } from "./ArrayPlayground";
import { ObjectPlayground } from "./ObjectPlayground";
import { CSSPlayground } from "./CSSPlayground";
import { DOMEventPlayground } from "./DOMEventPlayground";
import { TokenizerPlayground } from "./TokenizerPlayground";
import { TypePlayground } from "./TypePlayground";
import { LoopPlayground } from "./LoopPlayground";
import { FunctionPlayground } from "./FunctionPlayground";
import { FormPlayground } from "./FormPlayground";
import { EmbeddingPlayground } from "./EmbeddingPlayground";

interface Props {
  spec: PlaygroundKind;
}

export function Playground({ spec }: Props) {
  switch (spec.kind) {
    case "string":
      return <StringPlayground language={spec.language} initial={spec.initial} />;
    case "array":
      return <ArrayPlayground language={spec.language} initial={spec.initial} />;
    case "object":
      return <ObjectPlayground language={spec.language} initial={spec.initial} />;
    case "css":
      return <CSSPlayground />;
    case "domEvent":
      return <DOMEventPlayground />;
    case "tokenizer":
      return <TokenizerPlayground initial={spec.initial} />;
    case "type":
      return <TypePlayground />;
    case "loop":
      return <LoopPlayground language={spec.language} />;
    case "function":
      return <FunctionPlayground />;
    case "form":
      return <FormPlayground />;
    case "embedding":
      return <EmbeddingPlayground />;
  }
}
