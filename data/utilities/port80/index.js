const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const articleRouter = require("./routes/articles-routes");
const userRouter = require("./routes/users-routes");
const verifyJWT = require("./middlewares/verify-jwt");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Accept,Content-Type,X-Requested-With,Origin,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");

    next();
});
app.use("/uploads/images", express.static(path.join("images")));
app.use(express.static(path.join(__dirname, "build")));

//REST API
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.get("/api/secret", verifyJWT, (req, res) => {
    if (req.userData.isAdmin === false) {
        return res.status(500).json({
            error: "you are not an admin",
        });
    }
    let flag = "abacus{f4vj0mdh44mkb4r}";
    return res.json({
        message: flag,
    });
});

//error handling
app.use((req, res, next) => {
    const error = new Error("could not find this route");
    error.code = 400;
    next(error);
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (error) => {
            console.log(error);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "something went wrong" });
});

const murl = "mongodb://localhost/krk";
mongoose
    .connect(murl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("mongodb connected");
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
