const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{

    if(req.method === 'OPTIONS') return next()
    
    let token
    try{
        token = req.headers.authorization
       // console.log(token)
        if(!token){
            throw new Error('authentication failed in token verification')
        }
        const tokenInfo = jwt.verify(token,"armageddon391")
        if(!tokenInfo.email || !tokenInfo.isAdmin){
            throw new Error('authentication failed in token verification')
        }
        req.userData = {email:tokenInfo.email , isAdmin:tokenInfo.isAdmin}
        next();
    }
    catch(err){
        return res.json({error:"auth failed"})
    }
}