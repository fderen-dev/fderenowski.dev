import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import materialDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("jsx", jsx);

type SyntaxHiglighterLanguage = "jsx" | "javascript" | "tsx" | "typescript" | "css" | "scss" | "bash";

interface SyntaxHiglighterProps {
  codeString: string;
  language: SyntaxHiglighterLanguage
}

export const SyntaxHiglighter = ({codeString, language}: SyntaxHiglighterProps) => (
  <SyntaxHighlighter language={language} style={materialDark}>
    {codeString}
  </SyntaxHighlighter>
);
