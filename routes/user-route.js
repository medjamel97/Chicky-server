const express = require("express")
const router = express.Router()
const userController = require("../controllers/user-controller");
const upload = require('../middlewares/storage-images');

router.route("/")
    .get(userController.getAll)

router.post("/register", upload.single('picture'), userController.register);
router.post("/login", userController.login);
router.post("/login-with-social", userController.loginWithSocial);
router.post("/send-confirmation-email", userController.sendConfirmationEmail);
router.get("/confirmation/:token", userController.confirmation);
router.post("/forgot-password", userController.forgotPassword);
router.put("/update-profile", upload.single('picture'), userController.updateProfile);
router.put("/update-password", userController.updatePassword);

router.route("/one")
    .post(userController.get)
    .delete(userController.delete);

router.route("/all").get(userController.getAll).delete(userController.deleteAll);

module.exports = router