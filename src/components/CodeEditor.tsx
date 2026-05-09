import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import type { FileType } from "../types";

interface Props {
  value: string;
  onChange: (next: string) => void;
  fileType: FileType;
  height?: string;
}

function extensionsFor(fileType: FileType) {
  const lang = (() => {
    switch (fileType) {
      case "html":
        return html();
      case "css":
        return css();
      case "js":
        return javascript();
      case "python":
        return python();
    }
  })();
  return [lang, EditorView.lineWrapping];
}

export function CodeEditor({ value, onChange, fileType, height = "100%" }: Props) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height={height}
      theme={oneDark}
      extensions={extensionsFor(fileType)}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        autocompletion: true,
        tabSize: 2
      }}
    />
  );
}
