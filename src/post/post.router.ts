import express from 'express';
import { PostController } from './post.controller';

export const PostRouter = express.Router();

PostRouter.get('/', PostController.getAll);
PostRouter.get('/:id', PostController.getById);
PostRouter.post('/', PostController.create);