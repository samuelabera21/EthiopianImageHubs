"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UsersClient() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => adminService.getUsers({ search, limit: 50 }),
  });

  const updateRole = useMutation({
    mutationFn: ({ userId, roleName }: { userId: string; roleName: string }) =>
      adminService.updateUserRole(userId, roleName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    onError: (err: any) => alert(err.response?.data?.message || err.message),
  });

  const updateStatus = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) =>
      adminService.updateUserStatus(userId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
    onError: (err: any) => alert(err.response?.data?.message || err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by email or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border bg-white">
        <table className="w-full text-sm text-left">
          <thead className="border-b bg-gray-50/50">
            <tr>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : data?.data?.users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            ) : (
              data?.data?.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium">{user.username}</td>
                  <td className="p-4 text-muted-foreground">{user.email}</td>
                  <td className="p-4">
                    <select
                      className="border rounded px-2 py-1 text-sm bg-white"
                      value={user.role?.name || ""}
                      onChange={(e) => updateRole.mutate({ userId: user.id, roleName: e.target.value })}
                      disabled={updateRole.isPending}
                    >
                      <option value="USER">USER</option>
                      <option value="CONTRIBUTOR">CONTRIBUTOR</option>
                      <option value="MODERATOR">MODERATOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      className="border rounded px-2 py-1 text-sm bg-white"
                      value={user.status}
                      onChange={(e) => updateStatus.mutate({ userId: user.id, status: e.target.value })}
                      disabled={updateStatus.isPending}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="PENDING">PENDING</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                      <option value="DELETED">DELETED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
