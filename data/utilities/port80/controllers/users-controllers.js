const userModel = require("../models/user-schema");

const jwt = require("jsonwebtoken");

const userLogIn = async (req, res, next) => {
    let { email, password, secret } = req.body;

    const loginBypassFlag = "abacus{user_31k4n1h4n125td}";

    if (!email || !password || !secret)
        return res.status(400).json({ error: "invalid data" });
    if (secret != "1p4v#dr45ht1") {
        return res.status(400).json({
            error: "invalid data",
        });
    }
    console.log(email, password);
    let identifyUser;
    try {
        identifyUser = await userModel.findOne({
            email: email,
            password: password,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
    }
    console.log(identifyUser);
    if (identifyUser) {
        //generate token other stuffs
        let token;
        try {
            token = jwt.sign(
                { email: identifyUser.email, isAdmin: false },
                "armageddon391",
                {
                    expiresIn: "24hrs",
                }
            );
        } catch (err) {
            const error = new httpError("try again later", 400);
            return next(error);
        }

        return res.status(200).json({
            email: identifyUser.email,
            token: token,
            flag: loginBypassFlag,
        });
    }

    res.status(400).json({ error: "invalid credentials" });
};

module.exports = {
    userLogIn,
};
