const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const userModel = require("../models/userModels");
dotenv.config();

const userLogin = async (req, res, next) => {
    let { email, password, employeeSecret } = req.body;

    const loginBypassFlag = "abacus{user_31k4n1h4n125td}"
        
    if (!email || !password || !employeeSecret)
        return res.status(400).json({ error: "invalid data" });
    if (employeeSecret != "1p4v#dr45ht1") {
        return res.status(400).json({
            error: "invalid data",
        });
    }
    console.log(email , password)
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
    console.log(identifyUser)
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

        return res
            .status(200)
            .json({ email: identifyUser.email, token: token , flag: loginBypassFlag});
    }

    res.status(400).json({ error: "invalid credentials" });
};

const userRegister = async (req , res) =>{
    const {name , email , password} = req.body  ;


    if(!name || !email || !password ) return res.json({error:"invalid data"})

    let identifyUser 
    try {
        //checking if email already exists
         identifyUser = await userModel.findOne({email:email})
    }
    catch(err){
        
        return res.json({error:"something went wrong"});
    }

    if(identifyUser) return res.json({error:"email already exists"})

    const user = new userModel({
        name,
        email,
        password
    })

    try{
        await user.save();
    }
    catch(err){
       return res.json({error:"something went wrong"})
    }

     //generating jwt token
     let token
     try{
         token = jwt.sign({email:email},'secretkey',{expiresIn:'24hrs'})
     }
     catch(err){
         const error = new httpError('try again later',400)
         return next(error)
     }
 
     res
     .status(201)
     .json({email:email,token:token});

}

module.exports = {
    userLogin,
    userRegister
};
