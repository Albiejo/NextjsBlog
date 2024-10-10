import express from "express";
import generateToken from "../Utils/UserToken.js";
import userService from "../Services/userService.js";



class userController{

    async userLogin(req , res){
        try {
            const {email , password} = req.body;
            
            const user = await userService.userLoginService(email , password);

            generateToken(res , user._id);

            return res.status(200).json({
                success:true,
                message:"Login successful",
                user:{
                    id:user._id,
                    email:user.email
                }
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An unexpected error occurred during login",
            });
        }
    }


    async userRegistration(req , res){
        try {

            
            const {email , password , name} = req.body;
            const newUser =await userService.userRegistration(email , password , name)
            return res.status(201).json({
                success: true,
                message: "user registered successfully",
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    name: newUser.name, 
                },
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An unexpected error occurred during registration",
            });
        }
    }
}


export default new userController();