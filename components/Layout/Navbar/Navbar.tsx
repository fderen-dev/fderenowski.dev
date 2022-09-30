import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import ReactModal from "react-modal";

import { ForDesktop, NotForDesktop } from "components/MediaQueriesComponents";

import { useMediaQueriesContext } from "context/MediaQueries";
import { ROUTES } from "utils/constants";
import { useIsMounted } from "utils/useIsMounted";

import GearImage from "../../../public/static/gear.svg";

import styles from "./navbar.module.scss";

interface NavigationItemProps {
  href: string;
  children: React.ReactNode;
  As?: "li" | "div" | "span";
  containerClassName?: string;
  linkClassName?: string;
}

const NavigationItem = ({
  href,
  children,
  As = "li",
  containerClassName,
  linkClassName,
}: NavigationItemProps) => (
  <As className={classNames(styles.navigationItem, containerClassName)}>
    <Link passHref href={href}>
      <a className={classNames(styles.navigationItemLink, linkClassName)}>
        {children}
      </a>
    </Link>
  </As>
);

interface NavigationListProps {
  className?: string;
}

const NavigationList = ({ className }: NavigationListProps) => (
  <ul className={classNames(styles.navigationList, className)}></ul>
);

const HomeRoute = () => (
  <NavigationItem
    As="span"
    href={ROUTES.HOME}
    containerClassName={styles.homeRoute}
  >
    <GearImage alt="Logo" className={styles.logo} />
  </NavigationItem>
);

interface NavbarContentProps {
  toggleMobileNavigation: () => void;
}

const NavbarContent = ({ toggleMobileNavigation }: NavbarContentProps) => {
  return (
    <div className={styles.navbarContent}>
      <HomeRoute />
      <ForDesktop>
        <NavigationList className={styles.horizontal} />
      </ForDesktop>
      <NotForDesktop>
        <button onClick={toggleMobileNavigation}>Hamburger</button>
      </NotForDesktop>
    </div>
  );
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
          <NavbarContent toggleMobileNavigation={toggleMobileNavigation} />
        )}
      </nav>
      <ReactModal isOpen={isMobileNavigationOpen}>
        <NavigationList className={styles.vertical} />
      </ReactModal>
    </>
  );
};
