import type { ContentBlock } from "@/lib/types";

export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-article">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function renderBlock(block: ContentBlock, index: number) {
  const key = `block-${index}`;

  switch (block.type) {
    case "h2":
      return <h2 key={key}>{block.text}</h2>;
    case "h3":
      return <h3 key={key}>{block.text}</h3>;
    case "p":
      return <p key={key}>{block.text}</p>;
    case "quote":
      return <blockquote key={key}>{block.text}</blockquote>;
    case "ul":
      return (
        <ul key={key}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}
