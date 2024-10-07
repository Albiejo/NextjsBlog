import express from "express";
const blogRoute = express.Router()
import blogController from "../Controller/blogController.js";
import jwtAuth from "../Middleware/userAuth.js";





blogRoute.post('/create'  , blogController.createBlogController)
blogRoute.get('/posts' , blogController.getPostsController )
blogRoute.put('/posts/:id',blogController.updateBlogController)
blogRoute.delete('/post/:id' , blogController.deletePost)
blogRoute.patch('/likePost/:blogid/:userid' , blogController.likePost)
blogRoute.post('/addComment/:blogid/:userid', blogController.addComment)

export default blogRoute;