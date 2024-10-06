import express from "express";
const blogRoute = express.Router()
import blogController from "../Controller/blogController.js";
import jwtAuth from "../Middleware/userAuth.js";





blogRoute.post('/create'  ,jwtAuth, blogController.createBlogController)
blogRoute.get('/posts' , blogController.getPostsController )
blogRoute.put('/posts/:id',blogController.updateBlogController)
blogRoute.delete('/post/:id' , blogController.deletePost)



export default blogRoute;