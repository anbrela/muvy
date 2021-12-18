const express = require("express");
const router = express.Router();

const favController = require("../controllers/favorite");

router.post("/fav/", favController.favFilm);
router.get("/fav/:userId", favController.getFavList);
router.delete("/fav/:userId/:movieId", favController.removeFav);

module.exports = router;
