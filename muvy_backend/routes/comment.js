const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");

router.post("/comment/", commentController.newComment);
router.put("/comment/:commentId", commentController.replyComment);
router.put("/like", commentController.likeComment);
router.get("/comment/:movieId", commentController.getFilmComments);

module.exports = router;
