import type { Prisma } from "../../../../prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import type { User } from "./user.interface.js";
const createUser = async (payload: Prisma.UserCreateInput) => {
  return prisma.user.create({ data: payload });
};
const getUsers = async () => {
  return prisma.user.findMany();
};

export const userService = {
  createUser,
  getUsers,
};
