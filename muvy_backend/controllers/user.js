//Importamos el modelo del usuario para iniciar sesión y registrar usuario.
const User = require("../models/user");
const Roles = require("../models/roles");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, recievedPassword) => {
  return await bcrypt.compare(password, recievedPassword);
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    roles: await Roles.findOne({ role: "User" }).exec(),
    password: await encryptPassword(password),
  });

  const query = { email: req.body.email };

  User.findOne(query, async (err, user) => {
    if (err) {
      console.log(err);
      res.status(404).json({ message: "Ha habido un error desconocido" });
    }

    if (user) {
      res
        .status(404)
        .json({ message: "El usuario registrado con ese email ya existe" });
    } else {
      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      res.status(200).json({
        user: savedUser,
        token: token,
        userID: savedUser._id,
        username: savedUser.username,
        role: savedUser.roles,
        expires: 86400,
      });
    }
  });
};

const signIn = async (req, res) => {
  console.log("req", req.body.email);

  const userFound = await User.findOne({
    email: req.body.email,
  });

  if (!userFound) {
    return res.status(400).json({ message: "user not found" });
  } else {
    const matchPassword = await comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res
        .status(401)
        .json({ token: null, message: "la contraseña no coincide" });

    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      user: userFound,
      token: token,
      userID: userFound._id,
      username: userFound.username,
      expires: 86400,
      roles: userFound.roles,
    });
  }
};

module.exports = {
  signup,
  signIn,
};
