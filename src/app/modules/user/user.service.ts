import type {
  Prisma,
  User,
} from "../../../../prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data: payload });
};
const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      name: true,
      id: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
export const userService = {
  createUser,
  getUsers,
  getUserById,
};
