import { SliceZone } from "@prismicio/react";
import { SliceSimulator } from "@slicemachine/adapter-next/simulator";

import { components } from "../slices";

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }) => (
      <SliceZone slices={slices} components={components} />
    )}
  />
);

export default SliceSimulatorPage;
