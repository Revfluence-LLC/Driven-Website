"use client";

import dynamic from "next/dynamic";

export const LeafletMap = dynamic(
  () => import("./LeafletMap").then((m) => m.LeafletMap),
  { ssr: false },
);
