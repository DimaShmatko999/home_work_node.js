import { Request, Response } from "express";
import { PostService } from "../service/post.service";

export const PostController = {
  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const take = req.query.take ? Number(req.query.take) : undefined;
      const posts = await PostService.getAll(skip, take);
      res.status(200).json(posts);
    } catch {
      res.status(500).json({ message: "Failed to read posts" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json("id must be a number");

      const post = await PostService.getById(id);
      if (!post) return res.status(404).json("post not found");

      res.status(200).json(post);
    } catch {
      res.status(500).json({ message: "Failed to read post" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, content, tagIds = [] } = req.body;

      if (!title || !content)
        return res.status(422).json({ message: "title and content are required" });

      const newPost = await PostService.create({ title, content, tagIds });
      res.status(201).json(newPost);
    } catch {
      res.status(500).json({ message: "Failed to create post" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { title, content, tagIds = [] } = req.body;
      const updated = await PostService.update(id, { title, content, tagIds });

      if (!updated) return res.status(404).json({ message: "Post not found" });
      res.status(200).json(updated);
    } catch {
      res.status(500).json({ message: "Failed to update post" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json("id must be a number");

      const deleted = await PostService.delete(id);
      if (!deleted) return res.status(404).json({ message: "Post not found" });

      res.status(200).json(deleted);
    } catch {
      res.status(500).json({ message: "Failed to delete post" });
    }
  },
};