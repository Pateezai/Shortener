import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
 
export const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username:req.body.username,
            password:hash,
            email:req.body.email,
            phone:req.body.phone,
        })
        await newUser.save()
        res.status(201).send("User has been created!!")
    }catch(err){
        next(err);
    }
}
export const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({
            username:req.body.username
        })
        if(!user) return next(createError(404, "User not found!"))
        console.log('success login')
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))
        
        const token = jwt.sign({id:user._id, admin:user.admin}, process.env.JWT)

        const {password, admin, phone, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({...otherDetails})
    }catch(err){
        next(err);
    }
}