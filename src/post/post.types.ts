import { Tag } from "@prisma/client";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithTags extends Post {
  tags: Tag[];
}

export interface CreatePost {
  title: string;
  content: string;
  tagIds?: number[];
}

export interface CreatePostChecked {
  title: string;
  content: string;
  tagIds: number[];
}

export interface UpdatePost {
  title?: string;
  content?: string;
  tagIds?: number[];
}

export interface UpdatePostChecked {
  title?: string;
  content?: string;
  tagIds?: number[];
}