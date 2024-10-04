import express from "express";
import AdmingenerateToken from "../Utils/AdminToken.js";
import adminService from "../Services/adminService.js";




class adminController{

    //admin login
    async adminLogin (req , res){
        try {
            const {email , password} = req.body;
            const admin = await adminService.adminLoginService(email , password);

            AdmingenerateToken(res , admin._id);

            return res.status(200).json({
                success:true,
                message:"Login successfull",
                admin:{
                    id:admin._id,
                    email:admin.email
                }
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "An unexpected error occurred",
        });
        }
    }

    //admin registartion
    async adminRegistration(req , res){
        try {
            const {email , password , phone} = req.body;
            const newAdmin =await adminService.adminRegistration(email , password , phone)
            return res.status(201).json({
                success: true,
                message: "Admin registered successfully",
                admin: {
                    id: newAdmin._id,
                    email: newAdmin.email,
                    phone: newAdmin.phone, 
                },
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An error occurred during registration",
            });
        }
    }
}


export default new adminController();

