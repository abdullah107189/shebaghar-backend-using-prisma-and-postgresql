import { prisma } from "../../lib/prisma.js";
const createUser = async (payload: { email: string; name?: string }) => {
  return prisma.user.create({ data: payload });
};
const getUsers = async () => {
  return prisma.user.findMany({ orderBy: { id: "desc" } });
};

export const userService = {
  createUser,
  getUsers,
};
