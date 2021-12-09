const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    role: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Roles", roleSchema);
