import { ApplicationsClient } from "./applications-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Applications | EthiopiaHub Images",
  description: "Manage contributor applications",
};

export default function AdminApplicationsPage() {
  return <ApplicationsClient />;
}
