const Like = require("../models/Like")
const Post = require("../models/Post")

exports.getAll = async (req, res) => {
    res.status(200).send({message: "success", "likes": await Like.find()})
}

exports.addOrRemove = async (req, res) => {
    const {idUser, idPost} = req.body

    console.log(req.body)
    let like = await Like.findOne({idUser, idPost})
    let post = await Post.findById(idPost)

    if (like) {
        console.log("remove like")
        await Post.findByIdAndUpdate(
            {_id: idPost},
            {
                $pull: {
                    likes: [like._id],
                },
            }
        )

        await like.remove()
    } else {
        console.log("add like")

        like = new Like()
        like.date = Date.now()
        like.idUser = idUser
        like.isPost = idPost

        post = await Post.findById(idPost).populate("likes")

        await Post.findByIdAndUpdate({
                _id: idPost
            },
            {
                $push: {
                    likes: like._id,
                },
            }
        )

        await like.save()
    }

    res.status(200).send({message: "success", post})
}