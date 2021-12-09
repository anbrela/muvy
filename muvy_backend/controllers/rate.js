const Rate = require("../models/rate");
const User = require("../models/user");

const getRatedFilm = async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const film = await Rate.findOne({
      user: { _id: userId },
      movieId: movieId,
    }).exec();

    if (film) {
      res.status(200).json(film);
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateRate = async (req, res) => {
  const { userId, movieId, rate } = req.body;

  console.log(req.body);

  if (!userId || !movieId || !rate) {
    res.status(404).json({ message: "Faltan datos" });
  } else {
    try {
      await Rate.findOneAndUpdate(
        {
          user: { _id: userId },
          movieId: movieId,
        },
        {
          user: { _id: userId },
          movieId: movieId,
          rating: rate,
        },
        {
          upsert: true,
          new: true,
        },
        (err, updated) => {
          if (err) {
            res.status(400).json({ message: "imposible actualizar" });
          }

          if (updated) {
            console.log(updated);
            res.status(200).json(updated);
          }
        }
      ).clone();
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = {
  updateRate,
  getRatedFilm,
};
