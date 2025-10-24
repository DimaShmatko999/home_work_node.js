import { PrismaClient } from "@prisma/client";
import {
  CreatePost,
  UpdatePost,
  DeletePostRequest,
  DeletePostResponse,
} from "../types/post.types";

const prisma = new PrismaClient();

export const PostService = {
  async getAll(skip = 0, take?: number) {
    return prisma.post.findMany({
      skip,
      take,
      include: { tags: true },
    });
  },

  async getById(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });
  },

  async create(data: CreatePost) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tagIds
          ? { connect: data.tagIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { tags: true },
    });
  },

  async update(id: number, data: UpdatePost) {
    try {
      const existingPost = await prisma.post.findUnique({ where: { id } });
      if (!existingPost) return null;

      return prisma.post.update({
        where: { id },
        data: {
          title: data.title,
          content: data.content,
          tags: data.tagIds
            ? { set: data.tagIds.map((id) => ({ id })) }
            : undefined,
        },
        include: { tags: true },
      });
    } catch (error) {
      console.error("Ошибка при обновлении поста:", error);
      throw error;
    }
  },

  async delete({ id }: DeletePostRequest): Promise<DeletePostResponse> {
    try {
      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) {
        return { post: null };
      }

      const deletedPost = await prisma.post.delete({
        where: { id },
      });

      return { post: deletedPost };
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
      throw error;
    }
  },
};