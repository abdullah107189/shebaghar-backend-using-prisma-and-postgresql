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
  const result = prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy: { createdAt: "desc" },
  });
  const total = await prisma.post.count({ where });
  return {
    data: await result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
const getPostById = async (id: number) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    // throw new Error("Testing transaction rollback");
    return await tx.post.findUnique({ where: { id } });
  });
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
const getPostStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _avg: { views: true },
      _sum: { views: true },
      _min: { views: true },
      _max: { views: true },
    });
    const topFeturedPost = await tx.post.findFirst({
      where: {
        isFetured: true,
      },
      orderBy: { views: "desc" },
    });
    const seeLast7DaysPosts = await tx.post.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });
    return {
      stats: {
        totalPosts: aggregates._count ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        sumViews: aggregates._sum.views ?? 0,
        minViews: aggregates._min.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
      },
      topFeturedPost,
      seeLast7DaysPosts,
    };
  });
};

export const postService = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostStats,
};
