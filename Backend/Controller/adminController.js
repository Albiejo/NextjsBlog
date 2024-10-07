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


    async blockUser(req , res){
        try {
            const userid = req.params.userid;
            const userBlocked  = await adminService.Block(userid);
            if(userBlocked){
                return res.status(200).json({
                    success:true,
                    message:"blocking successfull",
                });
            }else {
                res.status(404).json({
                    success: false,
                    message: "user cannot be blocked.."
                });
            }
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An error occurred during user blocking",
            }); 
        }
    }



    async GetUser(req , res){
        try {
            const userid = req.params.userid;

            const userData  = await adminService.getUserProfile(userid);
            if (userData) {
                res.status(200).json({
                    success: true,
                    message: "user data fetched successfully",
                    data: userData
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "user post not found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An error occurred during user fetcjing",
            }); 
        }
    }

    async UnblockUser(req , res){
        try {
            const userid = req.params.userid;
            const userUnBlocked  = await adminService.UnBlock(userid);
            if(userUnBlocked){
                return res.status(200).json({
                    success:true,
                    message:"Unblocking successfull",
                });
            }else {
                res.status(404).json({
                    success: false,
                    message: "user cannot be Unblocked.."
                });
            }
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An error occurred during user Unblocking",
            }); 
        }
    }


    async deleteUser(req , res){
        try {
            const userid = req.params.userid
            const userDeleted = await adminService.Deleteuser(userid);
            if(userDeleted){
                return res.status(200).json({
                    success:true,
                    message:"user proile deletion  successfull",
                });
            }else {
                res.status(404).json({
                    success: false,
                    message: "user cannot be deleted.."
                });
            }
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "An error occurred during user deletion",
            }); 
        }
    }
}


export default new adminController();

