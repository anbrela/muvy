const WatchList = require("../models/watchList");
const User = require("../models/user");

const addFilm = async (req, res) => {
  const { userId, movieId, posterPath } = req.body;

  if (!userId || !movieId) {
    res.status(404).json({ message: "Faltan datos" });
  }

  try {
    await WatchList.findOne(
      {
        user: { _id: userId },
        movieId: movieId,
      },
      {},
      {},
      async (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          res.status(400).json({ message: "la pelicula ya está vista" });
        } else {
          const addFilm = new WatchList({
            user: await User.findOne({ _id: userId }).exec(),
            movieId: movieId,
            posterPath: posterPath,
          });

          const savedFilm = await addFilm.save();

          res.status(200).json(savedFilm);
        }
      }
    ).clone();
  } catch (e) {
    console.log(e);
  }
};

const getWatchList = async (req, res) => {
  const { userId } = req.params;

  try {
    await WatchList.find(
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

const removeWatchListFilm = async (req, res) => {
  const { userId, movieId } = req.params;

  if (!userId || !movieId) {
    res.status(404).json({ message: "Faltan datos" });
  }

  try {
    const filmRemoved = await WatchList.findOneAndRemove({
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
  removeWatchListFilm,
  getWatchList,
  addFilm,
};
