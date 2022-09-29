import { useMediaQueriesContext } from "context/MediaQueries";

interface ForDesktopProps {
  children: React.ReactNode;
}

export const ForDesktop = ({ children }: ForDesktopProps) => {
  const { isDesktop } = useMediaQueriesContext();

  return <>{isDesktop ? children : null}</>;
};
