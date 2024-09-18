const jwt = require('jsonwebtoken')
const User = require('../schema/registerSchema')
const auth = (req,res,next) => {
  try{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      res.status(401).json({message:'No token available'})
    }
    const payload = jwt.verify(authHeader.split(' ')[1],process.env.JWT_SECRET)
    console.log(payload)
    req.user = {userId: payload.userId,message:'auth sucess'}
    next();
  }
  catch(error){
    console.log(error)
    res.status(400).json({message:'Invalid Token'})
  }

}
module.exports = auth 