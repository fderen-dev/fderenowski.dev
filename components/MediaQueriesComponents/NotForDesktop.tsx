import { useMediaQueriesContext } from "context/MediaQueries";

interface NotForDesktopProps {
  children: React.ReactNode;
}

export const NotForDesktop = ({ children }: NotForDesktopProps) => {
  const { isDesktop } = useMediaQueriesContext();

  return <>{isDesktop ? null : children}</>;
};
