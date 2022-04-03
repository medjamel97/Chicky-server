const express = require("express")
const router = express.Router()
const RatingController = require("../controllers/rating-controller")

router.route("/")
    .post(RatingController.addRating)
    .put(RatingController.editRating)

router.post("/par-user-post", RatingController.recupererRatingParUser)
router.post("/par-post", RatingController.recupererRatingsParPost)

router.delete("/deleteAll", RatingController.deleteAllRating)
router.post("/supp", RatingController.deleteRating)

module.exports = router