const express = require("express");
const { userLogIn } = require("../controllers/users-controllers");

const userrouter = express.Router();

userrouter.post(
    "/login",
    (req, res, next) => {
        console.log(req.body);
        next();
    },
    userLogIn
);

module.exports = userrouter;
