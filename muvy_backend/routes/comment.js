const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");

router.post("/comment/", commentController.newComment);
//router.put("/rate/", rateController.updateRate);
router.get("/comment/:movieId", commentController.getFilmComments);

module.exports = router;
