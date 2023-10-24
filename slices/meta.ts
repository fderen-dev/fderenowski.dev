import dynamic from "next/dynamic";

export const metaComponents = {
  seo: dynamic(() => import("./Seo")),
};