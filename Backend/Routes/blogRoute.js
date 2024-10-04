import express from "express";
const blogRoute = express.Router()
import blogController from "../Controller/blogController.js";
import jwtAuth from "../Middleware/userAuth.js";





blogRoute.post('/create'  ,jwtAuth, blogController.createBlog)


export default blogRoute;