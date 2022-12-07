let Post = require("../models/Post")
const fs = require("fs")

exports.getAll = async (req, res) => {
    res.send({posts: await Post.find().populate("likes comments user")})
}

exports.getByUser = async (req, res) => {
    res.send({
        posts: await Post.find({user: req.params.userId})
            .populate("likes comments user")
    })
}

exports.add = async (req, res) => {
    const {title, description, userId} = req.body

    let videoFilename;
    if (req.file) {
        videoFilename = req.file.filename
    }

    let post = await new Post({
        title,
        description,
        videoFilename,
        userId,
    }).save()

    return res.status(200).send({message: "Post added successfully", post});
}

exports.edit = async (req, res) => {
    const {_id, title, description, user} = req.body
    let post = await Post.findOneAndUpdate(
        {_id: _id},
        {
            $set: {
                title,
                description,
                user
            },
        }
    )

    res.status(200).send({message: "Post edited successfully", post})
}

exports.delete = async (req, res) => {
    await Post.findById(req.body._id)
        .then(function (post) {

            deleteFile("./uploads/videos/" + post.videoFilename)
            post.remove()

            res.status(200).send({message: "Post deleted successfully"})
        })
        .catch(function (error) {
            console.log(error)
            res.status(500).send({error})
        })
}

exports.deleteAll = async (_req, res) => {
    await Post.find({})
        .then(function (posts) {
            posts.forEach(function (post) {

                deleteFile("./uploads/videos/" + post.videoFilename)
                post.remove()

                res.status(200).send({message: "All posts have been deleted"})
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

const gify = require('gify')

exports.gen = async (_req, res) => {

    gify('out.mp4', 'out.gif', function (err) {
        if (err) throw err;
    })

    res.send("HI")
}

