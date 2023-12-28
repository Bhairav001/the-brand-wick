const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/User.model");

const userRouter = express.Router();


userRouter.post("/register",async(req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
    try {

        const existingUser = await UserModel.findOne({email})
           
         if(existingUser){
            return res.status(400).send({ "msg": "User with this email already exists"})
         }

         if (password.length < 5) {
            return res.status(400).send({ "msg": "Password should be at least 5 characters long" });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({ "msg": "Password and ConfirmPassword do not match" });
        }

        
        bcrypt.hash(password,5,async(err,secure_pass)=>{
            if(err){
                console.log(err)
            }else{
                const user =new UserModel({name,email,password:secure_pass,confirmPassword})
                await user.save();
                res.send({"msg":"User Registered"});
                console.log({msg:"User Registered"});
            }
        })
    } catch (error) {
        console.log({"msg":"Something went wrong",error:error.message});
    }
    
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"masai");
                    res.send({msg:"Login successfully done!","token":token})
                }else{
                    res.send({msg:"wrong credentials"})
                }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        console.log({msg:"something went wrong","error":error.message})
    }
})

module.exports={
    userRouter
}