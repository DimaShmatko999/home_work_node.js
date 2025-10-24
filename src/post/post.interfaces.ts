import { PrismaClient } from "@prisma/client";
import { CreatePostChecked, UpdatePostChecked } from "../types/post.types";

const prisma = new PrismaClient();

export const PostService = {
  async getAll(skip = 0, take?: number) {
    try {
      return await prisma.post.findMany({
        skip,
        take,
        include: { postTags: { include: { tag: true } } },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  },

  async getById(id: number) {
    try {
      return await prisma.post.findUnique({
        where: { id },
        include: { postTags: { include: { tag: true } } },
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      throw new Error("Failed to fetch post");
    }
  },

  async create(data: CreatePostChecked) {
    try {
      const { title, content, tagIds } = data;
      return await prisma.post.create({
        data: {
          title,
          content,
          postTags: {
            create: tagIds.map(tagId => ({ tagId })),
          },
        },
        include: { postTags: { include: { tag: true } } },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post");
    }
  },

  async update(id: number, data: UpdatePostChecked) {
    try {
      const { title, content, tagIds } = data;
      await prisma.postTag.deleteMany({ where: { postId: id } });

      return await prisma.post.update({
        where: { id },
        data: {
          title,
          content,
          postTags: {
            create: tagIds.map(tagId => ({ tagId })),
          },
        },
        include: { postTags: { include: { tag: true } } },
      });
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  },

  async delete(id: number) {
    try {
      const deleted = await prisma.post.delete({ where: { id } });
      return deleted;
    } catch (error: any) {
      if (error.code === "P2025") return null;
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post");
    }
  },
};