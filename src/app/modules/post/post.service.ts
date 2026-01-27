import type {
  Post,
  Prisma,
  User,
} from "../../../../prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  return prisma.post.create({ data: payload });
};
const getPosts = async () => {
  return prisma.post.findMany();
};
const getPostById = async (id: number) => {
  const result = prisma.post.findUnique({ where: { id } });
  return result;
};
const updatePost = async (
  id: number,
  payload: Prisma.PostUpdateInput,
): Promise<Post> => {
  return prisma.post.update({ where: { id }, data: payload });
};
const deletePost = async (id: number): Promise<Post> => {
  return prisma.post.delete({ where: { id } });
};
export const postService = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
