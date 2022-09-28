import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import ReactModal from "react-modal";

import { useMediaQueriesContext } from "context/MediaQueries";
import { ROUTES } from "utils/constants";
import { useIsMounted } from "utils/useIsMounted";

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

interface NavbarContentProps {
  isDesktop: boolean;
  toggleMobileNavigation: () => void;
}

const NavbarContent = ({
  isDesktop,
  toggleMobileNavigation,
}: NavbarContentProps) => {
  if (isDesktop) {
    return <NavList className={styles.horizontal} />;
  }

  return <button onClick={toggleMobileNavigation}>Hamburger</button>;
};

export const Navbar = () => {
  const { isDesktop } = useMediaQueriesContext();
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const isMounted = useIsMounted();
  const toggleMobileNavigation = () => setMobileNavigationOpen((prev) => !prev);

  useEffect(() => {
    setMobileNavigationOpen((prev) => (prev && isDesktop ? false : prev));
  }, [isDesktop]);

  return (
    <>
      <nav className={styles.navbar}>
        {isMounted && (
          <NavbarContent
            isDesktop={isDesktop}
            toggleMobileNavigation={toggleMobileNavigation}
          />
        )}
      </nav>
      <ReactModal isOpen={isMobileNavigationOpen}>
        <NavList className={styles.vertical} />
      </ReactModal>
    </>
  );
};
