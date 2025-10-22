import path from 'path';
import fs from 'fs/promises';

const postPath = path.join(__dirname, 'post.json');

interface Post {
  id: number;
  name: string;
  description: string;
  image: string;
  likes: number;
}

interface CreatePostDTO {
  name: string;
  description: string;
  image: string;
}

export const PostService = {
  async getAll(skip = 0, take?: number): Promise<Post[]> {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);
    if (take !== undefined) {
      return posts.slice(skip, skip + take);
    }
    return posts.slice(skip);
  },

  async getById(id: number): Promise<Post | undefined> {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);
    return posts.find(post => post.id === id);
  },

  async create({ name, description, image }: CreatePostDTO): Promise<Post> {
    const data = await fs.readFile(postPath, 'utf-8');
    const posts: Post[] = JSON.parse(data);

    const newPost: Post = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      name,
      description,
      image,
      likes: 0,
    };

    posts.push(newPost);
    await fs.writeFile(postPath, JSON.stringify(posts, null, 2));
    return newPost;
  },
};