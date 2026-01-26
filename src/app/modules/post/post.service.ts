import type {
  Post,
  Prisma,
  User,
} from "../../../../prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  return prisma.post.create({ data: payload });
};
export const postService = {
  createPost,
};
