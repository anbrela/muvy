const Comment = require("../models/comment");
const User = require("../models/user");

const newComment = async (req, res) => {
  const { userId, movieId, content } = req.body;

  try {
    const comment = new Comment({
      user: await User.findOne({ _id: userId }).exec(),
      movieId: movieId,
      content: content,
    });

    const savedComment = await comment.save();

    res.status(200).json(savedComment);
  } catch (e) {
    console.log(e);
  }
};

const getFilmComments = async (req, res) => {
  const { movieId } = req.params;

  try {
    await Comment.find({ movieId: movieId }, (err, comments) => {
      if (err) {
        res.status(400).json({ message: "No hay comentarios" });
      }

      if (comments) {
        res.status(200).json(comments);
      }
    });
  } catch (e) {}
};

module.exports = {
  newComment,
  getFilmComments,
};
