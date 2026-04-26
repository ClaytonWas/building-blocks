import { useState } from "react";
import type { FileType, LessonFiles } from "../types";
import { CodeEditor } from "./CodeEditor";

interface Props {
  fileTypes: FileType[];
  files: LessonFiles;
  onChange: (fileType: FileType, value: string) => void;
}

const TAB_LABELS: Record<FileType, string> = {
  html: "HTML",
  css: "CSS",
  js: "JS",
  python: "Python"
};

export function TabbedEditor({ fileTypes, files, onChange }: Props) {
  const [active, setActive] = useState<FileType>(fileTypes[0]);
  const showTabs = fileTypes.length > 1;

  return (
    <div className="tabbed-editor">
      {showTabs && (
        <div className="editor-tabs" role="tablist">
          {fileTypes.map((ft) => (
            <button
              key={ft}
              type="button"
              role="tab"
              aria-selected={active === ft}
              className={`editor-tab ${active === ft ? "active" : ""}`}
              onClick={() => setActive(ft)}
            >
              {TAB_LABELS[ft]}
            </button>
          ))}
        </div>
      )}
      <div className="editor-pane">
        <CodeEditor
          value={files[active] ?? ""}
          fileType={active}
          onChange={(next) => onChange(active, next)}
        />
      </div>
    </div>
  );
}
