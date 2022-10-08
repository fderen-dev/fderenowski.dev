import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import ReactModal from "react-modal";

import { MediaQueries, useMediaQueriesContext } from "context/MediaQueries";
import { useScrollDetectionContext } from "context/ScrollDetection";
import { ROUTES } from "utils/constants";
import { WithChildren } from "utils/types";
import { useIsMounted } from "utils/useIsMounted";
import { ScrollDirection } from "utils/useScrollDetection";

import GearImage from "../../../public/static/gear.svg";

import styles from "./navbar.module.scss";

const cx = classNames.bind(styles);

interface NavigationItemProps extends WithChildren {
  href: string;
  As?: "li" | "div" | "span";
  disableUnderline?: boolean;
  containerClassName?: string;
  linkClassName?: string;
}

const NavigationItem = ({
  href,
  children,
  As = "li",
  disableUnderline,
  containerClassName,
  linkClassName,
}: NavigationItemProps) => (
  <As className={cx(styles.navigationItem, containerClassName)}>
    <Link passHref href={href}>
      <a
        className={cx(styles.navigationItemLink, linkClassName, {
          undelineOnHover: !disableUnderline,
        })}
      >
        {children}
      </a>
    </Link>
  </As>
);

interface NavigationListProps {
  className?: string;
}

const NavigationList = ({ className }: NavigationListProps) => (
  <ul className={cx(styles.navigationList, className)}>
    <NavigationItem href="/about">About</NavigationItem>
    <NavigationItem href="/blog">Blog</NavigationItem>
    <NavigationItem href="/portfolio">Portfolio</NavigationItem>
    <NavigationItem href="/contat">Contact</NavigationItem>
  </ul>
);

const HomeRoute = () => (
  <NavigationItem
    disableUnderline
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
  const isMounted = useIsMounted();

  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const toggleMobileNavigation = () => setMobileNavigationOpen((prev) => !prev);

  const hidden =
    (isScrolling && scrollDirection === ScrollDirection.Down) ||
    (prevIsScrolling &&
      !isScrolling &&
      scrollDirection === ScrollDirection.Down);

  useEffect(() => {
    setMobileNavigationOpen((prev) => (prev && isDesktop ? false : prev));
  }, [isDesktop]);

  return (
    <>
      <nav
        className={cx(styles.navbar, {
          hidden: !isMobileNavigationOpen ? hidden : false,
        })}
      >
        {isMounted && (
          <NavbarContent toggleMobileNavigation={toggleMobileNavigation} />
        )}
      </nav>
      <ReactModal
        preventScroll
        isOpen={isMobileNavigationOpen}
        onRequestClose={() => setMobileNavigationOpen(false)}
        portalClassName={styles.mobileNavigation}
        overlayClassName={styles.mobileNavigationOverlay}
        className={styles.mobileNavigationContent}
      >
        <NavigationList className={styles.vertical} />
      </ReactModal>
    </>
  );
};
