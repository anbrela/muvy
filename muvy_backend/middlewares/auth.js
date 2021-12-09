const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({ message: "no token" });

        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};

module.exports = { verifyToken };