const express = require("express")
const { PostController } = require("./post.controller")

const PostRouter = express.Router()

PostRouter.get("/", PostController.getAll)
PostRouter.get("/:id", PostController.getById)
PostRouter.post("/", PostController.create)

module.exports = { PostRouter }