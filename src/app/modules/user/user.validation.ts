import { z } from "zod";

export const RoleEnum = z.enum(["USER", "ADMIN"]);
export const UserStatusEnum = z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]);

// CREATE USER
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(60).optional(),
    email: z.string().email(),
    password: z.string().min(6).max(128).optional(),
    role: RoleEnum.optional(),
    phone: z
      .string()
      .min(8, "Phone number too short")
      .max(20, "Phone number too long"),
    picture: z.string().url().optional(),
    status: UserStatusEnum.optional(),
    isVerified: z.boolean().optional(),
  }),
});

// UPDATE USER (partial)
export const updateUserSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z
    .object({
      name: z.string().min(2).max(60).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).max(128).optional(),
      role: RoleEnum.optional(),
      phone: z.string().min(8).max(20).optional(),
      picture: z.string().url().optional(),
      status: UserStatusEnum.optional(),
      isVerified: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required to update",
    }),
});
