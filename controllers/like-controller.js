const Like = require("../models/Like")
const Music = require("../models/Music")

exports.addOuSupprimer = async (req, res) => {
  const { idUser, idMusic } = req.body

  let like = await Like.findOne({
    user: idUser,
    music: idMusic,
  })
  let music = await Music.findById(idMusic)

  if (like) {
    music.update(
      { _id: user },
      {
        $pull: {
          likes: [like._id],
        },
      }
    )

    like.remove()
  } else {
    like = new Like()
    like.date = Date.now()
    like.user = idUser
    like.music = idMusic

    music.update(
        { _id: user },
        {
          $push: {
            likes: [like._id],
          },
        }
      )

    like.save()
  }

  res.status(200).send({ message: "success" })
}
