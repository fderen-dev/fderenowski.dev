import { Content } from "@prismicio/client";

import { Gear, Placement } from "./Gear/Gear";
import { Typewriter, useTypewriterApi } from "./Typewriter/Typewriter";

import styles from "./header.module.scss";

const DESKTOP_GEAR_PLACEMENT: Partial<Placement> = {
  top: "0",
  bottom: "0",
  right: "20%",
};
const GEAR_STYLE: React.CSSProperties = {
  marginTop: "auto",
  marginBottom: "auto",
};

interface HeaderProps {
  prismicDocumentData: Content.HeaderDocumentData;
}

export const Header = ({ prismicDocumentData }: HeaderProps) => {
  const { play } = useTypewriterApi();

  return (
    <header className={styles.container}>
      <Typewriter
        text="Front-end developer"
        characterTypingDurationMs={150}
        as="h1"
      />
      <button onClick={() => play()}>play</button>
      <div className={styles.header}>
        {prismicDocumentData && (
          <div className={styles.headingContainer}>
            {prismicDocumentData.header && (
              <h1 className={styles.heading}>{prismicDocumentData.header}</h1>
            )}
            {prismicDocumentData.subheader && (
              <div className={styles.subheading}>
                {prismicDocumentData.subheader}
              </div>
            )}
          </div>
        )}
        <Gear
          placement={DESKTOP_GEAR_PLACEMENT}
          style={GEAR_STYLE}
          maxSize="70%"
        />
      </div>
    </header>
  );
};
