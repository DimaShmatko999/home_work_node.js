import { Request, Response } from 'express';
import { Post, CreatePostData, UpdatePostData } from './post.model';

export interface IPostController {
  getAll: (req: Request<any, any, any, { skip?: string; take?: string }>, res: Response) => Promise<void>;
  getById: (req: Request<{ id: string }>, res: Response) => Promise<void>;
  create: (req: Request<any, any, CreatePostData>, res: Response) => Promise<void>;
  update: (req: Request<{ id: string }, any, UpdatePostData>, res: Response) => Promise<void>;
  delete: (req: Request<{ id: string }>, res: Response) => Promise<void>;
}

export interface IPostService {
  getAll(skip?: number, take?: number): Promise<Post[]>;
  getById(id: number): Promise<Post | undefined>;
  create(data: CreatePostData): Promise<Post>;
  update(id: number, data: UpdatePostData): Promise<Post | null>;
  delete(id: number): Promise<void>;
}