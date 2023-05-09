import Link from "next/link";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";

import { TypewriterProvider } from "components/common/Layout/Header/Typewriter/Typewriter";

import { WithChildren } from "utils/types";

import { MediaQueries } from "./MediaQueries";

import { repositoryName } from "../prismicio";

const RootProvider = ({ children }: WithChildren) => (
  <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
    <PrismicPreview repositoryName={repositoryName}>
      <MediaQueries.Provider>
        <TypewriterProvider>{children}</TypewriterProvider>
      </MediaQueries.Provider>
    </PrismicPreview>
  </PrismicProvider>
);

export default RootProvider;
