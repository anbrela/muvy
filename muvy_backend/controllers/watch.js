const Watch = require("../models/watch");
const User = require("../models/user");

const watchFilm = async (req, res) => {
  const { userId, movieId, posterPath } = req.body;

  if (!userId || !movieId) {
    res.status(404).json({ message: "Faltan datos" });
  }

  const foundFilm = await Watch.findOne({
    user: { _id: userId },
    movieId: movieId,
    posterPath: posterPath,
  }).exec();

  if (foundFilm) {
    res.status(400).json({ message: "la pelicula ya está vista" });
  } else {
    const watchedFilm = new Watch({
      user: await User.findOne({ _id: userId }).exec(),
      movieId: movieId,
      posterPath: posterPath,
    });

    const savedWatch = await watchedFilm.save();

    res.status(200).json(savedWatch);
  }
};

const getWatchList = async (req, res) => {
  const { userId } = req.params;

  try {
    await Watch.find(
      {
        user: { _id: userId },
      },
      {},
      {},
      (err, results) => {
        if (err) {
          console.log(err);
        }

        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400).json({ message: "no hay resultados" });
        }
      }
    ).clone();
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
      console.log(filmRemoved);
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
  getWatchList,
  removeWatchFilm,
};
