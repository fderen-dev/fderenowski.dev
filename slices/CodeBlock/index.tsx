import { Content } from "@prismicio/client";
import * as helpers from "@prismicio/helpers";
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
    <SyntaxHiglighter codeString={helpers.asText(slice.primary.codestring)} language={slice.primary.language} />
  );
};

export default CodeBlock;
