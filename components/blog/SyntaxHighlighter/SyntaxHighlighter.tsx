import classNames from "classnames/bind";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus"; 

import { useCopyToClipboard } from "hooks/useCopyToClipboard";

import CheckMarkIcon from "public/icons/checkmark.svg";
import CopyIcon from "public/icons/copy.svg";

import styles from "./SyntaxHighlighter.module.scss";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("json", json);

type SyntaxHiglighterLanguage = "jsx" | "javascript" | "tsx" | "typescript" | "css" | "scss" | "bash" | "json";

interface SyntaxHiglighterProps {
  codeString: string;
  language: SyntaxHiglighterLanguage,
  showLineNumbers: boolean,
  wrapLines: boolean,
  showCopyButton: boolean;
}

export const SyntaxHiglighter = ({
  codeString,
  language,
  showLineNumbers = false,
  wrapLines = false,
  showCopyButton = false
}: SyntaxHiglighterProps) => {
  const { isCopied, isCopying, copyToClipboard } = useCopyToClipboard({ timeout: 500});

  return (
    <div className={styles.container}>
      {showCopyButton && (
        <button
          className={styles.copyButton}
          disabled={isCopying}
          onClick={() => copyToClipboard(codeString)}
        >
          {isCopied ? (
            <CheckMarkIcon aria-label="Copied" className={styles.icon} />
          ) : (
            <CopyIcon aria-label="Copy to clipboard" className={styles.icon} />
          )}
        </button>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
        codeTagProps={{ className: styles.code }}
        className={styles.codeContainer}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
  }
