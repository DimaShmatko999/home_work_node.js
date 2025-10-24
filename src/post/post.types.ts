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

export interface GetPostsResponse {
  posts: PostWithTags[];
}

export interface GetPostByIdRequest {
  id: number;
}

export interface GetPostByIdResponse {
  post: PostWithTags | null;
}

export interface CreatePostRequest {
  data: CreatePost;
}

export interface CreatePostResponse {
  post: PostWithTags;
}

export interface UpdatePostRequest {
  id: number;
  data: UpdatePost;
}

export interface UpdatePostResponse {
  post: PostWithTags;
}

export interface DeletePostRequest {
  id: number;
}

export interface DeletePostResponse {
  post: Post | null;
}