import Link from "next/link";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";

import { WithChildren } from "utils/types";

import { MediaQueries } from "./MediaQueries";
import { ScrollDetectionProvider } from "./ScrollDetection";

import { repositoryName } from "../prismicio";

const RootProvider = ({ children }: WithChildren) => (
  <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
    <PrismicPreview repositoryName={repositoryName}>
      <MediaQueries.Provider>
        <ScrollDetectionProvider>{children}</ScrollDetectionProvider>
      </MediaQueries.Provider>
    </PrismicPreview>
  </PrismicProvider>
);

export default RootProvider;
