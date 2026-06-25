type MarkdownContentProps = {
  content?: string | null;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content?.trim()) return null;

  return (
    <div className="space-y-2 text-sm leading-relaxed text-gray-700">
      {content.split("\n").map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;
        if (trimmed.startsWith("### "))
          return (
            <h4 key={index} className="pt-2 text-base font-bold text-gray-900">
              {trimmed.slice(4)}
            </h4>
          );
        if (trimmed.startsWith("## "))
          return (
            <h3 key={index} className="pt-3 text-lg font-bold text-gray-900">
              {trimmed.slice(3)}
            </h3>
          );
        if (trimmed.startsWith("# "))
          return (
            <h2 key={index} className="pt-4 text-xl font-bold text-gray-900">
              {trimmed.slice(2)}
            </h2>
          );
        if (trimmed.startsWith("- "))
          return (
            <li key={index} className="ml-5 list-disc">
              {trimmed.slice(2)}
            </li>
          );
        return <p key={index}>{trimmed}</p>;
      })}
    </div>
  );
}
