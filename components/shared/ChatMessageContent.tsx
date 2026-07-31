import type { ReactNode } from "react";

type ChatMessageContentProps = {
  content: string;
};

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <a
          key={`${keyPrefix}-a-${i++}`}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="break-all font-medium text-primary underline underline-offset-2"
        >
          {token}
        </a>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function ChatMessageContent({ content }: ChatMessageContentProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-1.5" />;

        const numbered = /^(\d+)\.\s+(.+)$/.exec(trimmed);
        if (numbered) {
          return (
            <div key={index} className="flex gap-2">
              <span className="w-4 shrink-0 font-semibold text-primary">
                {numbered[1]}.
              </span>
              <span className="min-w-0">
                {renderInline(numbered[2] || "", `n-${index}`)}
              </span>
            </div>
          );
        }

        if (/^[-*]\s+/.test(trimmed)) {
          return (
            <div key={index} className="flex gap-2">
              <span className="shrink-0 text-primary">•</span>
              <span className="min-w-0">
                {renderInline(trimmed.replace(/^[-*]\s+/, ""), `b-${index}`)}
              </span>
            </div>
          );
        }

        return <p key={index}>{renderInline(trimmed, `p-${index}`)}</p>;
      })}
    </div>
  );
}
