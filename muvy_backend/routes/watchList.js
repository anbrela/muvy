const express = require("express");
const router = express.Router();

const watchListController = require("../controllers/watchList");

router.post("/watchList/", watchListController.addFilm);
router.get("/watchList/:userId", watchListController.getWatchList);
router.delete(
  "/watchList/:userId/:movieId",
  watchListController.removeWatchListFilm
);

module.exports = router;
