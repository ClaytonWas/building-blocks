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
import { HoverPlayground } from "./HoverPlayground";
import { IfPlayground } from "./IfPlayground";
import { NeuronPlayground } from "./NeuronPlayground";
import { MiniNetworkPlayground } from "./MiniNetworkPlayground";
import { SamplingPlayground } from "./SamplingPlayground";
import { LiveImageClassifierPlayground } from "./LiveImageClassifierPlayground";

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
      return <TypePlayground language={spec.language} />;
    case "loop":
      return <LoopPlayground language={spec.language} />;
    case "function":
      return <FunctionPlayground />;
    case "form":
      return <FormPlayground />;
    case "embedding":
      return <EmbeddingPlayground />;
    case "hover":
      return <HoverPlayground />;
    case "ifelse":
      return <IfPlayground language={spec.language} />;
    case "neuron":
      return <NeuronPlayground />;
    case "mininet":
      return <MiniNetworkPlayground />;
    case "sampling":
      return <SamplingPlayground />;
    case "liveClassifier":
      return <LiveImageClassifierPlayground />;
  }
}
