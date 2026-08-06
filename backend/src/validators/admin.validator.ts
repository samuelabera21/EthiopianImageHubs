import { z } from "zod";
import { UserStatus } from "../generated/prisma/client";

export const updateRoleSchema = z.object({
  body: z.object({
    roleName: z.string().min(1, "Role is required"),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(UserStatus, {
      message: "Invalid status",
    }),
  }),
});

export const getUsersSchema = z.object({
  query: z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
    search: z.string().optional(),
    role: z.string().optional(),
    status: z.nativeEnum(UserStatus).optional(),
  }),
});
