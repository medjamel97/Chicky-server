let Post = require("../models/Post")

exports.getAll = async (req, res) => {
  res.send({ post: await Post.find() })
}

exports.getMy = async (req, res) => {
  res.send({ posts: await Post.find({ user: req.body.user }) })
}

exports.add = async (req, res) => {
  const { title, description, userId } = req.body

  let post = await new Post({
    title,
    description,
    videoFilename: req.file.filename,
    userId,
  }).save()

  return res.status(201).send({ message: "Post added successfully", post });
}

exports.edit = async (req, res) => {
  const { _id, title, description } = req.body
  let post = await Post.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        title,
        description
      },
    }
  )

  res.status(201).send({ message: "Post edited successfully", post })
}

exports.delete = async (req, res) => {
  await Post.findById(req.body._id)
    .then(function (post) {

      deleteFile("./uploads/videos/" + post.videoFilename)
      post.remove()

      res.status(201).send({ message: "Post deleted successfully" })
    })
    .catch(function (error) {
      res.status(500).send(error)
    })
}

exports.deleteAll = async (_req, res) => {
  await Post.find({})
    .then(function (posts) {
      posts.forEach(function (post) {

        deleteFile("./uploads/videos/" + post.videoFilename)
        post.remove()

        res.status(201).send({ message: "All posts have been deleted" })
      })
        .catch(function (error) {
          res.status(500).send(error)
        })
    })
}

function deleteFile(fullPath) {
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Could not delete file " + fullPath + " : " + err);
      return;
    }
  });
}