import { title } from "node:process";
import type {
  Post,
  Prisma,
  User,
} from "../../../../prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { ta } from "zod/locales";
const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  return prisma.post.create({ data: payload });
};
const getPosts = async (
  page: number,
  limit: number,
  search: string,
  isFetured: boolean,
  tags: string[],
) => {
  const skip = (page - 1) * limit;
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFetured === "boolean" ? { isFetured } : undefined,
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  console.log(tags);
  return prisma.post.findMany({
    skip,
    take: limit,
    where,
  });
};
const getPostById = async (id: number) => {
  const result = prisma.post.findUnique({ where: { id } });
  return result;
};
const updatePost = async (
  id: number,
  payload: Prisma.PostUpdateInput,
): Promise<Post> => {
  const exitsPost = await getPostById(id);
  if (!exitsPost) {
    throw new Error("Post not found");
  }
  return prisma.post.update({ where: { id }, data: payload });
};
const deletePost = async (id: number) => {
  const exitsPost = await getPostById(id);
  if (!exitsPost) {
    throw new Error("Post not found");
  }
  const result = await prisma.post.delete({ where: { id } });
  return { id: result.id };
};
export const postService = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
