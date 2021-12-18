const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],

    isReply: {
      type: Boolean,
      required: true,
      default: false,
    },

    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
