const express = require("express");
const router = express.Router();

const rateController = require("../controllers/rate");

router.get("/rate/:userId/:movieId", rateController.getRatedFilm);
router.put("/rate/", rateController.updateRate);
router.get("/rate/:movieId", rateController.getFilmRatings);

module.exports = router;
