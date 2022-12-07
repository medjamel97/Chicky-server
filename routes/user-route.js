const express = require("express")
const router = express.Router()
const controller = require("../controllers/user-controller");
const multipart = require('connect-multiparty')

// BASIC
router.route("/")
    .get(controller.getAll)
router.route("/one/:userId")
    .get(controller.get);

// AUTH
router.post("/register", multipart({}), controller.register);
router.post("/login", controller.login);
//router.post("/login-with-social", controller.loginWithSocial);

// UPDATE
router.put("/update-profile", multipart({}), controller.updateProfile);
router.put("/update-password", controller.updatePassword);

// FORGOT PASSWORD
router.post("/forgot-password", controller.forgotPassword);
router.post("/verify-reset-code", controller.verifyResetCode);
router.post("/reset-password", controller.resetPassword);


module.exports = router