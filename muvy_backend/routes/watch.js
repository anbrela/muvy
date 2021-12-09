const express = require("express");
const router = express.Router();

const watchController = require("../controllers/watch");

router.post("/watch/", watchController.watchFilm);
router.get("/watch/:userId/:movieId", watchController.getUserWatchFilm);
router.delete("/watch/:userId/:movieId", watchController.removeWatchFilm);

module.exports = router;
