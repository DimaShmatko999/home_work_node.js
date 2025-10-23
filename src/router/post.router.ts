import { Router } from "express";
import { PostController } from "../controller/post.controller";

export const PostRouter = Router();

PostRouter.get("/", PostController.getAll);
PostRouter.get("/:id", PostController.getById);
PostRouter.post("/", PostController.create);
PostRouter.put("/:id", PostController.update);
PostRouter.delete("/:id", PostController.delete);