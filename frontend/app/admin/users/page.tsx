import { UsersClient } from "./users-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Users | EthiopiaHub Images",
  description: "Manage users",
};

export default function AdminUsersPage() {
  return <UsersClient />;
}
