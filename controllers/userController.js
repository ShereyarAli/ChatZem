const User = require('../schema/registerSchema');
const jwt = require('jsonwebtoken')
const Verification = require('../schema/verificationSchema')
const crypto = require('crypto')
const transport = require('../utils/sendEmail')
const {validate} = require('deep-email-validator')
const bcrypt = require('bcryptjs')

const register = async (req,res) => {
    try{
        const{ name, email, password } = req.body;
//check if credentials were provided        
        if(!name || !email || !password){
            return res.status(401).json({message:'Please Provide credentials'})
        }
//Validate email if it Exist        
        const validationResult = await validate(email);
        console.log(validationResult)
        if (!validationResult.valid) {
            return res.status(400).send({
                status: 'error',
                message: 'Email is not valid. Please try again!',
                reason: validationResult.reason
            });
        }
//Hash user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        console.log(hashPassword)
        const temp = {email, name, password:hashPassword}
        console.log(temp) 
//create user in database        
        const user = await User.create(temp)
//create a verification token for this user
        const veriToken = await Verification.create({userId:user.id, token:crypto.randomBytes(32).toString('hex')})

        const url = `${process.env.BASE_URL}/api/user/${user.id}/verify/${veriToken.token}`
//send a verification email
        transport(user.email,'Verify Email',url)
//succesful response
        res.status(201).json({name:user.name, message:'A verification link is sent to your email'})
    } 
    catch(error){
        console.log(error)
//Check if email already exist in database        
        if(error.errorResponse.code === 11000){
            return res.status(500).json({message:'Email Already exsit'})
        }
//Any other error        
        res.status(500).json(error)
    }
}

const login = async(req, res) => {
    try{
        const{email:userEmail, password:userPassword} = req.body
//check if credentials were provided        
        if(!userEmail || !userPassword){
            res.status(401).json({message:'Please provide credentials'})
        }
//Find user in database        
        const user = await User.findOne({email:userEmail})
//If user is not found        
        if(!user){
            res.status(400).json({message:'Invalid credentials'})
        }
//Check for credentials verification        
        if(user.email === userEmail && user.password === userPassword){
//Check if user is verified            
            if(user.verified){
                const token = user.createJWT()
                return res.status(201).json({status:'Login successful', jwtToken: token})
            }
            else{
                return res.status(401).json({message:'User is not verified, Please verify your email'})
            }
        }
        else{
            res.status(401).json({message:'Email Address or Password is wrong, Try Again'})
        }
    }
    catch(error){
//Any other error        
        res.status(500).json(error)
    }
}

const verifyUser = async(req,res) => {
    try {   
//Find user in database        
        const user = await User.findOne({_id: req.params.id})
        if(!user){
            return res.status(400).json({message:'user does not exist'})
        }
//Find Token in database        
        const veriToken = await Verification.findOne({userId:user.id, token:req.params.veriUrlToken})
        
        if(!veriToken){
           return res.status(400).json({message:'Invalid Link'})
        }
//Update the verified status        
        await User.updateOne({_id:user.id},{verified:true})
//Delete the token after succesfull verification        
        await Verification.deleteOne(veriToken);
//Sucessfull response        
        res.status(201).send({message:'user registered sucessfully'})
    }
    catch (error) {
//Any other error        
        console.log(error)
        res.status(500).json({error, message:'something went wrong'})
    }
}
module.exports = {register, login,verifyUser}