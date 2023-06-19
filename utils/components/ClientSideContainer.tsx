import { ReactNode, useEffect, useState } from "react";

export const ClientSideContainer = ({ children }: { children: ReactNode }) => {
  const [isRenderedClientSide, setIsRenderedClientSide] = useState(false);

  useEffect(() => {
    setIsRenderedClientSide(true);
  }, []);

  return <>{isRenderedClientSide && children}</>;
};
