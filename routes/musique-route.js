const express = require("express");
const router = express.Router();
const MusiqueController = require("../controllers/musique-controller");
const upload = require("../middlewares/storage-music");

router
  .route("/")
  .get(MusiqueController.recupererTout)
  .post(
    upload.fields([
      {
        name: "musique",
        maxCount: 1,
      },
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    MusiqueController.ajouter
  )
  .delete(MusiqueController.supprimer);

router.post("/par-id", MusiqueController.recupererParId);

router.delete("/tout", MusiqueController.supprimerTout);

module.exports = router;
