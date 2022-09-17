import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import ReactModal from "react-modal";

import { useMediaQueriesContext } from "context/MediaQueries";
import { ROUTES } from "utils/constants";

import styles from "./navbar.module.scss";

interface NavListItemProps {
  href: string;
  children: React.ReactNode;
}

const NavListItem = ({ href, children }: NavListItemProps) => (
  <li>
    <Link href={href}>{children}</Link>
  </li>
);

interface NavListProps {
  className?: string;
}

const NavList = ({ className }: NavListProps) => (
  <ul className={classNames(styles.navList, className)}>
    <NavListItem href={ROUTES.HOME}>Home</NavListItem>
  </ul>
);

export const Navbar = () => {
  const { isDesktop } = useMediaQueriesContext();
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const toggleMobileNavigation = () => setMobileNavigationOpen((prev) => !prev);

  return (
    <>
      <nav className={styles.navbar}>
        {isDesktop ? (
          <NavList className={styles.horizontal} />
        ) : (
          <button onClick={toggleMobileNavigation}>Hamburger</button>
        )}
      </nav>
      <ReactModal isOpen={isMobileNavigationOpen}>
        <NavList className={styles.vertical} />
      </ReactModal>
    </>
  );
};
