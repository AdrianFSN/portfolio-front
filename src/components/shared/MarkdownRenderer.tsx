import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { ALLOWED_HTML_TAGS } from "../../utils/constants";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ALLOWED_HTML_TAGS,
  });
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {sanitizedContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
