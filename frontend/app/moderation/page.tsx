import { Metadata } from "next";
import { ModerationClient } from "@/features/moderation/moderation-client";

export const metadata: Metadata = {
  title: "Moderation Queue | EthiopiaHub Images",
  description: "Review pending images",
};

export default function ModerationPage() {
  return <ModerationClient />;
}
