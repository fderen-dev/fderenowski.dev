import { SliceZone, SliceZoneProps } from "@prismicio/react";

import { metaComponents } from "./meta";

interface MetaSliceZoneProps extends Pick<SliceZoneProps, 'slices'> {}

const DefaultComponent = () => null;

export const MetaSliceZone = ({slices}: MetaSliceZoneProps) => (
  <SliceZone
    slices={slices}
    components={metaComponents}
    defaultComponent={DefaultComponent}
  />
);
