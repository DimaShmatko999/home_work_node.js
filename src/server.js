const express = require("express")
const { PostRouter } = require("./post/post.router")
const app = express()
const PORT = 8001
const HOST = "localhost"

app.use(express.json())

app.use("/posts", PostRouter)

app.get("/", (req, res) => {
  res.status(200).json("hello")
})

app.listen(PORT, HOST, () => {
  console.log(`Server started on http://${HOST}:${PORT}`)
})