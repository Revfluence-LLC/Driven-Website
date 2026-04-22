import type { Metadata } from "next";
import { CreatorStudio } from "@/components/creator/CreatorStudio";

export const metadata: Metadata = {
  title: "Creator Studio — Driven",
  description:
    "Turn your Driven trips into shareable cards. Pick a template, drop in your stats, and download a 1080×1080 post.",
};

export default function CreatorPage() {
  return <CreatorStudio />;
}
