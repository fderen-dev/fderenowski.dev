import GearImage from "../../../public/static/gear.svg";
import GithubIcon from "../../../public/static/github.svg";
import LinkedInIcon from "../../../public/static/linkedin.svg";
import MailIcon from "../../../public/static/mail.svg";

import styles from "./footer.module.scss";

interface IconLinkProps {
  Icon: any;
  href: string;
}

const IconLink = ({ Icon, href }: IconLinkProps) => (
  <a
    href={href}
    rel="noreferrer noopener"
    target="_blank"
    className={styles.link}
  >
    <Icon className={styles.icon} />
  </a>
);

export const Footer = () => (
  <div className={styles.container}>
    <footer className={styles.footer}>
      {/* TODO: replace with actual logo */}
      <GearImage alt="Logo" className={styles.logo} />
      <div className={styles.right}>
        <small className={styles.copyright}>
          2022 - present Filip Derenowski
        </small>
        <div className={styles.links}>
          <IconLink Icon={MailIcon} href="mailto:fderen.dev@gmail.com" />
          <IconLink
            Icon={LinkedInIcon}
            href="https://www.linkedin.com/in/fderen-dev/"
          />
          <IconLink Icon={GithubIcon} href="https://github.com/fderen-dev" />
        </div>
      </div>
    </footer>
  </div>
);
