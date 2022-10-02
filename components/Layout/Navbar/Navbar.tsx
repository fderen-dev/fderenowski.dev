import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import ReactModal from "react-modal";

import { MediaQueries, useMediaQueriesContext } from "context/MediaQueries";
import { useScrollDetectionContext } from "context/ScrollDetection";
import { ROUTES } from "utils/constants";
import { useIsMounted } from "utils/useIsMounted";
import { ScrollDirection } from "utils/useScrollDetection";

import GearImage from "../../../public/static/gear.svg";

import styles from "./navbar.module.scss";

const cx = classNames.bind(styles);

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
  <As className={cx(styles.navigationItem, containerClassName)}>
    <Link passHref href={href}>
      <a className={cx(styles.navigationItemLink, linkClassName)}>{children}</a>
    </Link>
  </As>
);

interface NavigationListProps {
  className?: string;
}

const NavigationList = ({ className }: NavigationListProps) => (
  <ul className={cx(styles.navigationList, className)}></ul>
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
      <MediaQueries.ForDesktop>
        <NavigationList className={styles.horizontal} />
      </MediaQueries.ForDesktop>
      <MediaQueries.NotForDesktop>
        <button onClick={toggleMobileNavigation}>Hamburger</button>
      </MediaQueries.NotForDesktop>
    </div>
  );
};

export const Navbar = () => {
  const { isDesktop } = useMediaQueriesContext();
  const { prevIsScrolling, isScrolling, scrollDirection } =
    useScrollDetectionContext();
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const isMounted = useIsMounted();
  const toggleMobileNavigation = () => setMobileNavigationOpen((prev) => !prev);

  useEffect(() => {
    setMobileNavigationOpen((prev) => (prev && isDesktop ? false : prev));
  }, [isDesktop]);

  const hidden =
    (isScrolling && scrollDirection === ScrollDirection.Down) ||
    (prevIsScrolling &&
      !isScrolling &&
      scrollDirection === ScrollDirection.Down);

  return (
    <>
      <nav className={cx(styles.navbar, { hidden })}>
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
