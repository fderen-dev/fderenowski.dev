import { ComponentType } from "react";
import dynamic from "next/dynamic";

export const metaComponents: Record<string, ComponentType<any>> = {
  seo: dynamic(() => import("../../../slices/Seo")),
};