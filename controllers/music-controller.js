let Music = require("../models/Music")
const fs = require("fs")

exports.getAll = async (req, res) => {
  res.send({ musics: await Music.find() })
}

exports.recupererParId = async (req, res) => {
  res.send({ music: await Music.findById(req.body._id) })
}

exports.add = async (req, res) => {
  const { title, artist } = req.body

  const newMusic = new Music()
  
  newMusic.title = title
  newMusic.artist = artist
  newMusic.filename = req.files.music[0].filename
  newMusic.imageFilename = req.files.image[0].filename

  newMusic.save()

  res.status(200).send({ message: "success", music: newMusic })
}

exports.delete = async (req, res) => {
  await Music.findById(req.body._id)
    .then(function (music) {
      fs.unlink("./uploads/music/" + music.emplacementFichier, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })

      fs.unlink("./uploads/music/" + music.emplacementImageAlbum, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })

      music.remove()

      return res.status(200).send({ message: "success" })
    }).catch(function (error) {
      res.status(500).send(error)
    })
}

exports.deleteAll = async (req, res) => {
  Music.find({})
    .then(function (musics) {
      musics.forEach(function (music) {
        fs.unlink("./uploads/music/" + music.emplacementFichier, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })

        fs.unlink(
          "./uploads/music/" + music.emplacementImageAlbum,
          (err) => {
            if (err) {
              console.error(err)
              return
            }
          }
        )

        music.remove()
      })

      return res.status(200).send({ message: "success" })
    })
    .catch(function (error) {
      res.status(500).send(error)
    })
}
