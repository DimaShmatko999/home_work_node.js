const { PostService } = require("./post.service")

const PostController = {
  getAll: async (req, res) => {
    try {
      const skipParam = req.query.skip
      const takeParam = req.query.take

      if (skipParam !== undefined && isNaN(+skipParam)) {
        return res.status(400).json("skip must be a number")
      }
      if (takeParam !== undefined && isNaN(+takeParam)) {
        return res.status(400).json("take must be a number")
      }

      const skip = skipParam ? +skipParam : 0
      const take = takeParam ? +takeParam : undefined
      const posts = await PostService.getAll(skip, take)
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({ message: "Failed to read posts" })
    }
  },

  getById: async (req, res) => {
    try {
      const id = +req.params.id
      if (isNaN(id)) {
        return res.status(400).json("id must be an integer")
      }

      const post = await PostService.getById(id)
      if (!post) {
        return res.status(404).json("post not found")
      }

      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: "Failed to read posts" })
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, image } = req.body

      if (!name || !description || !image) {
        return res.status(422).json({ message: "name, description and image are required" })
      }

      const newPost = await PostService.create({ name, description, image })
      res.status(201).json(newPost)
    } catch (error) {
      res.status(500).json({ message: "Failed to create post" })
    }
  },
}

module.exports = { PostController }