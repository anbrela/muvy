const express = require("express");
const router = express.Router();

const authJwt = require("../middlewares/auth");

const userController = require("../controllers/user");

router.post("/signup", userController.signup);

router.post("/signin", userController.signIn);

// router.get("/loginByToken", authJwt.verifyToken, userController.loginByToken);
//
// router.put("/:userId", authJwt.verifyToken, userController.userUpdatedById);
//
// router.get("/:userId", userController.getUserById);

module.exports = router;
