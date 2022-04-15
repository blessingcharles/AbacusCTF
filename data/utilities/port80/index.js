const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs")

const { userLogin } = require("./controllers/usersControllers");
const verifyJWT = require("./jwt-verify");

dotenv.config();
const app = express();

app.use(bodyparser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Accept,Content-Type,X-Requested-With,Origin,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");

    next();
});

app.post("/api/login", userLogin);

app.get("/api/abacus-secret",verifyJWT ,(req, res) => {

    if(req.userData.isAdmin === false){
        return res.status(500).json({
            error:"you are not an admin"
        })
    }

    const data = fs.readFileSync('sshprivatekey', 'utf8')

    let flag = "abacus{" + data + "}"
    return res.json({
        message: flag,
    });

});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ngskc.mongodb.net/abacusCTF?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("mongodb connected");
        app.listen(process.env.PORT);
        console.info("[+] Server Started at Port", process.env.PORT);
    })
    .catch((err) => {
        console.log(err);
    });
