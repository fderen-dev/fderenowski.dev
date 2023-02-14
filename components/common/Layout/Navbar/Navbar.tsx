import { useEffect, useState } from "react";
import Link from "next/link";
import { Content } from "@prismicio/client";
import { PrismicLink, PrismicText } from "@prismicio/react";
import classNames from "classnames/bind";
import ReactModal from "react-modal";

import { MediaQueries, useMediaQueriesContext } from "context/MediaQueries";
import { useScrollDetectionContext } from "context/ScrollDetection";
import { ROUTES } from "utils/constants";
import { WithChildren } from "utils/types";
import { TypeTools } from "utils/TypeTools";
import { useIsMounted } from "utils/useIsMounted";
import { ScrollDirection } from "utils/useScrollDetection";

import GearImage from "public/static/gear.svg";

import styles from "./navbar.module.scss";
import variables from "styles/exports.module.scss";

const modalCloseTimeoutMs = parseInt(variables.MODAL_CLOSE_TIMEOUT_MS, 10);

const cx = classNames.bind(styles);

interface NavigationItemProps extends WithChildren {
  field?: any;
  href?: string;
  As?: "li" | "div" | "span";
  disableUnderline?: boolean;
  containerClassName?: string;
  linkClassName?: string;
}

const NavigationItem = ({
  field,
  href,
  children,
  As = "li",
  disableUnderline,
  containerClassName,
  linkClassName,
}: NavigationItemProps) => {
  if (TypeTools.isNonEmptyString(href)) {
    return (
      <As className={cx(styles.navigationItem, containerClassName)}>
        <Link
          href={href as string}
          className={cx(styles.navigationItemLink, linkClassName, {
            undelineOnHover: !disableUnderline,
          })}
        >
          {children}
        </Link>
      </As>
    );
  } else if (!TypeTools.isNullOrUndefined(field)) {
    return (
      <As className={cx(styles.navigationItem, containerClassName)}>
        <PrismicLink
          field={field}
          className={cx(styles.navigationItemLink, linkClassName, {
            undelineOnHover: !disableUnderline,
          })}
        >
          {children}
        </PrismicLink>
      </As>
    );
  }

  return null;
};

interface NavigationListProps {
  navigationData: Content.NavigationDocumentData;
  className?: string;
}

const NavigationList = ({ navigationData, className }: NavigationListProps) => (
  <ul className={cx(styles.navigationList, className)}>
    {navigationData?.slices &&
      navigationData.slices.map((slice) => (
        <NavigationItem field={slice.primary.link} key={slice.id}>
          <PrismicText field={slice.primary.name} />
        </NavigationItem>
      ))}
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
  navigationData: Content.NavigationDocumentData;
  isMobileNavigationOpen: Boolean;
  toggleMobileNavigation: () => void;
}

const NavbarContent = ({
  navigationData,
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
        <NavigationList
          navigationData={navigationData}
          className={styles.horizontal}
        />
      </MediaQueries.ForTabletAndAbove>
    </div>
  );
};

interface NavbarProps {
  navigationData: Content.NavigationDocumentData;
}

export const Navbar = ({ navigationData }: NavbarProps) => {
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
            navigationData={navigationData}
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
        <NavigationList
          navigationData={navigationData}
          className={styles.vertical}
        />
      </ReactModal>
    </>
  );
};
