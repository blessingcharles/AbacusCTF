const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const userModel = require("../models/userModels");

dotenv.config();

const userLogin = async (req, res, next) => {
    let { email, password, employeeSecret } = req.body;

    if (!email || !password || !employeeSecret)
        return res.status(400).json({ error: "invalid data" });
    if (employeeSecret != process.env.EMPLOYEE_SECRET) {
        return res.status(400).json({
            error: "invalid data",
        });
    }

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

    if (identifyUser) {
        //generate token other stuffs
        let token;
        try {
            token = jwt.sign(
                { email: identifyUser.email, isAdmin: false },
                "secretkey",
                {
                    expiresIn: "24hrs",
                }
            );
        } catch (err) {
            const error = new httpError("try again later", 400);
            return next(error);
        }

        return res
            .status(200)
            .json({ email: identifyUser.email, token: token });
    }

    res.status(400).json({ error: "invalid credentials" });
};

module.exports = {
    userLogin,
};
