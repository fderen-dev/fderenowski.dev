import { Content } from "@prismicio/client";
import { asText } from "@prismicio/helpers";
import { SliceComponentProps } from "@prismicio/react";

import { SyntaxHiglighter } from "components/blog/SyntaxHighlighter/SyntaxHighlighter";

/**
 * Props for `CodeBlock`.
 */
export type CodeBlockProps = SliceComponentProps<Content.CodeBlockSlice>;

/**
 * Component for "CodeBlock" Slices.
 */
const CodeBlock = ({ slice }: CodeBlockProps): JSX.Element | null => {
  if (!slice.primary.codestring || !slice.primary.language) {
    return null;
  }

  return (
    <SyntaxHiglighter
      codeString={asText(slice.primary.codestring)}
      language={slice.primary.language}
      showLineNumbers={slice.primary.showlinenumbers}
      wrapLines={slice.primary.wraplines}
      showCopyButton={slice.primary.showcopybutton}
    />
  );
};

export default CodeBlock;
