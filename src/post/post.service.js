const path = require("path")
const fs = require("fs/promises")

const postPath = path.join(__dirname, "post.json")

const PostService = {
  async getAll(skip = 0, take) {
    const data = await fs.readFile(postPath, "utf-8")
    const posts = JSON.parse(data)
    if (take !== undefined) {
      return posts.slice(skip, skip + take)
    }
    return posts.slice(skip)
  },

  async getById(id) {
    const data = await fs.readFile(postPath, "utf-8")
    const posts = JSON.parse(data)
    return posts.find((post) => post.id === id)
  },

  async create({ name, description, image }) {
    const data = await fs.readFile(postPath, "utf-8")
    const posts = JSON.parse(data)

    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      name,
      description,
      image,
      likes: 0,
    }

    posts.push(newPost)
    await fs.writeFile(postPath, JSON.stringify(posts, null, 2))
    return newPost
  },
}

module.exports = { PostService }