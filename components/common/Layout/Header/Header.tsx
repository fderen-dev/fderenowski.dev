import { Content } from "@prismicio/client";

import { Gear, Placement } from "./Gear/Gear";
import { Typewriter } from "./Typewriter/Typewriter";

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
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        {prismicDocumentData && (
          <div className={styles.headingContainer}>
            {prismicDocumentData.header && (
              <h1 className={styles.heading}>{prismicDocumentData.header}</h1>
            )}
            {prismicDocumentData.subheader && (
              <div className={styles.subheading}>
                <Typewriter
                  text={prismicDocumentData.subheader}
                  characterTypingDurationMs={150}
                  as="h2"
                />
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
