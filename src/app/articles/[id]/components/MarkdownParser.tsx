'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export type MarkdownParserProps = {
  children: string;
};

export default function MarkdownParser(props: MarkdownParserProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {props.children}
    </ReactMarkdown>
  );
}
