const express = require("express")
const router = express.Router()
const MusicController = require("../controllers/music-controller")
const upload = require("../middlewares/storage-music")

router
  .route("/")
  .get(MusicController.getAll)
  .post(
    upload.fields([
      {
        name: "music",
        maxCount: 1,
      },
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    MusicController.add
  )
  .delete(MusicController.delete)

router.post("/par-id", MusicController.recupererParId)

router.delete("/tout", MusicController.deleteAll)

module.exports = router
