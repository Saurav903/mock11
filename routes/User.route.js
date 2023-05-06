const express = require("express");
const {UserModel} = require("../models/User.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin} = req.body;
    try {
        const user = new UserModel({name,email,password,isAdmin});
        await user.save();
        res.status(201).json({status:201,user,message:"user has been registered"});
    } catch (error) {
        console.log(error);
        res.send({"message":"Something went wrong","error":error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email,password})
        if(user){
            const token = jwt.sign({_id:user[0]._id},"usersdata");
            res.status(201).json({status:201,message:"login successful","token":token,"admin":user[0].isAdmin})
        }else {
            res.send("login fail");
        }
    } catch (error) {
        console.log(error);
        res.send({"message":"Something went wrong","error":error.message});
    }
})

module.exports={
    userRouter
}