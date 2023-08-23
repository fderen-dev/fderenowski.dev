import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import materialDark from "react-syntax-highlighter/dist/esm/styles/prism/material-dark";

SyntaxHighlighter.registerLanguage("tsx", tsx);

type SyntaxHiglighterLanguage = "tsx" | "javascript" | "typescript" | "css" | "html" | "scss";

interface SyntaxHiglighterProps {
  codeString: string;
  language: SyntaxHiglighterLanguage
}

export const SyntaxHiglighter = ({codeString, language}: SyntaxHiglighterProps) => (
  <SyntaxHighlighter language={language} style={materialDark}>
    {codeString}
  </SyntaxHighlighter>
);
