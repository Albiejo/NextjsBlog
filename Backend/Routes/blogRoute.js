import express from "express";
const blogRoute = express.Router()
import blogController from "../Controller/blogController.js";
import jwtAuth from "../Middleware/userAuth.js";
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'cloud_images'); 
    },
    filename: function (req, file, cb) {
        // Generating a unique filename for the uploaded file
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

blogRoute.post('/'  ,upload.single('image'), blogController.createBlogController)
blogRoute.get('/posts' , blogController.getPostsController )
blogRoute.put('/posts/:id',blogController.updateBlogController)
blogRoute.delete('/post/:id' , blogController.deletePost)
blogRoute.patch('/likePost/:blogid/:userid' , blogController.likePost)
blogRoute.post('/addComment/:blogid/:userid', blogController.addComment)

export default blogRoute;