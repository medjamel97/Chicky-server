const Comment = require("../models/Comment")
const User = require("../models/User")
const Post = require("../models/Post")

exports.getAll = async (req, res) => {
    res.status(200).send({message: "success", "comments": await Comment.find()})
}

exports.add = async (req, res) => {
    const {idUser, idPost, description} = req.body

    console.log(req.body)
    let comment = new Comment()
    comment.description = description
    comment.date = Date.now()
    comment.user = idUser
    let user = await User.findById(idUser)
    comment.post = idPost

    let post = await Post.findById(idPost).populate("comments")

    await Post.findByIdAndUpdate({
            _id: idPost
        },
        {
            $push: {
                comments: comment._id,
            },
        }
    )

    await comment.save()

    res.status(200).send({message: "success", post})
}

exports.deleteAllComment = async (req, res) => {
    Comment.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
        return res.status(204).send({ message: "Aucun element" })
    })
}