let Rating = require("../models/Rating")
const Post = require("../models/Post")

exports.recupererRatingsParPost = async (req, res) => {
    console.log(req.body)
    res.send({ ratings: await Rating.find({ post: req.body.post }) })
}

exports.recupererRatingParUser = async (req, res) => {
    console.log(req.body)
    res.send({ rating: await Rating.findOne({ user: req.body.user, post: req.body.post  }) })
}

exports.addRating = async (req, res) => {
    console.log(req.body)
    const { note, user, post } = req.body

    const newRating = new Rating()
    newRating.note = note
    newRating.user = user
    newRating.post = post

    await Post.findOneAndUpdate(
        { _id: user },
        {
            $push: {
                ratings: [newRating._id]
            }
        }
    )

    newRating.save()

    res.status(200).send({ message: "success", rating: newRating })
}

exports.editRating = async (req, res) => {
    const { _id, note } = req.body

    let rating = await Rating.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                note: note
            }
        }
    )
    res.status(200).send({ message: "success", rating: rating })
}

exports.deleteRating = async (req, res) => {
    const rating = await Rating.findById(req.body._id).remove()
    res.status(200).send({ message: "success", rating: rating })
}

exports.deleteAllRating = async (req, res) => {
    Rating.remove({}, function (err, rating) {
        if (err) { return handleError(res, err) }
        return res.status(204).send({ message: "Aucun element" })
    })
}
