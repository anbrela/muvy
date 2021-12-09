const Watch = require("../models/watch");
const User = require("../models/user");

const watchFilm = async (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    res.status(404).json({ message: "Faltan datos" });
  }

  const foundFilm = await Watch.findOne({
    user: { _id: userId },
    movieId: movieId,
  }).exec();

  if (foundFilm) {
    res.status(400).json({ message: "la pelicula ya está vista" });
  } else {
    const watchedFilm = new Watch({
      user: await User.findOne({ _id: userId }).exec(),
      movieId: movieId,
    });

    const savedWatch = await watchedFilm.save();

    res.status(200).json(savedWatch);
  }
};

const getUserWatchFilm = async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const film = await Watch.findOne({
      user: { _id: userId },
      movieId: movieId,
    }).exec();

    if (film) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (e) {
    console.log(e);
  }
};

const removeWatchFilm = async (req, res) => {
  const { userId, movieId } = req.params;

  if (!userId || !movieId) {
    res.status(404).json({ message: "Faltan datos" });
  }

  try {
    const filmRemoved = await Watch.findOneAndRemove({
      user: { _id: userId },
      movieId: movieId,
    }).exec();

    if (filmRemoved) {
      res.status(200).json(filmRemoved);
    } else {
      res.status(400).json({ message: "imposible eliminar" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  watchFilm,
  getUserWatchFilm,
  removeWatchFilm,
};
