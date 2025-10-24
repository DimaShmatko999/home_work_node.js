import { Router, Request, Response } from "express";
import { PostService } from "../services/post.service";

export const PostRouter = Router();

PostRouter.get("/", async (req: Request, res: Response) => {
  const posts = await PostService.getAll();
  res.json(posts);
});

PostRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const post = await PostService.getById(id);
  if (!post) return res.status(404).json({ message: "Пост не найден" });
  res.json(post);
});

PostRouter.post("/", async (req: Request, res: Response) => {
  const newPost = await PostService.create(req.body);
  res.status(201).json(newPost);
});

PostRouter.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await PostService.update(id, req.body);
  if (!updated) return res.status(404).json({ message: "Пост не найден" });
  res.json(updated);
});

PostRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await PostService.delete({ id });

    if (!result.post) {
      return res.status(404).json({ message: `Пост с id=${id} не найден` });
    }

    res.json(result.post);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Ошибка при удалении поста" });
  }
});