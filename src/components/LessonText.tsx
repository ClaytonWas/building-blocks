import { Fragment, type ReactNode } from "react";

interface Props {
  text: string;
}

function renderInline(line: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }
    const piece = match[0];
    if (piece.startsWith("**")) {
      tokens.push(<strong key={key++}>{piece.slice(2, -2)}</strong>);
    } else {
      tokens.push(<code key={key++}>{piece.slice(1, -1)}</code>);
    }
    lastIndex = match.index + piece.length;
  }
  if (lastIndex < line.length) tokens.push(line.slice(lastIndex));
  return tokens;
}

export function LessonText({ text }: Props) {
  const blocks: ReactNode[] = [];
  const lines = text.split("\n");
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre key={key++} className="lesson-codeblock">
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    const paragraph: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("```")) {
      paragraph.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++}>
        {paragraph.map((p, idx) => (
          <Fragment key={idx}>
            {renderInline(p)}
            {idx < paragraph.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </p>
    );
  }
  return <div className="lesson-text">{blocks}</div>;
}
