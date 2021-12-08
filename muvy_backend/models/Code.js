const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const codeSchema = new Schema(
  {
    number: {
      type: String,
      unique: true,
    },
    device: {
      type: String,
    },
    used: {
      type: Boolean,
      default: false,
    },
    master: {
      type: Boolean,
      default: false,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Code", codeSchema);
