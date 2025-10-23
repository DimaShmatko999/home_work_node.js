import path from 'path';
import fs from 'fs/promises';
import { Post, CreatePostData, UpdatePostData, IPostService } from './post.types';

const postPath = path.join(__dirname, 'post.json');

export const PostService: IPostService = {
  async getAll(skip = 0, take) {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);
    return take !== undefined ? posts.slice(skip, skip + take) : posts.slice(skip);
  },

  async getById(id) {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);
    return posts.find(post => post.id === id);
  },

  async create(postData) {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);

    const newPost: Post = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      ...postData,
      likes: 0,
    };

    posts.push(newPost);
    await fs.writeFile(postPath, JSON.stringify(posts, null, 2));
    return newPost;
  },

  async update(id, updateData) {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);
    const index = posts.findIndex(post => post.id === id);

    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      ...updateData,
    };

    await fs.writeFile(postPath, JSON.stringify(posts, null, 2));
    return posts[index];
  }
};