let Comment = require("../models/Comment")
const Post = require("../models/Post")

exports.recupererCommentParPost = async (req, res) => {
    res.send({
        comment: await Comment.find({
            post: req.body.post,
        }).populate("user post"),
    })
}

exports.recupererComment = async (req, res) => {
    res.send({comment: await Comment.findById(req.body._id)})
}

exports.addComment = async (req, res) => {
    console.log(req.body)
    const {description, user, post} = req.body

    const comment = new Comment(
        description,
        user,
        post
    )
    comment.description = description
    comment.user = user
    comment.post = post

    await Post.findOneAndUpdate(
        {_id: post},
        {
            $push: {
                comments: [comment._id],
            },
        }
    )

    await User.findOneAndUpdate(
        {_id: user},
        {
            $push: {
                comments: [comment._id],
            },
        }
    )

    comment.save()

    res.status(200).send({message: "success", comment: comment})
}

exports.editComment = async (req, res) => {
    const {_id, description} = req.body

    let comment = await Comment.findOneAndUpdate(
        {_id: _id},
        {
            $set: {
                description: description,
            },
        }
    )
    res.status(200).send({message: "success", comment: comment})
}

exports.deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.body._id).remove()
    res.status(200).send({message: "success", comment: comment})
}

exports.deleteAllComment = async (req, res) => {
    Comment.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
        return res.status(204).send({message: "Aucun element"})
    })
}
