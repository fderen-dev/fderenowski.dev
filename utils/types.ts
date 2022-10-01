import React from "react";

export type TimeoutHandle = ReturnType<typeof setTimeout>;

export interface WithChildren {
  children: React.ReactNode;
}
