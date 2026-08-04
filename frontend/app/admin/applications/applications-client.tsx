"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Button } from "@/components/ui/button";

export function ApplicationsClient() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-applications", statusFilter],
    queryFn: () => adminService.getApplications(statusFilter !== "ALL" ? { status: statusFilter } : {}),
  });

  const reviewMutation = useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string; status: "APPROVED" | "REJECTED" }) =>
      adminService.reviewApplication(applicationId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-applications"] }),
    onError: (err: any) => alert(err.response?.data?.message || err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <select
          className="border rounded px-3 py-2 text-sm bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      <div className="rounded-md border bg-white">
        <table className="w-full text-sm text-left">
          <thead className="border-b bg-gray-50/50">
            <tr>
              <th className="p-4 font-medium">Applicant</th>
              <th className="p-4 font-medium">Message</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Submitted</th>
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
            ) : data?.data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No applications found.
                </td>
              </tr>
            ) : (
              data?.data?.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="font-medium">{app.user.username}</div>
                    <div className="text-muted-foreground text-xs">{app.user.email}</div>
                  </td>
                  <td className="p-4 text-muted-foreground max-w-xs truncate" title={app.message || "No message"}>
                    {app.message || "No message provided"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        app.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : app.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    {app.status === "PENDING" && (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to approve this application?")) {
                              reviewMutation.mutate({ applicationId: app.id, status: "APPROVED" });
                            }
                          }}
                          disabled={reviewMutation.isPending}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to reject this application?")) {
                              reviewMutation.mutate({ applicationId: app.id, status: "REJECTED" });
                            }
                          }}
                          disabled={reviewMutation.isPending}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
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
