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

import GearImage from "public/static/gear.svg";

import styles from "./navbar.module.scss";
import variables from "styles/exports.module.scss";

const modalCloseTimeoutMs = parseInt(variables.MODAL_CLOSE_TIMEOUT_MS, 10);

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
    <Link
      passHref
      href={href}
      className={cx(styles.navigationItemLink, linkClassName, {
        undelineOnHover: !disableUnderline,
      })}>

      {children}

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
  isMobileNavigationOpen: Boolean;
  toggleMobileNavigation: () => void;
}

const NavbarContent = ({
  isMobileNavigationOpen,
  toggleMobileNavigation,
}: NavbarContentProps) => {
  return (
    <div className={styles.navbarContent}>
      <HomeRoute />
      <MediaQueries.ForMobile>
        <button
          onClick={toggleMobileNavigation}
          className={cx("hamburger hamburger--spin", {
            ["is-active"]: isMobileNavigationOpen,
          })}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </MediaQueries.ForMobile>
      <MediaQueries.ForTabletAndAbove>
        <NavigationList className={styles.horizontal} />
      </MediaQueries.ForTabletAndAbove>
    </div>
  );
};

export const Navbar = () => {
  const { isTablet } = useMediaQueriesContext();
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
    setMobileNavigationOpen((prev) => (prev && isTablet ? false : prev));
  }, [isTablet]);

  return (
    <>
      <nav
        className={cx(styles.navbar, {
          hidden: !isMobileNavigationOpen ? hidden : false,
        })}
      >
        {isMounted && (
          <NavbarContent
            isMobileNavigationOpen={isMobileNavigationOpen}
            toggleMobileNavigation={toggleMobileNavigation}
          />
        )}
      </nav>
      <ReactModal
        preventScroll
        isOpen={isMobileNavigationOpen && !isTablet}
        onRequestClose={() => setMobileNavigationOpen(false)}
        portalClassName={styles.mobileNavigation}
        overlayClassName={{
          base: styles.mobileNavigationOverlay,
          afterOpen: styles.overlayAfterOpen,
          beforeClose: styles.overlayBeforeClose,
        }}
        closeTimeoutMS={modalCloseTimeoutMs}
        className={styles.mobileNavigationContent}
      >
        <NavigationList className={styles.vertical} />
      </ReactModal>
    </>
  );
};
