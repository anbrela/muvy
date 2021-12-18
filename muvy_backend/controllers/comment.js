const Comment = require("../models/comment");
const User = require("../models/user");
const Like = require("../models/like");

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

const likeComment = async (req, res) => {
  const { userId, commentId, movieId, type } = req.body;

  const likeFound = await Like.findOne({
    comment: { _id: commentId },
    user: { _id: userId },
    movieId: movieId,
  })
    .then((res) => {
      return res;
    })
    .catch((e) => console.log(e));

  if (likeFound) {
    try {
      await Like.findByIdAndRemove(likeFound._id);
      await Comment.updateOne(
        { _id: commentId },
        {
          $pullAll: {
            likes: [{ _id: likeFound._id }],
            dislikes: [{ _id: likeFound._id }],
          },
        },
        { safe: true }
      );

      const comments = await Comment.find({ movieId: movieId })
        .populate("user")
        .populate({
          path: "replies",
          populate: {
            path: "user",
          },
        })
        .populate({
          path: "replies",
          populate: {
            path: "replies",
            populate: {
              path: "user",
            },
          },
        });

      res.status(200).json(comments);
    } catch (e) {
      console.log(e);
    }
  }

  if (!likeFound) {
    try {
      const newLike = await new Like({
        user: await User.findById(userId),
        comment: await Comment.findById(commentId),
        movieId: movieId,
      });

      const savedLike = await newLike.save();

      if (type === "likes") {
        await Comment.updateOne(
          { _id: commentId },
          {
            $push: {
              likes: savedLike,
            },
          }
        );
        const comments = await Comment.find({ movieId: movieId })
          .populate("user")
          .populate({
            path: "replies",
            populate: {
              path: "user",
            },
          })
          .populate({
            path: "replies",
            populate: {
              path: "replies",
              populate: {
                path: "user",
              },
            },
          });

        res.status(200).json(comments);
      } else {
        await Comment.updateOne(
          { _id: commentId },
          {
            $push: {
              dislikes: savedLike,
            },
          }
        );

        const comments = await Comment.find({ movieId: movieId })
          .populate("user")
          .populate({
            path: "replies",
            populate: {
              path: "user",
            },
          })
          .populate({
            path: "replies",
            populate: {
              path: "replies",
              populate: {
                path: "user",
              },
            },
          });

        res.status(200).json(comments);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const replyComment = async (req, res) => {
  const { userId, movieId, content } = req.body;
  const { commentId } = req.params;

  try {
    const comment = new Comment({
      user: await User.findOne({ _id: userId }).exec(),
      movieId: movieId,
      content: content,
      likes: [],
      dislikes: [],
      isReply: true,
    });

    const savedComment = await comment.save();

    try {
      await Comment.findByIdAndUpdate(
        commentId,
        { $push: { replies: await Comment.findById(savedComment._id) } },
        { safe: true, upsert: true }
      );

      const comments = await Comment.find({ movieId: movieId })
        .populate("user")
        .populate({
          path: "replies",
          populate: {
            path: "user",
          },
        })
        .populate({
          path: "replies",
          populate: {
            path: "replies",
            populate: {
              path: "user",
            },
          },
        });

      res.status(200).json(comments);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

const getFilmComments = async (req, res) => {
  const { movieId } = req.params;

  try {
    const comments = await Comment.find({ movieId: movieId })
      .populate("user")
      .populate({
        path: "replies",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "replies",
        populate: {
          path: "replies",
          populate: {
            path: "user",
          },
        },
      })

      .exec();
    if (comments) {
      res.status(200).json(comments);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  newComment,
  getFilmComments,
  likeComment,
  replyComment,
};
