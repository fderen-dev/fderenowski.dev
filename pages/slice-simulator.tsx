import { SliceZone } from "@prismicio/react";
import { SliceSimulator } from "@prismicio/slice-simulator-react";

import { components } from "../slices";

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }) => (
      // @ts-ignore
      <SliceZone slices={slices} components={components} />
    )}
    state={{}}
  />
);

export default SliceSimulatorPage;
