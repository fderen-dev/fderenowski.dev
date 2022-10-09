import { WithChildren } from "utils/types";

import { MediaQueries } from "./MediaQueries";
import { ScrollDetectionProvider } from "./ScrollDetection";

const RootProvider = ({ children }: WithChildren) => (
  <MediaQueries.Provider>
    <ScrollDetectionProvider>{children}</ScrollDetectionProvider>
  </MediaQueries.Provider>
);

export default RootProvider;
