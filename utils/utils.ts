import { TypeTools } from "./TypeTools";

export const isDevMode = process && process.env.NODE_ENV === "development";

export const setBodyScroll = (isScrollable: boolean) => {
  const body = document.getElementsByTagName("body").item(0);

  if (body) {
    isScrollable
      ? body.classList.remove("overflowHidden")
      : body.classList.add("overflowHidden");
  } else {
    console.log("no body");
  }
};

export const getBlogPostUrl = (path: string | null): string => {
  if (TypeTools.isNullOrUndefined(path)) {
    return "/blog";
  }

  return `/blog/${path}`;
};
